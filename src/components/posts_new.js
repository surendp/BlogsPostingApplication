import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost} from "../actions/index";

class PostsNew extends Component{

  renderField(field){
    // destructuring to pull off touched and error from meta object
    const { meta : { touched, error} } = field;
    const className=`form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
      this.props.createPost(values, () => {this.props.history.push('/')});
  }


  render(){
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
      <Field
        label="Post Content"
        name="content"
        component={this.renderField}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to = "/" className="btn btn-danger">Cancel</Link>
    </form>
    )
  }
}

const validate =(values) => {

  const errors = {};

  if(!values.title){
    errors.title="Enter a title!";
  }
  if(!values.categories){
    errors.categories="Enter some categories";
  }
  if(!values.content){
    errors.content="Enter some content please";
  }

  // if the erroes object is empty, the form is valid
  return errors;
}

export default reduxForm({
  validate,
  form : 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
