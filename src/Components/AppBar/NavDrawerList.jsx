import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import * as firebase from 'firebase';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';
import {Divider} from "material-ui";
import AddClass from "./AddClass";
import CreateClass from "./CreateClass";


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class NavDrawerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {}
        };
    }

    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + uid + '/classes').on('value', snapshot => {
            const classList = {};
            snapshot.forEach(snap => {
                classList[snap.key] = snap.val();
            });
            this.setState({classes: classList});
        })
    }

    setCurrentClass = (id) => {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + uid + '/currentClass').set(id);
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <List className={classes.root} subheader={<ListSubheader>My Classes</ListSubheader>}>
                    <Divider/>

                    {Object.keys(this.state.classes).map((id, i) =>
                        <ListItem button key={i} onClick={() => {this.setCurrentClass(id)}}>
                            <ListItemText primary={this.state.classes[id].name}/>
                        </ListItem>
                    )}

                    <AddClass/>
                    <CreateClass/>
                </List>
            </div>
        );
    }
}

NavDrawerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavDrawerList);