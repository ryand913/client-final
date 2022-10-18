import React, { Component } from 'react';
import Form from './Form';
export default class CreateCourse extends Component {

    //Renders a form to create a course in the database. The four attributes are passed through a helper method in Data.js
    state = {
        title: '',
        description: '',
        materialsNeeded: '',
        estimatedTime: '',
        errors: [],
      }

    render(){

        const {
            title,
            description,
            materialsNeeded,
            estimatedTime,
            errors,
          } = this.state;
          const { context } = this.props;

        return(
          <>

            <main>
              <div className="wrap">
                <h2>Create Course</h2>
                <Form
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                    <React.Fragment>
                    <div className="main--flex">
                    <div>
                    <label>
                    Course Title</label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={this.change}
                         />
                    <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
                    <label>
                    Course Description</label>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.change}
                         />
                        </div>
                        <div>
                        <label>
                    Esimated Time</label>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="estimatedTime"
                        value={estimatedTime}
                        onChange={this.change}
                         />
                        <label>
                    Materials Needed</label>
                        <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        type="email"
                        value={materialsNeeded}
                        onChange={this.change}
                         />

                        </div>
                        </div>
                    </React.Fragment>
                  )} />
              </div>
            </main>
            </>
        )
    }

    //Helper methods for Course Form
    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }

submit = () => {

    const { context } = this.props;
    const userId = context.authenticatedUser.id
    console.log(userId)
    const {
      title,
      description,
      materialsNeeded,
    estimatedTime
  } = this.state;

  const course = {
    title,
    description,
    materialsNeeded,
    estimatedTime,
    userId: userId
  };
  context.data.createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password )
  .then( errors => {
    if(errors.length){
      this.setState({ errors });
    } else {
      this.props.history.push('/');
    }
  })
  .catch( err => {
    console.log(err);
  })
}
cancel = () => {
    this.props.history.push('/');
  }
}