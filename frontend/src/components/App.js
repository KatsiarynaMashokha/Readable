import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PostsHome from './PostsHome';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import CategoryPosts from './CategoryPosts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Forum</h1>
          <Navbar>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Home</NavItem>
              <NavItem eventKey={2} href="#">Add a new post</NavItem>
            </Nav>
          </Navbar>
        </header>
        <Route exact path="/" component={PostsHome} />
        <Route exact path="/:category" component={CategoryPosts}/>
      </div>
    );
  }
}

export default withRouter(App);
