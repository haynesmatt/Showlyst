import { useState } from 'react'
import './List.css'

function List() {
  const [count, setCount] = useState(0)

  return (
    <div className="List">
        <div className='result'>
            <h2 className='artist'>artist</h2>
            <h3 className='location'>location</h3>
            <h3 className='ticket-price'>ticket-price</h3>
        </div>
    </div>
  )
}

export default List