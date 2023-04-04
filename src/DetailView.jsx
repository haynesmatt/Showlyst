import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'

const DetailView = () => {

    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    let params = useParams().id;
    const URL = "https://api.seatgeek.com/2/events/" + params + "?client_id="

    const [artist, setArtist] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get(URL + API_KEY)
        .then(response => {
            setArtist(response.data.performers[0].name)
            setVenue(response.data.venue.name_v2)
            setDate(response.data.datetime_local.slice(0,10))
            setGenre(response.data.performers[0].genres[0].name)
            setImage(response.data.performers[0].image)
        })
      }, [])

    return (
        <div>
            <h2>Concert Details - Starring "{artist}"</h2>
            <img className="images" src={image} / >
            <h3>Located at {venue}</h3>
            <h3>Date: {date}</h3>
            <h3>Genre: {genre}</h3>
        </div>
    );
  };
  
  export default DetailView;