
// *********** IMPORTS *********** //
import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";

// *********** IMPORTS *********** //






export default function BookList(){


  const [books, setBooks] = useState([]);
  const [deleteCounter, setDeleteCounter] = useState(0);


  // useEffect Template
  // useEffect(() => {
  // }, []);


  useEffect(() => {
    // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
    axios.get("http://localhost:3000/api/books/books-list",             {withCredentials: true})

    // If you retrieve books then set the books useState to the data you get from backend
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => console.log(error));

  }, [deleteCounter]);
  
  

  function onBookDelete(evt, bookId){
    evt.preventDefault();

    axios.delete(`http://localhost:3000/api/books/delete/${bookId}`, {withCredentials: true})
    .then(response => { 
      // When you delete a book this counter goes up by 1
      setDeleteCounter(previousCount => previousCount +1)
      console.log(response.data)
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
            <div className="card">
              <div className="card-header">
                {book.title}
              </div>
              <div className="card-body">
                <p className="card-text">{book.description}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger" onClick={(evt) => onBookDelete(evt, book._id)}>Delete</button>
              </div>
            </div>
          </div>
      ))};
      </div>

      }
    </>
  )


}