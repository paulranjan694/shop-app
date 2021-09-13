import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser : null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async authUser => {
      if(authUser){
        const userRef = await createUserProfileDocument(authUser);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state);
          })
        })
      }else{
        this.setState({currentUser : authUser})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sign-in" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
