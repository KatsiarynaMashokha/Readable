import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchPostComments } from '../actions/CommentsActions';
import { Glyphicon } from 'react-bootstrap';
import { upvotePost, downvotePost, deletePost } from '../actions/PostsActions';
import { upvoteComment,  downvoteComment, deleteComment, addPostComment, editComment } from '../actions/CommentsActions';
import { DebounceInput } from "react-debounce-input";
import { convertUnixTime, uuidv4 } from '../util';
import { Button } from 'react-bootstrap';
import NoMatch from './NoMatch';

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentAuthor: '',
            comment: '',
            editModeActivated: false,
            editComment: '',
            editCommentId: null,
        }
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.props.dispatch(fetchPostComments(postId));
    }

    upvotePost(postId) {
        this.props.dispatch(upvotePost(postId));
    }

    downvotePost(postId) {
        this.props.dispatch(downvotePost(postId));
    }

    deletePost(postId) {
        if (window.confirm('Are you sure you want to delete this post?')) {
            this.props.dispatch(deletePost(postId)).then(() => this.props.history.push(`/${this.props.match.params.category}`))
        }
    }

    upvotePostComment(commentId) {
        this.props.dispatch(upvoteComment(commentId));
    }

    downvotePostComment(commentId) {
        this.props.dispatch(downvoteComment(commentId));
    }

    deletePostComment(commentId) {
        if(window.confirm('Are you sure you want to delete this comment?')) this.props.dispatch(deleteComment(commentId));
    }

    editPostComment(commentId, commentBody) {
        this.setState({
            editModeActivated: !this.state.editModeActivated,
            editComment: commentBody,
            editCommentId: commentId,
        })
    }

    addPostComment() {
        const postId = this.props.match.params.postId;
        const comment = {
            id: uuidv4(),
            timestamp: Date.now(),
            body: this.state.comment,
            author: this.state.commentAuthor,
            parentId: postId
        };
        this.props.dispatch(addPostComment(comment)).then(result => {
            this.setState({
                commentAuthor: '',
                comment: '',
            })
        })
    }

    updatePostComment() {
        this.props.dispatch(editComment(this.state.editCommentId, this.state.editComment, Date.now())).then(() => {
            this.setState({
                editModeActivated: false,
                editComment: '',
                editCommentId: null,
            })
        })
    }

    render() {
        const postId = this.props.match.params.postId;
        const currentPost = (this.props.posts.filter(post => post.id === postId))[0];
            return (
                <div>
                   {currentPost ?
                   <span>
                       <h3 className='post-title'>{currentPost.title}</h3>
                       <p className='post-details'>submitted on {convertUnixTime(currentPost.timestamp)} by {currentPost.author}</p>
                       <h4 className='post-body'>{currentPost.body}</h4>
                       <Glyphicon onClick={this.upvotePost.bind(this, currentPost.id)} glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       {currentPost.voteScore}&nbsp;&nbsp;&nbsp;
                       <Glyphicon onClick={this.downvotePost.bind(this, currentPost.id)} glyph="glyphicon glyphicon-thumbs-down"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       <Link className='edit-post-icon' to={`/${currentPost.category}/edit/${currentPost.id}`}><Glyphicon glyph="glyphicon glyphicon-edit"/></Link>
                       &nbsp;&nbsp;&nbsp;
                       <Glyphicon onClick={this.deletePost.bind(this, currentPost.id)} glyph="glyphicon glyphicon-remove"></Glyphicon>
                       <br/>
                       <br/>
                       {this.props.comments.length > 0 ? <p>{this.props.comments.length} comment(s)</p> : <p>No Comments</p>}
                       <hr/>
                
                   {this.props.comments && this.props.comments.map(comment => {
                       return <span key={comment.id}>
                            <br/>
                            <p className='comment-details'>{comment.author} on {convertUnixTime(comment.timestamp)}</p>
                            <p className='comment-body'>{comment.body}</p>
                            <span className='comment-votes'><Glyphicon onClick={this.upvotePostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>&nbsp;&nbsp;&nbsp;
                            {comment.voteScore}&nbsp;&nbsp;&nbsp;
                            <Glyphicon onClick={this.downvotePostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-thumbs-down"></Glyphicon>&nbsp;&nbsp;&nbsp;
                            <Glyphicon onClick={this.editPostComment.bind(this, comment.id, comment.body)} glyph="glyphicon glyphicon-edit"></Glyphicon>&nbsp;&nbsp;&nbsp;
                            <Glyphicon onClick={this.deletePostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-remove"></Glyphicon>&nbsp;&nbsp;&nbsp;
                            </span>
                       </span>
                    })}
                    <br/><br/>

                    {this.state.editModeActivated ? <span>
                        <p className='edit-comment-title'>Edit your comment here:</p>
                        <div className='new-post-comment'>
                            <DebounceInput debounceTimeout={300} element='textarea' name='editCommentBody' value={this.state.editComment} onChange={(e) => this.setState({ editComment: e.target.value })}/>
                            <br/><br/>
                            <Button bsStyle="primary" onClick={this.updatePostComment.bind(this)} disabled={this.state.editComment ? false : true}>Update Comment</Button>
                            <br/>
                        </div></span> : <div className='new-post-comment'>
                            <DebounceInput debounceTimeout={300} type='text' name='author' value={this.state.commentAuthor} placeholder={'Author'} required onChange={(e) => this.setState({ commentAuthor : e.target.value })}/>
                            <br/><br/>
                            <DebounceInput debounceTimeout={300} element='textarea' name='comment' value={this.state.comment} required={true} placeholder={'Enter comment here'} onChange={(e) => this.setState({ comment: e.target.value })}/>
                            <br/><br/>
                            <Button bsStyle="primary" disabled={(this.state.commentAuthor && this.state.comment) ? false : true} onClick={this.addPostComment.bind(this)}>Add Comment</Button>
                            <br/>
                        </div>}
                        </span> : <NoMatch location={this.props.location}/>
                        }
                </div>
            )}
}

const mapStateToProps = ({ comments, posts }) => ({
    comments,
    posts,
});

export default withRouter(connect(mapStateToProps)(PostDetails));