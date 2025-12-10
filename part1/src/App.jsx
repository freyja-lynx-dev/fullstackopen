// This represents Exercises 12, 13, and 14
import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Display = ({text}) => <div>{text}</div>

const Anecdote = ({text, votes}) => {
  return (
    <>
    <Display text={text} />
    <Display text={'Has ' + votes + ' votes'} />
    </>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const randomSelection = () => {
    const next = Math.floor(Math.random() * 8)
    console.log(next)
    setSelected(next)
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    let newHigh = mostVoted
    // logic for most voted
    for (let i = 0; i < 8; i++) {
      if (newVotes[i] > newVotes[newHigh]) {
        newHigh = i
      }
    }
    setMostVoted(newHigh)
  }

  return (
    <div>
      <h1>Anecdote of this moment</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={randomSelection} text='Next anecdote' />
      <Button onClick={addVote} text='Add vote' />
      <h1>Most voted anecdote</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
