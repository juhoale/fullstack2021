import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises} </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => 
      <Part name={part.name} exercises={part.exercises} key={part.name}/>)} 
    </div>
  )
}

const Total = (props) => {
  let total = 0
  props.course.parts.map((part) => total += part.exercises) 
  
  return (
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
        <Header courseName={course.name}/>
        <Content course={course}/>
        <Total course={course}/>
    </div>
  )
}

export default App