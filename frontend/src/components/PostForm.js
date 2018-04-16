import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DebounceInput } from "react-debounce-input";
import v4 from 'uuid/v4';
import { createNewPost } from '../actions/PostsActions';

class PostForm extends Component {
    constructor(props) {
        super(props);
        // if(this.props.edit === true) {
        //     let postId = this.props.match.params.postId;
        //     let currentPost = (this.props.posts.filter(post => post.id === postId))[0];
        //     console.log(currentPost);
        //     this.state = {
        //         id: currentPost.id,
        //         title: currentPost.title,
        //         author: currentPost.author,
        //         body: currentPost.body,
        //         category: currentPost.category,
        //         timestamp: currentPost.timestamp,
        //     }
        // }
        this.state = {
            id: '',
            title: '',
            author: '',
            body: '',
            category: '',
            timestamp: '',
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    handleSudmit(e) {
        e.preventDefault();
        console.log('form submitted');
        let post = {
            author: this.state.author,
            body: this.state.body,
            category: 'react',
            id: v4(),
            timestamp: Date.now(),
            title: this.state.title,
        }

        this.props.createNewPost(post).then((result) => {
            this.setState({
                author: '',
                body: '',
                category: '',
                title: '',
            })
        })
    }

    render() {
        let currentPost;
        let postId = this.props.match.params.postId;
        let editingMode = postId ? true : false;
        if(editingMode) currentPost = (this.props.posts.filter(post => post.id === postId))[0];

        return (
            <span>
                <h4>{editingMode ? 'Edit a post' : 'Add a new post'}</h4>
                <br />
                <br />
                <form onSubmit={this.handleSudmit.bind(this)}>
                    <label>
                        Title
                        <DebounceInput debounceTimeout={300} type='text' name='title' onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title} required/>
                    </label>
                    <br />
                    <label>
                        Post
                        <DebounceInput debounceTimeout={300} element="textarea" forceNotifyByEnter = {false} onChange={(e) => this.setState({ body: e.target.value })} value={this.state.body} required/>
                    </label>
                    <br />
                    <label>
                        Author name
                        <DebounceInput debounceTimeout={300} type='text' name='author' onChange={(e) => this.setState({ author: e.target.value })} value={this.state.author} required/>
                    </label>
                    <br />
                    {/* <label>
                        Category:
                        <select value={this.state.category} onChange={(e) => this.setState({ category: e.target.value })}>
                            {this.props.categories.map(category => {
                                return <option value={category.name} key={category.name}>{category.name}</option>
                            })}
                        </select>
                    </label> */}
                    <br />
                    <input type='submit' value='Submit' />
                </form>
            </span>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    categories: state.categories,
})

const mapsDispatchToProps = (dispatch) => ({
    createNewPost: (post) => dispatch(createNewPost(post))
})

export default withRouter(connect(mapStateToProps, mapsDispatchToProps)(PostForm))