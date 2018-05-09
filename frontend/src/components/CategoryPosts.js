import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deletePost, upvotePost, downvotePost} from '../actions/PostsActions';
import PostComponent from './PostComponent';

export class CategoryPosts extends Component {

    render() {
        if(this.props.location.pathname === '/') {
            return (
                <div>{this.props.posts.length > 0 && this.props.posts.map((post) =>
                    <PostComponent post={post} key={post.id}/>)}
                </div>
            );
        }

        let selectedCategory = this.props.location.pathname.replace(/\//g,'');
        let postsForCategory = this.props.posts.filter(post => post.category === selectedCategory);
        return (
            <div>{postsForCategory.length ? postsForCategory.map((post) =>
                <PostComponent post={post} key={post.id}/>) : 'No posts in this category'}
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