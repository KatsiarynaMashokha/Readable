import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Panel, Glyphicon } from 'react-bootstrap';
import { convertUnixTime } from '../util';
import { deletePost, upvotePost, downvotePost} from '../actions/PostsActions';

class PostComponent extends Component {
    constructor(props) {
        super(props);
        this.upvotePostHandler = this.upvotePostHandler.bind(this);
        this.downvotePostHandler = this.downvotePostHandler.bind(this);
        this.deletePostHandler = this.deletePostHandler.bind(this);
    }

    deletePostHandler(postId, postCategory) {
        if (window.confirm('Are you sure you want to delete this post?')) 
        this.props.deletePost(postId)
    }

    upvotePostHandler(postId) {
        this.props.upvotePost(postId);
    }

    downvotePostHandler(postId) {
        this.props.downvotePost(postId);
    }
    
    render() {
        const { post } = this.props;

        return (
            <Panel className='post-panel'>
            <Panel.Heading>{post.title}</Panel.Heading>
            <Panel.Body>{post.body}</Panel.Body>
            <Panel.Footer>by {post.author} on {convertUnixTime(post.timestamp)}
                &nbsp;&nbsp;&nbsp;{post.voteScore}&nbsp;
                <Glyphicon onClick={() => this.upvotePostHandler(post.id)} glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>&nbsp;&nbsp;
                <Glyphicon onClick={() => this.downvotePostHandler(post.id)} glyph="glyphicon glyphicon-thumbs-down"></Glyphicon>&nbsp;&nbsp;&nbsp;
                {post.commentCount}&nbsp;
                <Glyphicon glyph="glyphicon glyphicon-comment"></Glyphicon>
            </Panel.Footer>
            <div className='post-action-btns'>
                <Link to={post.category + '/edit/' + post.id} id='btn-edit' className='button'>Edit</Link>
                <a onClick={() => this.deletePostHandler(post.id, post.category)} id='btn-delete' className='button'>Delete</a>
                <Link to={post.category + '/post/' + post.id}
                id='btn-read' className='button'>Read More</Link>
            </div>
        </Panel>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    deletePost: (postId) => dispatch(deletePost(postId)),
    upvotePost: (postId) => dispatch(upvotePost(postId)),
    downvotePost: (postId) => dispatch(downvotePost(postId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostComponent));