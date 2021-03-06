/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MKTextField, MKButton, MKColor } from 'react-native-material-kit'
import Loader from './Loader'
import firebase from 'firebase'

const LoginButton = MKButton.coloredButton()
  .withText('LOGIN')
  .build()

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  }

  onButtonPress(){
    const { email, password } = this.state
    this.setState({
      error: '',
      loading: true
    })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.onAuthSuccess())
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => this.onAuthSuccess())
          .catch(() => this.onAuthFailed())
      })
  }

  onAuthSuccess(){
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  onAuthFailed(){
    this.setState({
      error: 'Authentication Failed',
      loading: false
    })
  }

  renderLoader(){
    if (this.state.loading){
      return <Loader size="large"/>
    } else {
      return <LoginButton onPress={() => this.onButtonPress()}/>
    }
  }

  render(){
    const { form, fieldStyles, loginButtonArea, errorMessage, welcome, container } = styles
    return (
      <View style={form}>
        <Text>
          Login or Create Account
        </Text>
        <MKTextField
          text={this.state.email}
          onTextChange={email => this.setState({email})}
          textInputStyle={fieldStyles}
          placeholder={'Email…'}
          tintColor={MKColor.Teal}/>
        <MKTextField
          text={this.state.password}
          onTextChange={password => this.setState({password})}
          textInputStyle={fieldStyles}
          placeholder={'Password'}
          tintColor={MKColor.Teal}
          password={true}/>
        <Text style={errorMessage}>
          {this.state.error}
        </Text>
        <View style={loginButtonArea}>
          {this.renderLoader()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    width: 200
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
    width: 200
  },
  loginButtonArea: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  errorMessage: {
    marginTop: 15,
    fontSize: 15,
    color: 'red',
    alignSelf: 'center'

  }
})


export default Login