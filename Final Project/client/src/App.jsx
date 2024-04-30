import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/createListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Reserve from './pages/Reserve';
import Alluser from './pages/Alluser';
import AdminSignIn from './pages/Adminsignin';

import Chatbot from "./components/Chatbot/Chatbot";



import ChatBot from "react-chatbotify";





export default function App() {
  

  return <BrowserRouter>
  
  <Routes>
        <Route path="/admin-sign-in" element={<AdminSignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/alluser" element={<Alluser />} />
        </Route>
      </Routes>

      {!(window.location.pathname === '/admin-sign-in' || window.location.pathname === '/alluser') && <Header />}

	  <Chatbot />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<Signin />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path="/search" element={<Search />} />

    <Route path="/listing/:listingId" element={<Listing />} />
    <Route path="/reserve/:listingId" element={<Reserve />} />

    <Route element ={<PrivateRoute/>} > 
      <Route path="/profile" element={<Profile />} />
      <Route path='/create-listing' element={<CreateListing/>}/>
      <Route path='/update-listing/:listingId' element={<UpdateListing />}
    />
  </Route>
   </Routes>
   
  </BrowserRouter>;
}




