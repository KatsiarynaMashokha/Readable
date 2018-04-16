import React, { Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import PostsHome from './PostsHome';
import CategoryPosts from './CategoryPosts';
import PostForm from './PostForm';
import PostDetails from './PostDetails';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Forum</h1>
          <nav>
              <Link to="/">Home</Link>
              <br />
              <Link to="/posts/new">Add a new post</Link>
          </nav>
        </header>
        <Main>
          <Route exact path="/" component={PostsHome} />
          <Route exact path="/:category" component={CategoryPosts}/>
          <Route exact path="/:category/edit/:postId" render={props => (
            <PostForm {...props} edit={true}/>)}/>
          <Route exact path="/:posts/new" component={PostForm}/>
          <Route exact path="/:category/post/:postId" component={PostDetails}/>
        </Main>
      </div>
    );
  }
}

export default withRouter(App);
