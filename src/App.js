import logo from './logo.svg';
import './App.css';
import './Components/Navbar';
import { Navbar } from './Components/Navbar';
import About from './Components/About';
import { useState } from 'react';
import './Components/Navbar.css';
import MovieList from './Components/MovieList';
import RenderArrayofSeatObjects from './Components/RenderArrayofSeatObjects';
import Booking from './Components/Booking';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import RenderArrayofTheatreObjects from './Components/RenderArrayofTheatreObjects';
import SignUpForm from './Components/SignUpForm';
import LoginForm from './Components/LoginForm';
import Order from './Components/Order';
import Admin from './Components/Admin';

// import {Route, IndexRoute} from 'react-router';

function App() {
  const [button, setButtonClick] = useState();
  const buttonclick = () => {
    setButtonClick("Welcome to humble abord")
  }
  return (
    <div>
      {<Home />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="about" element={<About />} />
          <Route path="seatSelect" element={<RenderArrayofSeatObjects />} />
          <Route path="booking" element={<Booking />} />
          <Route path="theatreSelect" element={<RenderArrayofTheatreObjects />} />
          <Route path="userInfo" element={<SignUpForm />} />
          <Route path="loginInfo" element={<LoginForm />} />
          <Route path="order" element={<Order />} />
          <Route path="admin" element={<Admin />} />





        </Routes>
      </BrowserRouter>











      {/* <About buttonclick={setButtonClick} /> */}

    </div>
  );
}

export default App;
