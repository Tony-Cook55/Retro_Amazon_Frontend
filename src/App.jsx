
/* INSTALL INSTRUCTIONS 

  1. npm create vite@latest .
  2. npm install
  3. npm i bootstrap

  / This allows you to go from page to page \
  4. npm i react-router-dom

  / Allows for the connection of the backend \
  5.npm i axios


  /\ ADD THIS TO THE BACKEND TO ALLOW FOR axios TO CONNECT TO THE BACKEND /\
  6.  npm i cors

  \\ Steps with Axios for backend //
    1. npm i cors
    2. import cors from "cors";

    / Add this into the middleware ABOVE my routers in server.js   This --> app.use("/api/books", BookRouter);
    3 app.use(cors(
        {
        origin: "http://localhost:5173",
        credentials: true
        }
      )); 

    / THIS ACCEPTS JSON DATA IN THE BODY OF THE REQUEST FROM THE CLIENT ADD UNDER  app.use(cors());
    4. app.use(express.json()); 

  \\ Steps with Axios for backend //

  \/ ADD THIS TO THE BACKEND TO ALLOW FOR axios TO CONNECT TO THE BACKEND \/


  TO RUN PROGRAM:      npm run dev

*/






// *********** IMPORTS *********** //
import { useState, useEffect } from 'react'

import './App.css'

// BOOTSTRAP //
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
// BOOTSTRAP //


// THIS USES react-router-dom TO SWITCH PAGE TO PAGE
import {Route, Routes} from "react-router-dom"


// COMPONENTS //
import NavBar from './components/Navbar'

import BookList from './components/BookList'

import LoginForm from './components/LoginForm'

// COMPONENTS //


// *********** IMPORTS *********** //




function App() {

  // This will hold in the email about the user once logged in
  const [userFullName, setUserFullName] = useState("");

  // When the component loads use this
  useEffect(() => {
    // Getting the fullName and setting it in our local storage to allow for users to refresh and their name stays
    const getFullName = localStorage.getItem("fullName");
    if(getFullName){
      setUserFullName(getFullName);
    }
  }, []);


  return (
    <>
      <div className="container       d-flex flex-column min-vh-100">

        <header>
          <nav>
            <NavBar   userFullName={userFullName}   setUserFullName={setUserFullName}/>
          </nav>
        </header>


        <main  className="flex-grow-1">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/login" element={<LoginForm    setUserFullName={setUserFullName}/>} />
              <Route path="/contact" element={<h1>Contact</h1>} />
            </Routes>
        </main>


        <footer>
          <h5 className="sticky">Footer Here :D</h5>
        </footer>

      </div>
    </>
  )
}

export default App
