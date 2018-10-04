import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AppBar, Drawer, Hidden, IconButton, Toolbar, Typography} from 'material-ui';
import {Menu} from 'material-ui-icons';
import UserMenu from "./Menu/UserMenu";
import classNames from 'classnames';
import SignIn from "../../Components/SignIn/SignIn";
import NavDrawerList from "./NavDrawerList";
import ClassView from "../ClassView/ClassView";


const drawerWidth = 240;

const styles = theme => ({
    appBarText: {
        flex: 1
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        overflow: 'auto',
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    appBarSignedOut : {
        width: '100%'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    hide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        height: window.innerHeight,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'fixed',
            top: 0,
            left: 0,
        },
    },
    content: {
        overflow: 'auto',
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: window.innerHeight - 64,
        marginTop: 64,
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
});

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            signedIn: props.signedIn,
            open: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            signedIn: nextProps.signedIn
        });
    }

    handleDrawerToggle = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        return (
            <div className={this.classes.appFrame}>
                <AppBar
                    className={classNames(this.state.signedIn && this.classes.appBar, !this.state.signedIn && this.classes.appBarSignedOut)}
                    position="fixed" color="primary">
                    <Toolbar>
                        {this.state.signedIn ?
                            <IconButton
                                className={classNames(this.classes.menuButton, this.classes.hide)}
                                color="contrast" aria-label="Menu"
                                onClick={this.handleDrawerToggle}>
                                <Menu/>
                            </IconButton> : null}

                        <Typography type="title" color="inherit" className={this.classes.appBarText}>
                            Class Chat
                        </Typography>
                        {this.state.signedIn ? <UserMenu/> : null}
                    </Toolbar>
                </AppBar>
                {this.state.signedIn ?
                    <div>
                        <Hidden mdUp>
                            <Drawer
                                type="temporary"
                                anchor={'left'}
                                open={this.state.open}
                                classes={{
                                    paper: this.classes.drawerPaper,
                                }}
                                onRequestClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {<NavDrawerList/>}
                            </Drawer>
                        </Hidden>
                        <Hidden mdDown implementation="css">
                            <Drawer
                                type="permanent"
                                open
                                classes={{
                                    paper: this.classes.drawerPaper,
                                }}
                            >
                                {<NavDrawerList/>}
                            </Drawer>
                        </Hidden>
                    </div> : null}
                {this.state.signedIn ? (
                        <ClassView
                            className={this.classes.content}/>
                    ) :
                    <div className={this.classes.content}>
                        <SignIn/>
                    </div>
                }
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    signedIn: PropTypes.bool.isRequired,
};
NavBar.defaultProps = {};

export default withStyles(styles)(NavBar);
