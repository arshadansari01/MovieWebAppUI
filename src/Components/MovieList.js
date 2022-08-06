import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import '../Components/MovieList.css';


function MovieList() {
    const [movies, setMovies] = useState([]);

    function loadData() {
        loadMovies();
    }

    function loadMovies() {
        fetch('http://localhost:9000/movie')
            .then(response => response.json())
            .then(jsonData => (setMovies(jsonData))


            )
    }
    useEffect(loadData, []);
    function handleTheatreSelection(id) {
        const userId = Cookies.get('userId');
        if (userId == undefined) {
            window.location.href = '/loginInfo';
        } else {
            document.cookie = 'movieId=' + id;
            window.location.href = "/theatreSelect";
        }
    }


    /* const movies = [
         {
             
 
 
         },
         {
             name: 'Jurassic World: Dominion',
             language: 'English',
             imageurl: 'https://img.ticketnew.com/tn/movie/24829/7.jpg?9353956&x-oss-process=image/resize,m_mfit,w_330,h_400/quality,q_80'
         },
         {
             name: 'Runway 34',
             language: 'Hindi',
             imageurl: 'https://img.ticketnew.com/tn/movie/24616/7.jpg?3014720&x-oss-process=image/resize,m_mfit,w_330,h_400/quality,q_80'
         },
         {
             name: 'Jurassic World: Dominion',
             language: 'Hindi',
             imageurl: 'https://img.ticketnew.com/tn/movie/24829/7.jpg?9353956&x-oss-process=image/resize,m_mfit,w_330,h_400/quality,q_80'
         },
         {
             name: 'Doctor Strange: Multiverse',
             language: 'English',
             imageurl: 'https://img.ticketnew.com/tn/movie/24609/7.jpg?9583637&x-oss-process=image/resize,m_mfit,w_330,h_400/quality,q_80'
         }
     ]*/
    const listMovies = movies.map(movie => {
        return <div className='Movie'>
            <img className='Movieimage' src={movie.imageUrl} />

            <div className='moviename'>{movie.name}   </div>

            <div className='moviename'>{movie.language}   </div>
            <div className='btnContainer'>
            <input className="moviebutton" type="button" onClick={function () { handleTheatreSelection(movie.id) }} value="Book Now" />
            </div>
        </div>

    })

    return (

        <div>
            <div className='cityname'>

                <div className='city'><div>Delhi</div></div>
                <div className='city'><div>Bangalore</div></div>
                <div className='city'><div> Mumbai</div></div>
                <div className='city'><div>Chennai</div></div>
                <div className='city'><div>Pune</div></div>
                <div className='city'><div>Kolkata</div></div>
                <div className='city'><div>Kochi</div></div>

            </div>
            <div className='MovieContainer'>


                {listMovies}

            </div>
        </div>



    )

}
export default MovieList;
