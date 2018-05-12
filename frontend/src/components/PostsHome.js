import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Categories from './Categories';
import CategoryPosts from './CategoryPosts';

class PostsHome extends Component {

    render() {
        return (
            <div>
                <Categories />
                <CategoryPosts />
            </div>
        )
    }
}

export default withRouter(PostsHome);