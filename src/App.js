import React, { Component } from "react";
import { User } from "./components/User";
import "./App.css";
import { auto } from "async";
//import Form from "./components/Form";

class App extends Component {
  state = {
    name: null,
    imgUrl: null,
  };
  componentDidMount() {
    const _onInit = (auth2) => {
      console.log("init OK", auth2);
    };
    const _onError = (err) => {
      console.log("error", err);
    };
    window.gapi.load("auth2", function () {
      window.gapi.auth2
        .init({
          //client_id: "582846519895-2ee43128mpfa31il4u9gmdde4totebdf",
          client_id: process.env.OAUTH,
        })
        .then(_onInit, _onError);
    });
  }
  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      this.setState({
        name: profile.getName(),
        imgUrl: profile.getImageUrl(),
      });
    });
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({
        name: null,
        imgUrl: null,
      });
    });
  };
  render() {
    const { name, imgUrl } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div
            className="row"
            style={{ height: auto, backgroundColor: "pink" }}
          >
            <header className="">
              {!name && <button onClick={this.signIn}>Log in</button>}
              {!!name && <button onClick={this.signOut}>Log out</button>}
              {!!name && <User name={name} imgUrl={imgUrl} />}
            </header>
            <div className="container">
              {process.env.NODE_ENV === "development"
                ? process.env.REACT_APP_DEV_MODE
                : process.env.REACT_APP_PRO_MODE}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
