import React, { useEffect, useState } from 'react'
import '../Components/Order.css';
import Cookies from 'js-cookie';

function Admin() {
    const [bookings, setBookings] = useState([]);

    function loadBookings() {
        const userId = Cookies.get('userId');
        fetch('http://localhost:9000/movie/admin/checkOverallBooking')
            .then(response => response.json())
            .then(jsonData => {
                setBookings(jsonData);
                console.log(jsonData)
            })
    }

    function logout() {
        document.cookie = 'userId=';
        window.location.href = '/'
    }

    function checkUserDetail (user) {
        console.log(user)
        if(user != null) {
            alert('Booking Customer Details:\nName: '+ user.firstName + '\nMobile: ' + user.mobileNumber + '\nEmail: ' +user.emailId)
        }

    }

    useEffect(loadBookings, []);



    return (
        <div>
            <div className='logout' onClick={logout}>Logout</div>
            {bookings.length == 0 && <div className='no-booking'>You dont have bookings yet!</div>}
            {bookings.map(booking => {
                return <div className='movieContainer'>
                    <img className='movieImage' src={booking.movie.imageUrl} />
                    <div className='movieDetails'>
                        <h1>{booking.movie.name}</h1>
                        <div> <b>Language: </b>{booking.movie.language}</div>
                        <div> <b>Cast & crew:</b>  {booking.movie.casting}</div>
                        <div> <b>Duration: </b> {booking.movie.duration}</div>
                        <div> <b>Genre: </b> {booking.movie.genre}</div>
                        <div> <b>Release Date:</b>  {booking.movie.dateOfRelease}</div>
                    </div>
                    <div className='movieDetails'>
                        <h1>Booking Details</h1>
                        <div> <b>Theatre Name: </b>{booking.theatre.name}</div>
                        <div> <b>Address:</b>  {booking.theatre.address}</div>
                        <div> <b>Show time: </b> {booking.time}</div>
                        <div className='seatContainer'>
                        {
                            booking.seatDetails.map(seat=> {
                                return <div onClick={()=> checkUserDetail(seat.user)} className={seat.seat.status == 'Available' ? 'seat': 'seat selected'}>{seat.seat.id}</div>
                            })
                        }
                                    </div>

                    </div>
                </div>
            })}
        </div>
    )
}

export default Admin