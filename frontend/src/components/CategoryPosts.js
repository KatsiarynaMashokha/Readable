import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

        const selectedCategory = this.props.location.pathname.replace(/\//g,'');
        const postsForCategory = this.props.posts.filter(post => post.category === selectedCategory);
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

export default withRouter(connect(mapStateToProps)(CategoryPosts));