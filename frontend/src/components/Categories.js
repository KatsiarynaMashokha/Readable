import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sortPostsByVotes, sortPostsByTimestamp } from '../actions/PostsActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'react-bootstrap';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: '' 
        }
        this.readPosts =  this.readPosts.bind(this);
        this.updateValue =  this.updateValue.bind(this);
    }  

    updateValue(newValue) {
        this.setState({
            selectValue: newValue
        })
    }

    readPosts() {
        if(this.state.selectValue) {
            this.props.history.push(`/${this.state.selectValue}`);
        }
    }

    render() {
        if(!this.props.categories.length) {
            return <div>Loading...</div>
        }

        const options = this.props.categories.map((category) =>
            ({ value: category.name, label: category.name }));

        return (
        <div>
            <div className="section">
            <h4 className="section-heading">Please select one of the categories below...</h4>
             <Select
                id="category-select"
                autoFocus
                onBlurResetsInput={false}
                onSelectResetsInput={false}
                options={options}
                simpleValue
                clearable={true}
                name="selected-state"
                value={this.state.selectValue}
                onChange={this.updateValue}
                searchable={true}
                disabled={false}
                placeholder="Categories"
            />
            <Button className="get-posts" bsStyle="primary" onClick={this.readPosts}>Read Posts</Button>
            <div className='sort-buttons'>
                <p>Sort by:</p>
                <Button className='sort-btn' onClick={this.props.sortPostsByTimestamp}>most recent</Button>
                <Button className='sort-btn' onClick={this.props.sortPostsByVotes}>most voted</Button>
            </div>
            </div>
        </div>
    )};
}

const mapStateToProps = ({ categories }) => ({
   categories,
});

const mapsDispatchToProps = (dispatch) => ({
    sortPostsByVotes: () => dispatch(sortPostsByVotes()),
    sortPostsByTimestamp: () => dispatch(sortPostsByTimestamp()),
})

export default withRouter(connect(mapStateToProps, mapsDispatchToProps)(Categories));