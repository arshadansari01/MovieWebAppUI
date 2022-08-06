import React, { useEffect, useState } from 'react'
import '../Components/RenderArrayofSeatObjects.css';
import Cookies from 'js-cookie';

import screenImage from '../Components/screen.png'

function RenderArrayofSeatObjects() {

    const [amount, setAmount] = useState(0);
    const payRs = "Pay Rs. " + amount + " to proceed";



    const [seats, setSeats] = useState([]);

    function loadSeats() {
        const movieId = Cookies.get('movieId');
        const theatreId = Cookies.get('theatreId');
        const showTime = Cookies.get('showTime');

        fetch('http://localhost:9000/movie/admin/fetchSeats?movieId=' + movieId + '&theatreId=' + theatreId + '&showTime=' + showTime)
            .then(response => response.json())
            .then(jsonData => (setSeats(jsonData)))
    }

    useEffect(loadSeats, []);

    function handleSeatSelection(event) {
        console.log(event);
        const seatName = event.target.id;


        const temp = [...seats];
        let newAmount;
        for (let i = 0; i < temp.length; i++) {

            if (temp[i].id == seatName && temp[i].status == "Selected") {
                temp[i].status = "Available";
                newAmount = amount - parseInt(temp[i].price);

            }
            else if (temp[i].id == seatName) {
                temp[i].status = "Selected";
                newAmount = parseInt(temp[i].price) + amount;
            }

        }
        setSeats(temp)
        setAmount(newAmount);
    }

    function handleContinuefunction() {
        alert("Please select available seat to continue");


    }

    function handlePayRsfunction() {
        let selectedSeats = [];
        seats.forEach(seat => {
            if (seat.status == 'Selected') {
                selectedSeats.push(seat.id);
            }
        })
        console.log(selectedSeats);
        document.cookie = 'seats=' + selectedSeats.join(',');
        window.location.href = "/booking";
    }


    const SeatList = seats.map(
        (seatindex) => {
            if (seatindex.status == "Booked") {

                return <div className='booked' >
                    {seatindex.id}
                    <div>
                        {seatindex.price}
                    </div>
                </div>
            }

            if (seatindex.status == "Selected") {

                return <div id={seatindex.id} className='Seat Selected' onClick={handleSeatSelection}>

                    {seatindex.id}
                    <div id={seatindex.id}>
                        {seatindex.price}
                    </div>
                </div>
            }
            return <div className='Seat' key={seatindex.id} id={seatindex.id} onClick={handleSeatSelection}>
                {seatindex.id}
                <div id={seatindex.id} >

                    {seatindex.price}
                </div>

            </div >
        }
    )
    return (

        <div  className='screen'>

            <div className='SeatContainer' >
                {SeatList}

            </div>
          
            <div className="screen-this-way">
                <img src={screenImage} />
            </div>

            <div className='continueButtonContainer'>
                {amount == 0 ?
                    <input type="button" className='continueFunctioncss' onClick={handleContinuefunction} value="Continue" />
                    :
                    <input type="button" className='continueFunctioncss' onClick={handlePayRsfunction} value={payRs} />
                }
            </div>
        </div>
    )
}

export default RenderArrayofSeatObjects;    