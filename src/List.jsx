import { useState } from 'react'
import './List.css'

function List(list) {

    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const URL = "https://api.seatgeek.com/2/events?venue.state=NY&venue.city=Buffalo&taxonomies.name=concert&client_id=" + API_KEY

    const [count, setCount] = useState(0)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.onSubmit(true)
    }

    return (
        <div className="List">
            <form onSubmit={handleOnSubmit}>
                <h4>Enter Artist:</h4>
                <input type="text" name="artist" className="submission" value={list.form.artist} onChange={list.handleChange}></input>
            </form>
            <button className='filter'>Most Popular</button>
            <button className='filter'>Best Deals</button>
        </div>
    )
}

export default List