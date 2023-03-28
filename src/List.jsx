import { useState } from 'react'
import './List.css'

function List(list) {

    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const URL = "https://api.seatgeek.com/2/events?venue.state=NY&venue.city=Buffalo&taxonomies.name=concert&client_id=" + API_KEY

    const [count, setCount] = useState(0)

    return (
        <div className="List">
            <form></form>
        </div>
    )
}

export default List