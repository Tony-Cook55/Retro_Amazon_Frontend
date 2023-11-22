
/* eslint-disable */

import axios from "axios";
import { useState, useEffect } from "react";

// used for getting the books ID
import { useParams } from "react-router-dom";

// Changes pages
import { useNavigate } from "react-router-dom";




export default function BookEditor( {showToast} ){

  // This must match the id in the route path thats in App : path="/books/update/:bookId"
  const {bookId} = useParams();

  // This is the actual books information
  const [book, setBook] = useState({});

  // These store the new updated values of these items
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");


  const navigateToAnotherPage = useNavigate();


  /* GETS BOOK BY ID THATS PASSED THROUGH */
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_API_URL}/api/books/${bookId}`, {withCredentials: true})
    .then(response => {
      setBook(response.data);

      // Setting the new ITEMS THAT ARE UPDATED
      setTitle(response.data.title);
      setDescription(response.data.description);
      setAuthor(response.data.author);
      setPrice(response.data.price);

      console.log(response.data);
    })
    .catch(error => console.log(error));

  }, []);




  /* UPDATES THE BOOK */
  function onBookUpdate(evt){
    evt.preventDefault();

    const updatedBook ={
      // Spreading the book
      ...book,

      // Setting the new items here
      title,
      description,
      author,
      price
    }


    // THIS WILL DELETE THE ID SO WHEN WE SPREAD THE ...updatedBook THE ID WONT TRY AND BE PASSED INTO AS THE BODY
    delete updatedBook._id;


    // Does the update backend function
    axios.put(`${import.meta.env.VITE_API_URL}/api/books/update/${bookId}`,
    // This spread of the books is what allows it to be sent as the body.params
    {...updatedBook}
    , {withCredentials: true})
    .then(response => {
      navigateToAnotherPage("/");
      showToast(response.data.message, "success");
      console.log(response.data);
    })
    .catch(error => 
      console.log(error)
    );


  }


  return(
    <>
      <h1>Book Editor  {bookId}</h1>

      <form  onSubmit={(evt) => onBookUpdate(evt)}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" className="form-control" value={title} onChange={(evt) => setTitle(evt.target.value)}></input>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" className="form-control" value={description} onChange={(evt) => setDescription(evt.target.value)}></input>
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" className="form-control" value={author} onChange={(evt) => setAuthor(evt.target.value)}></input>
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" className="form-control" value={price} onChange={(evt) => setPrice(evt.target.value)}></input>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>

      <h3 ></h3>
    </>
  )
}