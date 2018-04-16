import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllPosts } from '../actions/PostsActions';
import { fetchAllCategories } from '../actions/CategoryActions';

class Main extends Component {
    componentDidMount() {
        this.props.fetchAllCategories();
        this.props.fetchAllPosts();
    }

    render() {
        return (
            <div>
              {this.props.children}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    posts: state.posts,
 });

const mapDispatchToProps = dispatch => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));