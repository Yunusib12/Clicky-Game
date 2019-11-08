import React, { Component } from "react";
//import friends from '../../friends.json';
import './style.css';
import images from '../../images';
import Navbar from '../Navbar';
import Container from '../Container';
import Footer from '../Footer';
import Banner from '../Barnner/';


class Game extends Component {

    state = {
        score: 0,
        highScore: 0,
        messageColor: '',   //store class value depending on the message to display
        message: 'Click an image to begin', // message to display to the user
        allCharacters: this.shuffleArray(), // contain an array of images urls
        wasClicked: [], // track each clicked element
        shake: false
    };

    // binds the current this context to checkClicked to have access to the current state
    // when passed down to the Character component
    clickEvent = this.checkClicked.bind(this);

    // used to shuffle the array of images when the DOM loads, and when an image is clicked
    shuffleArray() {
        // creates a copy of the current characters array to modify it by value, and not by reference
        const newArr = images.slice();

        // will store the shuffled array
        const shuffleArr = [];

        // each loop through an index gets spliced from newArr, reducing its length
        // gets a random index based off the current length of newArr
        // splices the value from newArr, and pushes it to shuffleArr

        for (let i = newArr.length; i > 0; i--) {

            shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
        }

        return shuffleArr;
    }

    checkClicked(clickedElem) {
        // creates a copy of the wasClicked array to modify it by value, and not by reference. wasClicked stores all previous clicked images
        const prevState = this.state.wasClicked.slice();

        // shuffles the images
        const shuffled = this.shuffleArray();

        // tracks score
        let score = this.state.score;
        let highScore = this.state.highScore;

        // if the clicked item is not in wasClicked, then it hasn't been clicked and the score is increased
        if (!this.state.wasClicked.includes(clickedElem)) {
            // if score and highScore are the same, then there is a new highScore value
            if (score === highScore) {
                score++;
                highScore++;

                // if they are not equal, then only increase the score value
            } else {
                score++;
            }

            // adds the clicked item to wasClicked to track that it has been clicked
            prevState.push(clickedElem);
        }

        // resets the current score if the same element was clicked twice
        if (this.state.wasClicked.includes(clickedElem)) {
            let score = 0;
            return this.setState({
                score: score,
                highScore: highScore,
                messageColor: 'incorrect',
                message: 'Incorrect guess!',
                allCharacters: shuffled,
                wasClicked: [],
                shake: true
            });
        }


        // if this runs, then the same element has not been clicked twice and the score is increased
        this.setState({
            score: score,
            highScore: highScore,
            messageColor: 'correct',
            message: 'You Guessed Correctly!',
            allCharacters: shuffled,
            wasClicked: prevState,
            shake: false
        });

        // removes the green correct indicator on a successful click after .5s to re-render the class on each success
        return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
    }

    // renders score to the navbar.
    // passes the randomized state.allCharacters array to Container to create a Character component for each image.
    // passes the this.checkClicked down to container to pass to each Character component to be used for the click event.
    render() {
        const state = this.state;
        return (
            <div>
                <Navbar
                    score={state.score}
                    highScore={state.highScore}
                    message={state.message}
                    messageColor={state.messageColor}
                />
                <Banner />
                <Container
                    shake={state.shake}
                    characters={state.allCharacters}
                    clickEvent={this.clickEvent}
                />
                <Footer />
            </div>
        );
    }

}
















// class Game extends Component {

//     // set a state
//     state = {
//         friendArray: friends,
//         clickedId: []
//     }

//     handleImageClick = (id) => {

//         let isClicked = false;

//         //const isClicked = friends.find((friend) => (friend.id === id && friend.isClicked));


//         // if (typeof isClicked !== "object") {

//         const newFriends = friends.map((friend) => {

//             if (!this.state.clickedId.includes(friend.id) && friend.id === id) {

//                 console.log(friend);

//                 return {
//                     ...friend, isClicked: true
//                 }
//             } else if (friend.id !== id) {

//                 return friend;

//             } else {

//                 console.log(isClicked);
//                 isClicked = true;

//                 return {};
//             }
//         });


//         if (isClicked) {

//             console.log("lost game");

//         } else {

//             let newIds = [

//                 ...this.state.clickedId, id
//             ];

//             this.setState({

//                 friendArray: newFriends,
//                 clickedId: newIds
//             });
//         }

//         //  } else {

//         //      console.log("lost game");
//         //  }

//     }

//     componentDidUpdate() {

//         console.log(this.state);
//     }
//     render() {

//         return (

//             <div>
//                 {
//                     friends.map((friend) => (
//                         <img className="imgWidth" src={friend.image} alt={friend.name} key={friend.id} onClick={() => this.handleImageClick(friend.id)} isclicked={`${friend.isClicked}`} />
//                     ))
//                 }
//             </div>
//         )
//     }
// }

export default Game;