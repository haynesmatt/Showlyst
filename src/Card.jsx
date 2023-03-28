import { useState } from 'react'
import './Card.css'

function Card(card) {
  const [count, setCount] = useState(0)

  return (
    <div className="Card">
      <h2 className='title'>{card.title}</h2>
      <h3 className='stat'>{card.stat}</h3>
    </div>
  )
}

export default Card