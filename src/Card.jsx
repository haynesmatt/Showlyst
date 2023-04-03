import { useState } from 'react'
import './Card.css'

function Card(card) {
  const [count, setCount] = useState(0)

  return (
    <div className="Card">
      <h3 className='title'>{card.title}: {card.stat}</h3>
    </div>
  )
}

export default Card