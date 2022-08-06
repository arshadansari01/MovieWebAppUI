import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import './Booking.css';


function Booking() {

  const [time, setTime] = useState(200);

  function paid() {
    const movieId = Cookies.get('movieId');
    const theatreId = Cookies.get('theatreId');
    const showTime = Cookies.get('showTime');
    const seats = Cookies.get('seats');
    const userId = Cookies.get('userId');
    
    fetch('http://localhost:9000/movie/admin/changeSeatStatus?movieId=' + movieId + '&theatreId=' + theatreId + '&showTime=' + showTime
      + '&seatIds=' + seats + '&userId=' + userId, {
      method: 'POST'
    })
      .then(response => response.text())
      .then(jsonData => { })

    alert("Movie booked succesfully")
    window.location.href = "/order"
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (time == 0) {
        window.location.href = '/'
      } else {
        const newTime = time - 1;
        console.log(newTime)
        setTime(newTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);


  return (
    <div className='bookingcontainer'>
      <div className='header-payment'>
      <h1> Welcome to the Payment Gateway</h1>
      </div>

      <div className='time-left'>Time Left: {time} s</div>
      <div className='PaymentSection'>

        

        <input className="input-box" type="text" placeholder="Enter Card Number" />
        <div className="cardExpiry">
          <input className="input-box" type="text" placeholder="MM" />
          <input className="input-box" type="text" placeholder="YY" />
          <input className="input-box" type="password" placeholder="CVV" />

        </div>
        <input className="paymentButton" type="button" value="PAY" onClick={paid} />
      </div>
    </div>




  )
}

export default Booking