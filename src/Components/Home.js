import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './Home.css';

function Home() {
  useEffect(loadUserData, []);

  function loadUserData() {
    const userId = Cookies.get('userId');
    if (userId != undefined && userId != '') {
      fetch('http://localhost:9000/user/getUserDetail?userId=' + userId)
        .then(response => response.json())
        .then(jsonData => {
          setuser(jsonData)
        })
    }

    console.log(user)

  }

  function logoClick() {
    window.location.href = '/';
  }

  function userNameClickHandler() {
    if (user.firstName == 'Admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/order';
    }
  }

  function login() {
    window.location.href = '/loginInfo';
  }

  const [user, setuser] = useState(null);


  return (

    <div className='NavigationContainer'>
      <div className='logo' onClick={logoClick}>MovieBooking.com</div>
      <div>

        {
          user == null &&
          <div className='adminpage'>
            <div className='logo' onClick={login}>Login</div>
          </div>
        }
        {
          user != null && user.userId != null && <div onClick={userNameClickHandler} className='username'> Hi {user.firstName}</div>

        }
      </div>




    </div>
  )
}

export default Home