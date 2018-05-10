import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import AddIcon from 'material-ui-icons/Add';
import {Button, TextField} from "material-ui";
import * as firebase from 'firebase';

const styles = theme => ({});

class CreateClass extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            name: '',
            open: false
        };
    }

    generateID = () => {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    submitCreateClass = () => {
        //todo: check if generated class id has been used
        const classId = this.generateID();
        firebase.database().ref('classes/' + classId).set({name: this.state.name});

        const uid = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref('users/' + uid);
        userRef.child('currentClass').set(classId);
        userRef.child('classes/' + classId).set({name: this.state.name, owner: true});
        this.setState({name: '', open: false});
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleClickOpen}>
                    <ListItemText secondary="Create Class"/>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                </ListItem>
                <Dialog className={this.classes.dialog} open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>Create a Class</DialogTitle>
                    <DialogContent className={this.classes.dContent}>
                        <TextField
                            label="Class Name" value={this.state.name}
                            onChange={this.handleNameChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button raised color="accent" onClick={this.handleRequestClose}>
                            Cancel
                        </Button>
                        <Button raised color="accent" onClick={this.submitCreateClass}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

CreateClass.propTypes = {
    classes: PropTypes.object.isRequired,
};
CreateClass.defaultProps = {};

export default withStyles(styles)(CreateClass);
