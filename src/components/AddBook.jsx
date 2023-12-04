/* eslint-disable */


// *********** IMPORTS *********** //

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

// *********** IMPORTS *********** //



export default function AddBook(  {showToast}  ){

  const navigateToAnotherPage = useNavigate();

  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");


  const [error, setError] = useState("");


  const isbnError = isbn.length != 14 ? "ISBN Must be 14 Characters Long" : "";
  const titleError = title.length < 1 || title.length > 100 ? "Title Must be Between 1 and 100 Characters Long" : "";
  const authorError = author.length < 1 || author.length > 100 ? "Author Must be Between 1 and 100 Characters Long" : "";
  const genreError = genre.length < 1 || genre.length > 100 ? "Please Select a Genre" : "";
  const yearError = year.length != 4 ? "Year Must be 4 Characters" : "";
  const priceError = price.length < 1 || price.length > 100 ? "Price Must be Between 1 and 100 Characters Long" : "";
  const descriptionError = description.length < 1 || description.length > 100 ? "Description Must be Between 1 and 100 Characters Long" : "";



  const onAddBook = (evt) => {
    evt.preventDefault();

    setError("");

    if(isbnError){
      setError(isbnError);
      return;
    }
    if(titleError){
      setError(titleError);
      return;
    }
    if(authorError){
      setError(authorError);
      return;
    }
    if(genreError){
      setError(genreError);
      return;
    }
    if(yearError){
      setError(yearError);
      return;
    }
    if(priceError){
      setError(isbnError);
      return;
    }
    if(genreError){
      setError(genreError);
      return;
    }
    if(descriptionError){
      setError(descriptionError);
      return;
    }


    axios.post(`${import.meta.env.VITE_API_URL}/api/books/add`, 
    {isbn, title, author, genre, publication_year:year, price, description}, 
    {withCredentials: true})
    .then(response => {
      console.log(response.data.message);
      showToast(`${response.data.message}`,"success");

      navigateToAnotherPage("/");
    })
    .catch(error => 
      console.log(error)
    );
  }

    return(
    <>
      <form   onSubmit={(evt) => onAddBook(evt)}>

        <h1 className="mt-5"> Add A Book </h1>
        <div className="form-group d-flex flex-column ">


        <div className="form-group col-4  mt-3   ">
          {error && <div className="alert alert-danger">{error}</div>}
        </div>

      
          <div className="form-group col-4  mt-3   ">
            <label htmlFor="isbn" className="form-label">ISBN</label>
            <input 
                type="text" className="form-control" 
                id="isbn"  placeholder="Enter Books ISBN"
                value={isbn} onChange={(evt) => setIsbn(evt.target.value)} 
            />
          </div>

          <div className="form-group  col-4 mt-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
                type="text" className="form-control" 
                id="title"  placeholder="Enter Title"
                value={title} onChange={(evt) => setTitle(evt.target.value)} 
            />
          </div>

          <div className="form-group  col-4 mt-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input 
                type="text" className="form-control" 
                id="author"  placeholder="Enter Author"
                value={author} onChange={(evt) => setAuthor(evt.target.value)} 
            />          
          </div>

          <div className="form-group  col-4 mt-3">
            <label htmlFor="title" className="form-label">Choose a Genre</label>
            <select className="form-control" aria-label="Default Select Example"
              value={genre} onChange={(evt) => setGenre(evt.target.value)}
            >
              <option value="Fiction">Fiction</option>
              <option value="Magical Realism">Magical Realism</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </select>
          </div>

          <div className="form-group  col-4 mt-3">
            <label htmlFor="year" className="form-label">Year</label>
            <input 
                type="text" className="form-control" 
                id="year"  placeholder="Enter Year"
                value={year} onChange={(evt) => setYear(evt.target.value)} 
            />          </div>

          <div className="form-group  col-4 mt-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input 
                type="text" className="form-control" 
                id="price"  placeholder="Enter Price"
                value={price} onChange={(evt) => setPrice(evt.target.value)} 
            />          
          </div>

          <div className="form-group  col-4 mt-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
                type="text" className="form-control" 
                id="title"  placeholder="Enter Title" rows="3"
                value={description} onChange={(evt) => setDescription(evt.target.value)} 
            />          
          </div>

          <div className="form-group  col-4 mt-3">
            <button type="submit" className="form-control btn btn-primary mt-4">Add Book</button>
          </div>

        </div>
      </form>
    </>
  )
}