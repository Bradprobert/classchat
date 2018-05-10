import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles'
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import AddIcon from 'material-ui-icons/Add';
import {Button, TextField} from "material-ui";

const styles = theme => ({
    dialog: {},
    dContent: {
        flexDirection: 'column'
    }
});

class AddClass extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            id: '',
            open: false
        };
    }

    handleIdChange = (event) => {
        this.setState({id: event.target.value});
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    submitAddClass = () => {
        firebase.database().ref('classes/' + this.state.id).once('value').then(snap => {
            if (snap.exists()) {
                const uid = firebase.auth().currentUser.uid;
                const userRef = firebase.database().ref('users/' + uid);
                userRef.child('currentClass').set(this.state.id);
                userRef.child('classes/' + this.state.id).set({name: snap.val().name, owner: false});
                this.setState({id: '', open: false});
            } else {
                alert('Class not found!');
                //todo: add ui to display when class not found
            }
        });
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleClickOpen}>
                    <ListItemText secondary="Add Class"/>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                </ListItem>
                <Dialog className={this.classes.dialog} open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>Add a Class</DialogTitle>
                    <DialogContent className={this.classes.dContent}>
                        <TextField
                            label="Class ID" value={this.state.id}
                            onChange={this.handleIdChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button raised color="accent" onClick={this.handleRequestClose}>
                            Cancel
                        </Button>
                        <Button raised color="accent" onClick={this.submitAddClass}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddClass.propTypes = {
    classes: PropTypes.object.isRequired,
};
AddClass.defaultProps = {};

export default withStyles(styles)(AddClass);
