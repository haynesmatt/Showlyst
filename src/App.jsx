import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card.jsx'
import List from './List.jsx'
import axios from 'axios'

function App() {

  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const URL = "https://api.seatgeek.com/2/events?venue.state=NY&venue.city=Buffalo&taxonomies.name=concert&client_id="

  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [lowest, setLowest] = useState(0)
  const [highest, setHighest] = useState(0)

  const [results, setResults] = useState([])

  const [form, setForm] = useState({artist: ""})

  const handleChange = (e) => {
    const newForm = {};
    const newValue = e.target.value
    const key = e.target.name
    newForm[key] = newValue
    setForm({...form, ...newForm})
  }

  useEffect(() => {
      axios.get(URL + API_KEY)
      .then(response => {
          setTotal(response.data.meta.total);
          setLowest(Math.min(...(response.data.events.map(dict => dict.stats.average_price)).filter(num => num !== null)));
          setHighest(Math.max(...(response.data.events.map(dict => dict.stats.average_price)).filter(num => num !== null)));
          const values = response.data.events.map(dict => dict.stats.average_price);
          const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          setAverage(sum / values.length)

          setResults(response.data.events)
      })
    }, [])



  return (
    <div className="App">

      <h1>Showlyst</h1>
      <h2>Upcoming Concerts in Buffalo, NY</h2>

      <div className='cards'>
        <Card title="Total Concerts" stat={total}/>
        <Card title="Average Ticket Price" stat={`$${average}`}/>
        <Card title="Ticket Price Range" stat={`$${lowest} to $${highest}`}/>
      </div>

      <List form={form} handleChange={handleChange} />

      <h2>Upcoming Concerts:</h2>

      {results.map((element, index) => (
          <div className='result'>
            <h2 className='artist'>{`Starring: ${element.performers[0].name}`}</h2>
            <h3 className='genre'>{`Genre: ${element.performers[0].genres != null ? element.performers[0].genres[0].name : `N/A`}`}</h3>
            <h3 className='location'>{`Location: ${element.venue.name}`}</h3>
            <h3 className='ticket-price'>{`Tickets start at $${element.stats.lowest_price}`}</h3>
          </div>
        ))}

    </div>
  )
}

export default App
