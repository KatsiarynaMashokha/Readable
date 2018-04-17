import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostComments } from '../actions/CommentsActions';
import { Glyphicon } from 'react-bootstrap';
import { upvotePost,  downvotePost } from '../actions/PostsActions';
import { upvoteComment,  downvoteComment, deleteComment, addPostComment } from '../actions/CommentsActions';
import { DebounceInput } from "react-debounce-input";
import v4 from 'uuid/v4';

class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentAuthor: '',
            comment: '',
        }
    }
    componentDidMount() {
        let postId = this.props.match.params.postId;
        this.props.dispatch(fetchPostComments(postId));
    }

    upvotePost(postId) {
        this.props.dispatch(upvotePost(postId));
    }

    downvotePost(postId) {
        this.props.dispatch(downvotePost(postId));
    }

    upvotePostComment(commentId) {
        this.props.dispatch(upvoteComment(commentId));
    }

    downvotePostComment(commentId) {
        this.props.dispatch(downvoteComment(commentId));
    }

    deletePostComment(commentId) {
        this.props.dispatch(deleteComment(commentId));
    }

    editPostComment(commentId) {

    }

    addPostComment() {
        let postId = this.props.match.params.postId;
        let comment = {
            id: v4(),
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

    render() {
        let postId = this.props.match.params.postId;
        let currentPost = (this.props.posts.filter(post => post.id === postId))[0];
            return (
                <div>
                   {currentPost && 
                   <span>
                       <h3 className='post-title'>{currentPost.title}</h3>
                       <p className='post-details'>submitted on {currentPost.timestamp} by {currentPost.author}</p>
                       <h4 className='post-body'>{currentPost.body}</h4>
                       <Glyphicon onClick={this.upvotePost.bind(this, currentPost.id)} glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       {currentPost.voteScore}&nbsp;&nbsp;&nbsp;
                       <Glyphicon onClick={this.downvotePost.bind(this, currentPost.id)} glyph="glyphicon glyphicon-thumbs-down"></Glyphicon>
                       <br/>
                       <br/>
                       {currentPost.commentCount ? <p>{currentPost.commentCount} comment(s)</p> : <p>No Comments</p>}
                       <hr/>
                   </span>
                }   
                
                   {this.props.comments.length && this.props.comments.map(comment => {
                return <span key={comment.id}>
                    <br/>
                    <p className='comment-details'>{comment.author} on {comment.timestamp}</p>
                    <p className='comment-body'>{comment.body}</p>
                    <span className='comment-votes'><Glyphicon onClick={this.upvotePostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       {comment.voteScore}&nbsp;&nbsp;&nbsp;
                       <Glyphicon onClick={this.downvotePostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-thumbs-down"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       <Glyphicon onClick={this.editPostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-edit"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       <Glyphicon onClick={this.deletePostComment.bind(this, comment.id)} glyph="glyphicon glyphicon-remove"></Glyphicon>&nbsp;&nbsp;&nbsp;
                       </span>
                    </span>
                    })}
                    <br/>
                    <br/>
                    <div className='new-post-comment'>
                        <DebounceInput debounceTimeout={300} type='text' name='author' value={this.state.commentAuthor} placeholder={'Author Name'} onChange={(e) => this.setState({ commentAuthor : e.target.value })}/>
                        <br/>
                        <br/>
                        <DebounceInput debounceTimeout={300} element='textarea' name='comment' value={this.state.comment} placeholder={'Enter Comment Here'} onChange={(e) => this.setState({ comment: e.target.value })}/>
                        <br/>
                        <button onClick={this.addPostComment.bind(this)}><span className="glyphicon glyphicon-plus"></span>&nbsp;Add Comment</button>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    comments: state.comments,
    posts: state.posts,
});

export default withRouter(connect(mapStateToProps)(PostDetails));