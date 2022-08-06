import React, { useEffect, useState } from 'react'
import '../Components/RenderArrayofTheatreObjects.css';
import Cookies from 'js-cookie';

function RenderArrayofTheatreObjects() {
    const [theatre, setTheatre] = useState([]);
    const [movie, setMovie] = useState({});

    const dates = ['Jul 14',
        'Jul 15',
        'Jul 16',
        'Jul 17',
        'Jul 18'];
    const [selectedDate, setSelectedDate] = useState(dates[0]);




    function loadTheatresAndMovieDetail() {
        const movieId = Cookies.get('movieId');
        fetch('http://localhost:9000/movie/admin/fetchMovieTheatres?movieId=' + movieId)
            .then(response => response.json())
            .then(jsonData => (setTheatre(jsonData)))

        fetch('http://localhost:9000/movie/admin/fetchMovie?movieId=' + movieId)
            .then(response => response.json())
            .then(jsonData => (setMovie(jsonData)))
    }

    function setDate(d) {
        setSelectedDate(d);
    }

    useEffect(loadTheatresAndMovieDetail, []);

    function openSeatPage(id, time) {
        document.cookie = "theatreId=" + id;
        document.cookie = "showTime=" + time;

        //event.target.value="timechnaged";

        window.location.href = "/seatSelect";


    }
    const theatreList = theatre.map(
        (theatreIndex) => {
            return <div className='theatreList'>
                <div className='theatreDetail'>
                    <div>
                        {theatreIndex.name}
                    </div>
                    <div>
                        {theatreIndex.address}
                    </div>
                </div>
                <div className='theatreTime' >
                    {
                        theatreIndex.shows.map(show => <div className='showtime'
                            onClick={function () { openSeatPage(theatreIndex.id, show.time) }}>
                            {show.time}
                        </div>
                        )
                    }

                </div>


            </div>



        }

    )

    return (
        <div>
            <div className='movieContainer'>
                <img className='movieImage' src={movie.imageUrl} />
                <div className='movieDetails'>
                    <h1>{movie.name}</h1>
                    <div> <b>Language: </b> {movie.language}</div>
                    <div> <b>Cast & crew:</b>  {movie.casting}</div>
                    <div> <b>Duration: </b> {movie.duration}</div>
                    <div> <b>Genre: </b> {movie.genre}</div>
                    <div> <b>Release Date:</b>  {movie.dateOfRelease}</div>
                </div>
            </div>
            <div className='dateSection'>
                {
                    dates.map(date => <div className={date == selectedDate ? 'date selectedDate' : 'date'} onClick={() => setDate(date)}>{date}</div>)
                }
            </div>
            <div className='theatreContainer'>

                {theatreList}
            </div>
        </div>
    )
}

export default RenderArrayofTheatreObjects