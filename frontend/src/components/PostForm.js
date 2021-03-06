import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DebounceInput } from "react-debounce-input";
import { uuidv4 } from '../util';
import { createNewPost, editPost, getPostDetails } from '../actions/PostsActions';
import { Button } from 'react-bootstrap';
import NoMatch from './NoMatch';

let defaultState = {
    id: '',
    author: '',
    body: '',
    category: '',
    title: '',
}

class PostForm extends Component {
    constructor(props) {
        super(props);

        if(props.edit) {
            const postId = props.match.params.postId;
            this.state = {
                id: postId,
            }
        } else {
            this.state = {...defaultState, timestamp: ''}
        }
    }

    handleSudmit(e) {
        e.preventDefault();
        const post = {
            author: this.state.author,
            body: this.state.body,
            category: this.state.category,
            id: uuidv4(),
            timestamp: Date.now(),
            title: this.state.title,
        }

        this.props.createNewPost(post).then((result) => {
            this.setState({
                ...defaultState
            })
        }).then(() => window.alert('New post has been added'))
        .then(() => {
            this.props.history.push('/');
        })
    }

    componentDidMount() {
        if (this.state.id) {
            this.props.getPostDetails(this.state.id).then(result => {
            }).then(() => {
                this.setState({
                    title: this.props.currentPostDetails.title,
                    body: this.props.currentPostDetails.body,
                })
            })
        }
    }

    updatePost() {
        this.props.editPost(this.state.id, this.state.title, this.state.body)
        .then(() => {
            this.setState({
                id: '',
                body: '',
                title: '',
            })
        }).then(() => window.alert('Post has been updated'))
        .then(() => {
            this.props.history.push(`/${this.props.match.params.category}`);
        })
    }

    render() {
        return (
            <span>
                <h4>{this.state.id ? 'Edit a post' : 'Add a new post'}</h4>
                <br />
                <br />
                {this.state.id ? <span>
                    {this.props.currentPostDetails.error ? <NoMatch location={this.props.location}/> : <span>
                        {Object.keys(this.props.currentPostDetails).length ? <span>
                            <label>
                            Title
                                <DebounceInput debounceTimeout={300} type='text' name='editPostTitle' onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title} required/>
                            </label>
                            <br /><br />
                            <label>
                            Post
                                <DebounceInput debounceTimeout={300} element="textarea" forceNotifyByEnter = {false} onChange={(e) => this.setState({ body: e.target.value })} value={this.state.body} required/>
                            </label>
                            <br /><br />
                            <br /><br />
                            <Button bsStyle="primary" onClick={this.updatePost.bind(this)} disabled={(this.state.title && this.state.body) ? false : true}>Update Post</Button></span> : <NoMatch location={this.props.location}/>}
                    </span>}</span> : <span>
                    <label>
                        Title
                        <DebounceInput debounceTimeout={300} type='text' name='title' onChange={(e) => this.setState({ title: e.target.value })} value={this.state.title} required/>
                    </label>
                    <br /><br />
                    <label>
                        Post
                        <DebounceInput debounceTimeout={300} element="textarea" forceNotifyByEnter = {false} onChange={(e) => this.setState({ body: e.target.value })} value={this.state.body} required/>
                    </label>
                    <br /><br />
                    <label>
                        Author
                        <DebounceInput debounceTimeout={300} type='text' name='author' onChange={(e) => this.setState({ author: e.target.value })} value={this.state.author} required/>
                    </label>
                    <br /><br />
                    {this.props.categories.length && <label>
                        Category:&nbsp;
                        <select value={this.props.category} onChange={(e) => this.setState({ category: e.target.value })}>
                            <option value="" disabled selected>Select category</option>
                            {this.props.categories.length > 0 && this.props.categories.map(category => {
                                return <option value={category.name} key={category.name}>{category.name}</option>
                            })}
                        </select>
                    </label>}
                    <br /><br />
                    <Button bsStyle="primary" type='submit' value='Submit' onClick={this.handleSudmit.bind(this)} disabled={(this.state.title && this.state.body && this.state.author && this.state.category) ? false : true}>Submit</Button>
                </span>}
            </span>
        )
    }
}

const mapStateToProps = ({ posts, categories, currentPostDetails }) => ({
    posts,
    categories,
    currentPostDetails,
})

const mapsDispatchToProps = (dispatch) => ({
    createNewPost: (post) => dispatch(createNewPost(post)),
    editPost: (postId, postTitle, postBody) => dispatch(editPost(postId, postTitle, postBody)),
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
})

export default withRouter(connect(mapStateToProps, mapsDispatchToProps)(PostForm))