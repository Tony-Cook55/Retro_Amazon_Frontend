
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

  7. npm i react-toastify    ADD these imports:      https://fkhadra.github.io/react-toastify/introduction
      import { ToastContainer, toast } from 'react-toastify'
      import "react-toastify/dist/ReactToastify.css"

  8. npm i dotenv   : GETS US THE .env file


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

import BookEditor from './components/BookEditor'

import AddBook from './components/AddBook'
// COMPONENTS //


// TOASTIFY //
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
// TOASTIFY //

// *********** IMPORTS *********** //




function App() {

  // This will hold in the email about the user once logged in
  const [userFullName, setUserFullName] = useState("");

  // Sets the roles that a user has once logged in
  const [usersRole, setUsersRole] = useState(null);

  // When the component loads use this
  useEffect(() => {
    // Getting the fullName and setting it in our local storage to allow for users to refresh and their name stays
    const getFullName = localStorage.getItem("fullName");
    if(getFullName){
      setUserFullName(getFullName);
    }
  }, []);


  // This is the little pop up function called toasts that we can call in and set the message we want and type of toast
  function showToast(message, type){
    // When called in we must specify the message and the type of toast we want it to look like
    toast(message, {
      type: type,              // info, success, warning, error, default
      position: "bottom-right" // top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
    });
  }





  return (
    <>
      <div className="container       d-flex flex-column min-vh-100">

        <header>
          <nav>
            <NavBar   userFullName={userFullName}   setUserFullName={setUserFullName}  usersRole={usersRole}/>
          </nav>
        </header>


        <main  className="flex-grow-1">
          <ToastContainer />
            <Routes>
              <Route path="/" element={<BookList    showToast={showToast}  usersRole={usersRole}/>} />
              <Route path="/login" element={<LoginForm    setUserFullName={setUserFullName} setUsersRole={setUsersRole}/>} />
              <Route path="/contact" element={<h1>Contact</h1>} />

              {/* When you get to this URL */}
              <Route path="/books/update/:bookId" element={<BookEditor  showToast={showToast}/>} />

              <Route path="/addbook" element={<AddBook    showToast={showToast}/>} />
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
