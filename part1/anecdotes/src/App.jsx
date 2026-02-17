import { useState } from 'react'

const Display = (props) => {
   return (
    <h1>{props.name}</h1>
   )
}

const Button = (props) => {
  return(
  <button onClick={props.func}> {props.text}</button>
  )
}

const App = () => {
  
  const title1 = "Anecdote of the day";
  const title2 = "Anecdote with most votes";

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [anecdoteWithMostVotes, setAnecdoteWithMostVotes] = useState(undefined)
  const [votes, setVotes] = useState(
  Array(anecdotes.length).fill(0)
  )


  const generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    
    const maxVotes = Math.max(...copy)
    const indexMax = copy.indexOf(maxVotes)
    setAnecdoteWithMostVotes(indexMax)
  }

  return (
    <div>
      <Display name={title1}/>
      <p>{anecdotes[selected]}</p>
      <Button func={generateRandomNumber} text={"next anecdote"}/>
      <Button func={addVote} text={"vote"}/>
      <p>{"has " + votes[selected] + " votes"}</p>
      <Display name={title2}/>
      <p>{anecdotes[anecdoteWithMostVotes]}</p>
      <p>{"has " + votes[anecdoteWithMostVotes] + " votes"}</p>
    </div>
  )
}

export default App