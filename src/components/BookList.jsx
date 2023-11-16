
// *********** IMPORTS *********** //
import axios from "axios"

import { useState, useEffect } from "react"

// *********** IMPORTS *********** //






export default function BookList(){


  const [books, setBooks] = useState([]);



  // useEffect(() => {

  // }, []);


  useEffect(() => {
    // Gets our host and sees if they have the credentials and auth
    axios.get("http://localhost:3000/api/books/books-list", {withCredentials: true})

    // If you retrieve books then set the books to the data you get
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => console.log(error));

  }, []);
  
  


  return(
    <>
      <h1 className="m-5">BOOK LIST HERE</h1>
      

      {/* If there is no books display the h2   IF THERE ARE  Map and list all of the following items*/}
      {!books.length ? <h2>No Books to display</h2> :
        books.map(book => {
          return(
            <div key={book._id}>
              <h3>{book.title}</h3>
              <h4>{book.author}</h4>
              <br/>
              <p>{book.description}</p>
              <br/> <br/>
            </div>
          )
        })      
      }
    </>
  )


}