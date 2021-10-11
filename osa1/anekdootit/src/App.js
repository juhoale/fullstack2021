import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Anekdote = (props) => {
  return(
  <div>
    <h2>{props.title}</h2>
    <p>{props.anecdote}</p>
    <p>Has {props.points} votes</p>
  </div>
  )
}

const BestAnekdote = (props) => {
  if(props.best === undefined) {
    return (
    <div>
      <h2>{props.title}</h2>
      <p>No votes yet</p>
    </div>
    )
  }
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.best}</p>
      <p>has {props.points} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))   
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState(null)

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * (anecdotes.length))
    setSelected(random) 
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setBest(copy.indexOf(Math.max(...copy)))
  }


  return (
    <div>
      <Anekdote title="Anectode of the day" anecdote={anecdotes[selected]} points={points[selected]}/>
      <div>
        <Button text="Next" handleClick={handleNextClick} />
        <Button text="Vote" handleClick={handleVoteClick} />
      </div>
      <BestAnekdote title="Anecdote with most votes" best={anecdotes[best]} points={points[best]}/>
    </div>
  )
}

export default App