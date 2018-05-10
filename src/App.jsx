import React from 'react';
import * as firebase from 'firebase';
import {createMuiTheme, MuiThemeProvider, withStyles, withTheme} from 'material-ui/styles';

import {blue, orange} from './Theme/AuburnTheme'
import red from 'material-ui/colors/red'

import 'typeface-roboto'
import NavBar from "./Components/AppBar/NavBar";


const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: orange,
        error: red,
        type: 'light'
    }
});

const styles = {
    root: {
        width: '100%',
        height: '100%',
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.classes = styles;
        this.state = {
            signedIn: false,
            uid: '',
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({signedIn: false, uid: ''});
            } else {
                this.setState({signedIn: true, uid: user.uid});
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.classes.root}>
                    <NavBar signedIn={this.state.signedIn}/>
                </div>
            </MuiThemeProvider>

        )
    };
}

export default withTheme()(withStyles(styles)(App));