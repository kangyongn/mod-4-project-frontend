import React, { Component } from 'react'
import { Route, Switch, withRouter } from "react-router-dom";
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar'

class App extends Component {
  state = {
    user: {}
  }

  handleSignup = user => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(userObj => {
        this.setState({
          user: userObj.user
        }, () => {
          localStorage.setItem("token", userObj.jwt)
          console.log(this.state.user)
        })
      })
  }

  handleLogin = (e, user) => {
    console.log(user)
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(userObj => {
        localStorage.setItem('token', userObj.jwt)
        this.setState({
        user: userObj.user
      }, () => console.log(this.state.user))
    })
  }

  handleLogout = () => {
   this.setState({
     user: {}
   }, () => console.log(this.state.user))
   localStorage.removeItem("token")
 }


  render() {
    return (
      <div>
        <Navbar handleLogout={this.handleLogout}/>
        <Login handleLogin={this.handleLogin}/>
        <Signup handleSignup={this.handleSignup}/>
      </div>
    )
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      fetch("http://localhost:3000/api/v1/current_user", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(res => res.json())
      .then(userJSON => {
        this.setState({
          user: userJSON.user
        }, () => console.log(this.state.user))
      })
    }
  }
}

export default App;
