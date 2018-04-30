import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Panel, Glyphicon } from 'react-bootstrap';
import { convertUnixTime } from '../util';
import { deletePost, upvotePost,  downvotePost} from '../actions/PostsActions';

class CategoryPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    deletePost(postId) {
        if (window.confirm('Are you sure you wont to delete this post?')) this.props.deletePost(postId);
    }

    upvote(postId) {
        this.props.upvotePost(postId);
    }

    downvote(postId) {
        this.props.downvotePost(postId);
    }

    render() {
        if(this.props.location.pathname === '/') {
            return (
                <div>{this.props.posts.length && this.props.posts.map((post, idx) => <p key={idx}>{post.title}<br/>by {post.author}  
                <Link to = {`/${post.category}/post/${post.id}/`}> read...</Link></p>)}</div>
            );
        }

        let selectedCategory = this.props.location.pathname.replace(/\//g,'');
        let postsForCategory = this.props.posts.filter(post => post.category === selectedCategory);
        return (
            <div>{postsForCategory.length ? postsForCategory.map((post, idx) =>
                <Panel key={idx} className='post-panel'>
                    <Panel.Heading>{post.title}</Panel.Heading>
                    <Panel.Body>{post.body}</Panel.Body>
                    <Panel.Footer>by {post.author} on {convertUnixTime(post.timestamp)}&nbsp;&nbsp;&nbsp;{post.voteScore} <Glyphicon onClick={this.upvote.bind(this, post.id)} glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>&nbsp;&nbsp;<Glyphicon onClick={this.downvote.bind(this, post.id)} glyph="glyphicon glyphicon-thumbs-down"></Glyphicon>
                    </Panel.Footer>
                    <div className='post-action-btns'>
                        <Link to={post.category + '/edit/' + post.id} id='btn-edit' className='button'>Edit</Link>
                        <a onClick={this.deletePost.bind(this, post.id)} id='btn-delete' className='button' >Delete</a>
                        <Link to={post.category + '/post/' + post.id}
                        id='btn-read' className='button'>Read More</Link>
                    </div>
                </Panel>
                ): 'No posts in this category'}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

const mapDispatchToProps = dispatch => ({
    deletePost: (postId) => dispatch(deletePost(postId)),
    upvotePost: (postId) => dispatch(upvotePost(postId)),
    downvotePost: (postId) => dispatch(downvotePost(postId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts));