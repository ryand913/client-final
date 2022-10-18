import React from 'react';

//Not used -- testing
const Test = props => {
let courses = props.data;
console.log(props.data)
return(
<div>
    {courses.map(course => {
        return(
        <li>{course.title}</li>
        )
    })}
</div>
)
}

export default Test;