import { useState } from 'react'

const Display = ({text}) => <div>{text}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({value, text}) => <tr><td>{text}</td><td>{value}</td></tr>


const Statistics = ({good, neutral, bad}) => {
  const average = () => {
    return (good + (-1 * bad)) / (good + neutral + bad)
  }

  if (good + neutral + bad === 0) {
    return (
      <>
        <p><b>No feedback yet!</b></p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="average" value={average()} />
        <StatisticsLine text='positive feedback ratio' value={good / (good + bad + neutral)} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => setGood(good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const badFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h1>Feedback Form</h1>
      <h2>Issue your rating</h2>
      <Button onClick={goodFeedback} text='Rate Good' />
      <Button onClick={neutralFeedback} text='Rate Neutral' />
      <Button onClick={badFeedback} text='Rate Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
