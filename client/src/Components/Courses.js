import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//Fetches all courses from the data base.
class Course extends Component {
    constructor() {
        super();
        this.state = {
          courses: []
        };
      } 
    
      componentDidMount() {
        this.apiCall();
      }

      //Accesses data from database that is based into state
    apiCall = () => {
      fetch('http://localhost:5000/api/courses')
        .then(response => response.json())
        .then(responseData => {
          this.setState({courses: responseData})
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
    }  
    render(){
        let courses = this.state.courses
        return(
          <>
            <main>
            <div className="wrap main--grid">         
            {courses.map(course => {
                return(
                    <NavLink className="course--module course--link" to={`/courses/${course.id}`} key={`link-${course.id}`}>
                    <h2 className="course--label" key={`name-${course.id}`}>Course</h2>
                    <h3 className="course--title" key={`title-${course.id}`}>{course.title}</h3>
                    </NavLink>
                    )
                }
            )
            }
                <NavLink className="course--module course--add--module" to={"courses/create"}>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </NavLink>
            </div>
        </main>
        </>
        )
    }
}

export default Course