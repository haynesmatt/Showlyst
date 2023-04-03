import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card.jsx'
import List from './List.jsx'
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label} from "recharts";

function App() {

  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const URL = "https://api.seatgeek.com/2/events?venue.state=NY&venue.city=Buffalo&taxonomies.name=concert&client_id="

  // for the overall stats
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [lowest, setLowest] = useState(0)
  const [highest, setHighest] = useState(0)

  // for the results
  const [results, setResults] = useState([])

  // for the search form
  const [form, setForm] = useState({artist: ""})

  // for the chart graph
  const [chartData, setChartData] = useState([]);

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
          console.log(response.data.events.map(dict => dict.stats.average_price))
          const values = response.data.events.map(dict => dict.stats.average_price);
          const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          setAverage(sum / values.length)

          // for the results
          setResults(response.data.events)

          // for the graph
          setChartData([]);
          const lod = []
          let d = {};
          for (const i in response.data.events) {
            const time = response.data.events[i].datetime_utc.slice(0,10)
            if (d.time == time) {
              d.count += 1;
            } else {
              lod.push(d)
              d = {};
              d.count = 1;
              d.time = time;
            }
          }
          setChartData(lod);
          console.log(chartData);
      })
    }, [])


  return (
    <div className="App">
      <h2>Daily Upcoming Number of Concerts in Buffalo</h2>
      <div>
          <br></br>

          <LineChart
            width={1300}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}
          >
            <Line
              type="monotone"
              dataKey="count"
              stroke="#e09f3e"
              activeDot="Unspecified"
            />
            <CartesianGrid stroke="#fff3b0" strokeDasharray="5 5" />
            <XAxis stroke="#fff3b0" dataKey="time" interval={1} angle={20} dx={20}>
              <Label stroke="#e09f3e" value="Date" offset={0} position="insideBottom" />
            </XAxis>

            <YAxis stroke="#fff3b0"
              label={{
                stroke: "#e09f3e",
                value: "Count",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
              }}
            />
            <Tooltip />
          </LineChart>
        </div>

      <div className='cards'>
        <Card title="Total Concerts" stat={total}/>
        <Card title="Average Ticket Price" stat={`$${average}`}/>
        <Card title="Ticket Price Range" stat={`$${lowest} to $${highest}`}/>
      </div>

      <List form={form} handleChange={handleChange} />

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
