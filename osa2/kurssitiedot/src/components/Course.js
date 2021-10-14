import React from 'react'

const Course = ({courses}) => {
    return (
      courses.map((course) =>
      <div key={course.id}>
        <Header name = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
      )
    )
  }
  
  const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.exercises
    }, 0)
  
    return (
      <p style={{fontWeight: "bold"}}>total of {sum} exercises</p>
    ) 
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map((part) =>
      <Part name={part.name} exercises={part.exercises} key={part.id}/>
      )
    )
  }

  export default Course