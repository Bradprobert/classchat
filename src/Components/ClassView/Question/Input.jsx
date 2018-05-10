import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Button, TextField} from 'material-ui';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import AddIcon from 'material-ui-icons/Add';
import * as firebase from 'firebase';

const styles = theme => ({
    fab: {
        flip: false,
        position: 'fixed',
        bottom: 32,
        right: 32,
    },
    dialog: {},
    dContent: {
        flexDirection: 'column'
    }
});

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            question: '',
            topic: '',
            open: false,
            currentClass: this.props.currentClass,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentClass !== this.state.currentClass) {
            this.setState({currentClass: nextProps.currentClass});
        }
    }


    handleClickOpen = () => {
        if(this.state.currentClass !== 'default') {
            this.setState({open: true});
        } else {
            alert('You need to select a class to ask a question!');
        }
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleQuestionChange = (event) => {
        this.setState({question: event.target.value});
    };

    handleTopicChange = (event) => {
        this.setState({topic: event.target.value});
    };

    submitQuestion = () => {
        const questionsRef = firebase.database().ref().child('classes/' + this.state.currentClass + '/questions');
        const newQ = {
            topic: this.state.topic,
            question: this.state.question,
            upVotes: 0,
        };
        questionsRef.push().set(newQ);
        this.setState({question: '', topic: '', open: false});
    };

    render() {
        return (
            <div>
                <Button fab onClick={this.handleClickOpen} className={this.classes.fab} color="accent" aria-label="add">
                    <AddIcon/>
                </Button>
                <Dialog className={this.classes.dialog} open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>Ask A New Question</DialogTitle>
                    <DialogContent className={this.classes.dContent}>
                        <TextField
                            label="Topic" value={this.state.topic}
                            onChange={this.handleTopicChange}/>
                        <TextField fullWidth
                                   label="Question" value={this.state.question}
                                   onChange={this.handleQuestionChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button raised color="accent" onClick={this.handleRequestClose}>
                            Cancel
                        </Button>
                        <Button raised color="accent" onClick={this.submitQuestion}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Input.propTypes = {
    classes: PropTypes.object.isRequired,
};

Input.defaultProps = {};

export default withStyles(styles)(Input);