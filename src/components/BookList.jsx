

/* eslint-disable */


// *********** IMPORTS *********** //
import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";


import BookItem from "./BookItem";

// *********** IMPORTS *********** //






export default function BookList(  {showToast}  ){


  const [books, setBooks] = useState([]);
  const [deleteCounter, setDeleteCounter] = useState(0);


  // useEffect Template
  // useEffect(() => {
  // }, []);

  // GETS ALL OF OUR BOOKS   ||   what ever is in those brackets "so" [deleteCounter], call useEffect
  useEffect(() => {
    // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
    axios.get(`${import.meta.env.VITE_API_URL}/api/books/books-list`,             {withCredentials: true})

    // If you retrieve books then set the books useState to the data you get from backend
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => console.log(error));

  }, [deleteCounter]);



  function onBookDelete(evt, bookId){
    evt.preventDefault();

    axios.delete(`${import.meta.env.VITE_API_URL}/api/books/delete/${bookId}`, {withCredentials: true})
    .then(response => { 
      // When you delete a book this counter goes up by 1
      setDeleteCounter(previousCount => previousCount + 1);

      // response.data.message is our json message from the backend 
      console.log(response.data.message);

      // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
      showToast(response.data.message, "success");

    })
    .catch(error => 
      console.log(error)
    );
  }



  return(
    <>
      <h1 className="m-5">BOOK LIST HERE</h1>
      

      {/* If there is no books, display the h2  : IF THERE ARE : Map and list all of the following items*/}
      {!books.length ? <h2><Link to="/login">Please Login To View All Books</Link></h2> :
        
      <div className="row">
        {books.map(book => (
            <div key={book._id}  className="col-4">
              <BookItem  book={book} key={book._id}   onBookDelete={onBookDelete}/>
            </div>
        ))}
      </div>

      }
    </>
  )


}