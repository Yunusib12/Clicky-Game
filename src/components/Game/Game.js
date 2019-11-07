import React, { Component } from "react";
import friends from '../../friends.json';
import './style.css';

class Game extends Component {

    // set a state
    state = {
        friendArray: friends,
        clickedId: []
    }

    handleImageClick = (id) => {

        let isClicked = false;

        //const isClicked = friends.find((friend) => (friend.id === id && friend.isClicked));


        // if (typeof isClicked !== "object") {

        const newFriends = friends.map((friend) => {

            if (!this.state.clickedId.includes(friend.id) && friend.id === id) {

                console.log(friend);

                return {
                    ...friend, isClicked: true
                }
            } else if (friend.id !== id) {

                return friend;

            } else {

                console.log(isClicked);
                isClicked = true;

                return {};
            }
        });


        if (isClicked) {

            console.log("lost game");

        } else {

            let newIds = [

                ...this.state.clickedId, id
            ];

            this.setState({

                friendArray: newFriends,
                clickedId: newIds
            });
        }

        //  } else {

        //      console.log("lost game");
        //  }

    }

    componentDidUpdate() {

        console.log(this.state);
    }
    render() {

        return (

            <div>
                {
                    friends.map((friend) => (
                        <img className="imgWidth" src={friend.image} alt={friend.name} key={friend.id} onClick={() => this.handleImageClick(friend.id)} isclicked={`${friend.isClicked}`} />
                    ))
                }
            </div>
        )
    }
}

export default Game;