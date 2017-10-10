import React, { Component } from 'react';
import './App.css';
import merge from 'lodash.merge';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Route, Redirect } from 'react-router';
import firebase from 'firebase';
import Header from './Header';
import Footer from './Footer';

// Material UI Components
import {
    MuiThemeProvider,
    RaisedButton,
} from 'material-ui';

// Theme
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

// Icons
import Phone from 'material-ui/svg-icons/communication/call';
import Person from 'material-ui/svg-icons/social/person';

// Adds onTouchTap property to components
import injectTapEventPlugin from "react-tap-event-plugin";
import Dashboard from "./dashboard/Dashboard";
injectTapEventPlugin();

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    state = {
        type: null,
        user: null
    }

    componentWillMount () {
        firebase.auth().onAuthStateChanged(this.handleCredentials);
    }

    componentWillUnmount() {
        if(this.state.user !== null) {
            localStorage.setItem('type', this.state.type);
        }
    }

    handleClick = (type) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((success) => { this.handleCredentials(success.user) })
            .then(() => { this.handleLogin(type) });
    }

    handleCredentials = (params) => {
        console.log(params);
        this.setState({
            user: params,
            type: localStorage.getItem('type')
        });
    }

    handleLogin = (type) => {
        localStorage.setItem('type', type);
        this.setState({
            type: type
        });
        /* Add user to our Firebase database */
        const user = {};
        user['user/' + this.state.user.uid] = {
            type: type,
            email: this.state.user.email,
            name: this.state.user.displayName,
            id: this.state.user.uid
        };
        firebase.database().ref().update(user)
    }

    render() {
        const colors = require('material-ui/styles/colors');
        {/*Theme Styles*/}
        const muiTheme = {
            fontFamily: 'Montserrat',
            palette: {
                primary1Color: colors.darkBlack,
                accent1Color: colors.cyan700,
                alternateTextColor: colors.white,
            }
        };
        const theme = merge(darkBaseTheme, muiTheme);
        {/*Custom Styles*/}
        const styles = {
            button: {
                margin: 12,
                height: 100,
                width: 400,
            },
            h1: {
                fontSize: 50
            },
            label: {
                fontSize: 25
            },
            icon: {
                height: 50,
                width: 50,
            }
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <div>
                    <Header user={this.state.user} type={this.state.type}/>
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <Row center="xs">
                                    <Col xs={12} >
                                        {/*Root*/}
                                        <Route exact path="/" render={() => (
                                            this.state.user === null ? (
                                                    <div>
                                                        <h1 style={styles.h1}>Sign in to continue</h1>
                                                        <div><br/><br/>
                                                            <RaisedButton style={styles.button}
                                                                          label="Helpdesk User"
                                                                          labelStyle={styles.label}
                                                                          primary={true}
                                                                          icon={<Phone style={styles.icon}/>}
                                                                          onTouchTap={() => this.handleClick('helpdesk')}
                                                            />
                                                            <RaisedButton style={styles.button}
                                                                          label="Tech User"
                                                                          labelStyle={styles.label}
                                                                          secondary={true}
                                                                          icon={<Person style={styles.icon}/>}
                                                                          onTouchTap={() => this.handleClick('tech')}
                                                            />
                                                        </div><br/><br/><br/><br/><br/><br/><br/>
                                                    </div>
                                                )
                                                : (
                                                    <Redirect to="/dashboard" />
                                                )
                                        )} />

                                        {/*Dashboard*/}
                                        <Route exact path="/dashboard" render={() => (
                                            this.state.user !== null ? (
                                                    <Dashboard user={this.state.user} type={this.state.type} />
                                                )
                                                : (
                                                    <Redirect to="/" />
                                                )
                                        )} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Grid><br/><br/>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
