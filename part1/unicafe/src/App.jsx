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

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={(good / all) * 100 + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {

  const title1 = 'give feedback'
  const title2 = 'statistics'
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickOnGood = () => { 
    let clics = good + 1 
    setGood(clics) } 

  const clickOnNeutral = () => { 
    let clics = neutral + 1 
    setNeutral(clics) } 
    
    const clickOnBad = () => { 
      let clics = bad + 1 
      setBad(clics) }

  return (
    <div>
      <Display name={title1}/> 
      <Button func={clickOnGood} text={"good"}/> 
      <Button func={clickOnNeutral} text={"neutral"}/> 
      <Button func={clickOnBad} text={"bad"}/>
      <Display name={title2}/> 
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App