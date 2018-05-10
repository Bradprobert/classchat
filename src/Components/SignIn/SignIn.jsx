import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import * as firebase from 'firebase';
import {Button, Grid, Paper, TextField, Typography} from "material-ui";

const styles = theme => ({
    root: {
        position: 'absolute',
        float: 'left',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        maxWidth: 300,
        padding: theme.spacing.unit,
    },
    heading: {
        textAlign: 'center'
    },
    button: {
        width: '100%'
    },
    textField: {
        width: '100%'
    },
});

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    signInWithGoogle = () => {
        firebase.auth().signInWithPopup(this.googleProvider);
    };

    signInAnonymously = () => {
        firebase.auth().signInAnonymously();
    };

    signInWithEmailPass = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                //var errorMessage = error.message;
                if (errorCode === 'auth/user-disabled') {
                    alert('User Disabled.');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Email is invalid.');
                } else if (errorCode === 'auth/user-not-found') {
                    alert('User not found, if you need to create an account please sign up!');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('auth/wrong-password');
                }
            });
    };

    signUpWithEmailPass = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                //var errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    alert('Email is already in use!');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Email is invalid.');
                }
            });
    };

    render() {
        return (
            <Paper elevation={4} className={this.classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography type='title' className={this.classes.heading}>Welcome to Class
                            Chat!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="Email"
                            className={this.classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Password"
                            type='password'
                            className={this.classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button raised color="accent" className={this.classes.button}
                                onClick={this.signUpWithEmailPass}>
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button raised color="accent" className={this.classes.button}
                                onClick={this.signInWithEmailPass}>
                            Sign In
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button raised color="accent" className={this.classes.button}
                                onClick={this.signInWithGoogle}>
                            Sign In With Google
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button raised color="accent" className={this.classes.button}
                                onClick={this.signInAnonymously}>
                            Sign In Anonymously
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
SignIn.defaultProps = {};

export default withStyles(styles)(SignIn);