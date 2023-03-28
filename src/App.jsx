import { useState } from 'react'
import './App.css'
import Card from './Card.jsx'
import List from './List.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>hello world</h2>
      <Card />
      <Card />
      <Card />
      <List />
    </div>
  )
}

export default App
