import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllPosts } from '../actions/PostsActions';
import { fetchAllCategories } from '../actions/CategoryActions';
import Categories from './Categories';
import CategoryPosts from './CategoryPosts';

class PostsHome extends Component {

    componentDidMount() {
        this.props.fetchAllCategories();
        this.props.fetchAllPosts();
    }

    render() {
        return (
            <div>
                <Categories />
                <CategoryPosts />
            </div>
        )
    }
}

// connects state from the store to corresponding props
const mapStateToProps = state => ({
    posts: state.posts,
 });

const mapDispatchToProps = dispatch => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsHome));