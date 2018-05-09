import React, { Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import PostsHome from './PostsHome';
import { connect } from 'react-redux';
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
          {this.props.categories.length > 0 && <span className='categories-description'>We are discussing {this.props.categories.map(category => <Link to={`/${category.path}`} key={category.path}>{' ' + category.name}</Link>)}</span>}
          <nav>
              <Link to="/">Home</Link>
              <br />
              <Link to="/posts/new">Add a new post</Link>
          </nav>
        </header>
        <Main>
          <Route exact path="/" component={PostsHome} key={1} />
          <Route exact path="/:category" component={CategoryPosts} key={2}/>
          <Route exact path="/:category/edit/:postId" render={props => (
            <PostForm {...props} edit={true}/>)} key={3}/>
          <Route exact path="/:posts/new" component={PostForm} key={4}/>
          <Route exact path="/:category/post/:postId" component={PostDetails} key={5}/>
        </Main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default withRouter(connect(mapStateToProps)(App));
