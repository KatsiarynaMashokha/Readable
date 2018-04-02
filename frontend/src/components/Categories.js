import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../actions/CategoryActions';

class Categories extends Component {

    componentDidMount() {
        this.props.dispatch(fetchAllCategories());
    }

    render() {
        if(!this.props.categories.length) {
            return <div>Loading...</div>
        }
        return <ul>{this.props.categories.map((category, idx) => <li key={idx}>{category.name}</li>)}</ul>;
    }
}

const mapStateToProps = (state) => ({
   categories: state.categories,
});

export default connect(mapStateToProps)(Categories);