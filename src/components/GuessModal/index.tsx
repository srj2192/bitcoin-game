import React from "react";
import Countdown from "react-countdown";
import Modal from "react-modal";
import { Guess, IUpdateUser } from "../../interfaces/IUser";
import { updateUser } from "../../services/GameService";
import styles from "./GuessModal.module.css";

type PropType = {
    isModalOpen: boolean,
    currentprice: string,
    userName: string,
    userPoints: string,
    onModalClose: ()=> void,
}

type StateType = {
    guessAvailable: boolean,
    userPoints: string,
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default class GuessModal extends React.Component<PropType, StateType> {
    state: StateType = {
        guessAvailable: true,
        userPoints: ""
    }

    componentDidUpdate(prevProps: PropType){
        if (this.props.userPoints !== prevProps.userPoints) {
            this.setState({ userPoints: this.props.userPoints });
        }
    }
    
    downGuess = () => {
        const {userName, currentprice} = this.props;
        const updateData:IUpdateUser = {
            name: userName,
            price: parseFloat(currentprice),
            guess: Guess.DOWN
        }
        updateUser(updateData).then((res) => {
            this.setState({ guessAvailable: false });
            setTimeout(() => {
                this.setState({ guessAvailable: true });
                if(res.ok) {
                    res.json().then((jsonData)=> {
                        if (jsonData['message'] === "Success"){
                            this.setState({ userPoints: jsonData.points});
                            alert("Successful Guess, 1 Point added");
                        }else{
                            alert("UnSuccessful Guess, 0 Point added");
                        }
                    })
                }
            }, 10000);
        });
    }

    upGuess = () => {
        const {userName, currentprice} = this.props;
        const updateData:IUpdateUser = {
            name: userName,
            price: parseInt(currentprice),
            guess: Guess.UP
        }
        updateUser(updateData).then((res) => {
            this.setState({ guessAvailable: false });
            setTimeout(() => {
                this.setState({ guessAvailable: true });
                if(res.ok) {
                    res.json().then((jsonData)=> {
                        if (jsonData['message'] === "Success"){
                            this.setState({ userPoints: jsonData.points});
                            alert("Successful Guess, 1 Point added");
                        }else{
                            alert("UnSuccessful Guess, 0 Point added");
                        }
                    })
                }
            }, 10000);
        });
    }

    render() {
        
        const {isModalOpen, currentprice, userName, onModalClose} = this.props;
        const { userPoints, guessAvailable } = this.state;
        console.log("USER POINTS", userPoints);
        return(
            <Modal
                isOpen={isModalOpen}
                onRequestClose={onModalClose}
                contentLabel="Guess Bitcoin Price"
                style={customStyles}
            >
                <h2 className={styles.title}>Guess The Bitcoin Price</h2>
                <h3 className={styles.name}>User: {userName}</h3>
                <h3 className={styles.label}>Points: {userPoints}</h3>
                <div className={styles.price}>
                    <h4 className={styles.label}>Current BitCoin Price </h4>
                    <h4 className={styles.priceDollar}>{`$ ${currentprice}`}</h4>
                    {guessAvailable ?
                        <div>
                            <button onClick={this.downGuess}><i className="fa fa-arrow-down"></i></button>
                            <button onClick={this.upGuess} className={styles.upbtn}><i className="fa fa-arrow-up"></i></button>
                        </div>
                    : <Countdown date={Date.now() + 10000} onComplete={onModalClose}/>}
                </div>
                <button onClick={onModalClose}>close</button>
            </Modal>
        )
    }
}