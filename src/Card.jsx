import { useState } from 'react'
import './Card.css'

function Card() {
  const [count, setCount] = useState(0)

  return (
    <div className="Card">
      <h2 className='title'>title</h2>
      <h3 className='stat'>stat</h3>
    </div>
  )
}

export default Card