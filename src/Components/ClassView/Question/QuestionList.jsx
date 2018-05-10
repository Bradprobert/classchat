import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import * as firebase from 'firebase';
import Question from './Question'
import List, {ListItem} from 'material-ui/List';


const styles = theme => ({
    qList: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',
    }
});

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            currentClass: props.currentClass,
            qRef: firebase.database().ref('classes/' + props.currentClass + '/questions').orderByChild('upVotes'),
            questions: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentClass !== this.props.currentClass) {
            const qRef = firebase.database().ref('classes/' + nextProps.currentClass + '/questions').orderByChild('upVotes');
            this.setState({currentClass: nextProps.currentClass, qRef: qRef});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentClass !== prevState.currentClass) {
            prevState.qRef.off();
            this.updateQuestions(this.state.qRef);
        }
    }


    componentDidMount() {
        this.updateQuestions(this.state.qRef);
    }

    updateQuestions = (qRef) => {
        this.setState({questions: {}});
        qRef.on('child_added', snap => {
            let q = this.state.questions;
            q[snap.key] = snap.val();
            this.setState({questions: q});
        });

        qRef.on('child_changed', snap => {
            let q = this.state.questions;
            q[snap.key] = snap.val();
            this.setState({questions: q});
        });

        qRef.on('child_removed', snap => {
            let q = this.state.questions;
            delete q[snap.key];
            this.setState({questions: q});
        });
    }

    render() {
        let questions = null;
        if (Object.keys(this.state.questions).length !== 0) {
            questions = Object.keys(this.state.questions).map((qid, i) =>
                <ListItem key={i}>
                    <Question classId={this.state.currentClass} qid={qid} value={this.state.questions[qid]}/>
                </ListItem>
            );
        } else {
            questions = null;
        }

        return (
            <List className={this.classes.qList}>
                {questions}
            </List>
        );
    }
}

QuestionList.propTypes = {
    classes: PropTypes.object.isRequired,
    currentClass: PropTypes.string.isRequired,
};

QuestionList.defaultProps = {};

export default withStyles(styles)(QuestionList);


