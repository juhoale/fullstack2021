import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Title = (props) => {
  return (
  <div>
    <h1>{props.title}</h1>
  </div>
  )
}

const Statisticline = (props) => {
  return(
  <tr>
    <td>{props.text}</td><td>{props.value}</td>
  </tr>
  )
}
 
const Statistics = (props) => {
  if(props.sum===0){
    return(
      <p>No feedback given</p>
    )
  }
  return (
  <div>
    <table>
      <tbody>
        <Statisticline text="Good" value={props.good}/>
        <Statisticline text="Neutral" value={props.neutral}/>
        <Statisticline text="Bad" value={props.bad}/>
        <Statisticline text="All" value={props.sum}/>
        <Statisticline text="Average" value={(props.good - props.bad) / props.sum}/>
        <Statisticline text="Positive" value={props.good / props.sum * 100 + " %"}/>
      </tbody>
    </table>
  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGoodClick = () => {
    setSum(sum + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setSum(sum + 1)
  }

  const handleBadClick = () => {
    setSum(sum + 1)
    setBad(bad + 1)
  }


  return (
    <div>
      <Title title="Give feedback"/>
      <div>
        <Button handleClick={handleGoodClick} text="Good"/>
        <Button handleClick={handleNeutralClick} text="Neutral"/>
        <Button handleClick={handleBadClick} text="Bad"/>
      </div>
      <Title title="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum}/>
    </div>
  )
}

export default App