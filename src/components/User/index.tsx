import React from "react";
import {IUser} from "../../interfaces/IUser";
import priceApi from "../../services/BitcoinPrice";
import { createUser, getUser } from "../../services/GameService";
import GuessModal from "../GuessModal";
import styles from "./User.module.css";

type StateType = {
    userName: string;
    modalIsOpen: boolean;
    currentPrice: string,
    userPoints: string;
}
export default class UserCreation extends React.Component<any, StateType> {
    constructor(props:any){
        super(props);
        this.state = {
            userName: "",
            modalIsOpen: false,
            currentPrice: "",
            userPoints: ""
        }
    }

    onNameChnage = (event:any) => this.setState({userName: event.target.value});

    handleSubmit = (e:any) => {
        const {userName} = this.state;
        getUser(userName.toLowerCase()).then((getRes) => {
            if (getRes.status === 404){
                const user:IUser = {
                    name : userName.toLowerCase()
                }
                createUser(user).then((postRes) => {
                    if(postRes.ok){
                        this.fetchPrice();
                        this.fetchUser();
                    }
                });
            } else if (getRes.ok) {
                this.fetchPrice();
                this.fetchUser();
            }
        });
        e.preventDefault();
    };

    closeModal = () => this.setState({ userName: "", modalIsOpen: false });

    fetchPrice = async() => {
        const response = await priceApi();
        const resData = await response.json();
        this.setState({ currentPrice: resData.bpi.USD.rate_float });
    }

    fetchUser = async() => {
        const {userName} = this.state;
        getUser(userName.toLowerCase()).then((getRes) => {
            if(getRes.ok) {
                getRes.json().then((userData) => {
                    this.setState({ userPoints : userData.points, modalIsOpen: true });
                });
            }
        });
    }

    render() {
        const {currentPrice, userName, userPoints, modalIsOpen} = this.state;
        console.log(userPoints, "USER_POINTS");
        return (
            <div>
                <div className={styles.title}>
                    Welcome to the Bitcoin Price Prediction Game
                </div>
                <div className={styles.form}>
                    <label className={styles.label}>
                    Name :
                    <input type="text" value={userName} onChange={this.onNameChnage} className={styles.text}/>
                    </label>
                    <input type="button" value="Submit" onClick={this.handleSubmit}/>
                </div>
                <GuessModal 
                    isModalOpen={modalIsOpen} 
                    currentprice={currentPrice} 
                    userName={userName}
                    userPoints={userPoints} 
                    onModalClose={this.closeModal}
                />
            </div>
        );
    }
}
