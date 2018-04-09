import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPostsForCategory } from '../actions/CategoryActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'react-bootstrap';


class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectValue: '' 
        }
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

        let options = this.props.categories.map((category) => 
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
                onChange={this.updateValue.bind(this)} 
                searchable={true}
                disabled={false}
                placeholder="Categories"
            />
            <Button className="get-posts" bsStyle="primary" onClick={this.readPosts.bind(this)}>Read Posts</Button>
            </div>
        </div>
    )};
}

const mapStateToProps = (state) => ({
   categories: state.categories,
});

const mapsDispatchToProps = (dispatch) => ({
    fetchPostsForCategory: (category) => dispatch(fetchPostsForCategory(category))
})

export default withRouter(connect(mapStateToProps, mapsDispatchToProps)(Categories));