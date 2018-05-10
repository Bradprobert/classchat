import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import {AppBar, IconButton, Toolbar, Typography} from "material-ui";
import SettingsIcon from 'material-ui-icons/Settings';
import Input from "./Question/Input";
import QuestionList from "./Question/QuestionList";

const styles = theme => ({
    appBar: {
    },
    appBarText: {
        flex: 1,
    }
});

class ClassView extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            currentClass: 'default',
            name: ''
        };
        this.classNameRef = firebase.database().ref('classes/' + this.state.currentClass + '/name');
    }

    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + uid + '/currentClass').on('value', snap => {
            if(snap.exists()) {
                this.setState({currentClass: snap.val()});
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentClass !== prevState.currentClass) {
            this.classNameRef.off();
            this.classNameRef = firebase.database().ref('classes/' + this.state.currentClass + '/name');
            this.classNameRef.on('value', snap => {
                if(snap.exists()) {
                    this.setState({name: snap.val()});
                }
            })
        }
    }


    render() {
        return (
            <div className={this.props.className}>
            { this.state.currentClass === 'default' ? (
                <div>select a class!</div>
            ) : (
                <div>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography className={this.classes.appBarText} type="title" color="inherit">
                                {this.state.name}
                            </Typography>
                            <IconButton color="contrast" aria-label="Menu">
                                <SettingsIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <QuestionList currentClass={this.state.currentClass}/>
                        <Input currentClass={this.state.currentClass}/>
                    </div>
                </div>
            ) }
            </div>
        );
    }
}

ClassView.propTypes = {
    classes: PropTypes.object.isRequired,
};
ClassView.defaultProps = {};

export default withStyles(styles)(ClassView);
