import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import {withStyles} from 'material-ui/styles';
import {Card, CardActions, IconButton, Typography} from 'material-ui';
import {ThumbUp} from "material-ui-icons";


const styles = theme => ({
    card: {
        padding: 12,
        flexGrow: 1
    },
    thumbIcon: {}
});


class Question extends React.Component {
    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.state = {
            classId: props.classId,
            qid: props.qid,
            topic: props.value.topic,
            question: props.value.question,
            upVotes: props.value.upVotes,
            voted: false
        };
        this.uid = firebase.auth().currentUser.uid;
        this.qRef = firebase.database().ref('classes/' + props.classId + '/questions/' + props.qid);
        this.userLikesRef = firebase.database().ref('users/' + this.uid + '/likes/' + this.state.qid);
    }

    componentWillReceiveProps(nextProps) {
        const nextState = {
            classId: nextProps.classId,
            qid: nextProps.qid,
            topic: nextProps.value.topic,
            question: nextProps.value.question,
            upVotes: nextProps.value.upVotes
        };
        this.setState(nextState);
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.classId !== this.state.classId || prevState.qid !== this.state.qid) {
            this.qRef.off();
            this.qRef = firebase.database().ref('classes/' + prevState.classId + '/questions/' + prevState.qid);
            this.userLikesRef.off();
            this.userLikesRef = firebase.database().ref('users/' + this.uid + '/likes/' + prevState.qid);
            this.checkUserVoted();
        }
    }

    componentDidMount() {
        this.checkUserVoted();
    }

    checkUserVoted() {
        this.userLikesRef.on('value', snap => {
            if (snap.exists()) {
                this.setState({voted: snap.val()});
            }
        });
    }

    handleUpVote = () => {
        this.userLikesRef.set(!this.state.voted);
        this.qRef.transaction(post => {
            if (post) {
                if (this.state.voted) {
                    post.upVotes--;
                } else {
                    post.upVotes++;
                }
            }
            return post;
        });
    };

    render() {
        return (
            <Card className={this.classes.card}>
                <Typography type="title">
                    {this.state.topic}
                </Typography>
                <Typography type="body1">
                    {this.state.question}
                </Typography>
                <CardActions>
                    <Typography type="body1">
                        {this.state.upVotes}
                    </Typography>
                    <IconButton color="accent" className={this.classes.thumbIcon} aria-label="Thumbs Up"
                                onClick={this.handleUpVote}>
                        <ThumbUp/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

Question.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    qid: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
};
Question.defaultProps = {};

export default withStyles(styles)(Question);