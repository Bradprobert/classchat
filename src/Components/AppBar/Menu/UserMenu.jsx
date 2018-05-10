import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import * as firebase from 'firebase';
import {Button, Menu, MenuItem} from "material-ui";

const styles = theme => ({

});

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            anchorEl: null,
            open: false,
        }
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleSignOut = () => {
        firebase.auth().signOut();
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button
                    aria-owns={this.state.open ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    color="contrast"
                >
                    Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    classes={this.classes}
                >
                    <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleSignOut}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};
Menu.defaultProps = {};

export default withStyles(styles)(UserMenu);
