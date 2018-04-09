import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Panel, Glyphicon, ButtonToolbar, Button } from 'react-bootstrap';
import { convertUnixTime } from '../util';

class CategoryPosts extends Component {
    render() {
        if(this.props.location.pathname === '/') {
            return (
                <div>{this.props.posts.length && this.props.posts.map((post, idx) => <p key={idx}>{post.title}<br/>by {post.author}  
                <Link to = {`/post/${post.id}`}> read...</Link></p>)}</div>
            );
        }

        let selectedCategory = this.props.location.pathname.replace(/\//g,'');
        let postsForCategory = this.props.posts.filter(post => post.category === selectedCategory);
        console.log(postsForCategory);
        return (
            <div>{postsForCategory.length && postsForCategory.map((post, idx) => 
                <Panel key={idx} className='post-panel'>
                    <Panel.Heading>{post.title}</Panel.Heading>
                    <Panel.Body>{post.body}</Panel.Body>
                    <Panel.Footer>by {post.author} on {convertUnixTime(post.timestamp)}&nbsp;&nbsp;&nbsp;{post.voteScore} <Glyphicon glyph="glyphicon glyphicon-thumbs-up"></Glyphicon>
                    {/* <ButtonToolbar>
                        <Button bsStyle="primary">Edit</Button>
                        <Button bsStyle="danger">Delete</Button>
                    </ButtonToolbar> */}
                    </Panel.Footer>
                </Panel>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentPosts: state.currentPosts,
    posts: state.posts
});

export default withRouter(connect(mapStateToProps)(CategoryPosts));