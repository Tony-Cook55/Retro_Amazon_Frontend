

/* eslint-disable */


// *********** IMPORTS *********** //
import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";


import BookItem from "./BookItem";

// *********** IMPORTS *********** //






export default function BookList(  {showToast, usersRole}  ){


  const [books, setBooks] = useState([]);
  const [deleteCounter, setDeleteCounter] = useState(0);


    // PAGES AND NEW PAGES //
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
  


  // GETS ALL OF OUR BOOKS   ||   what ever is in those brackets "so" [deleteCounter], call useEffect
  useEffect(() => {
    // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
    axios.get(`${import.meta.env.VITE_API_URL}/api/books/books-list`, 
      {withCredentials: true}
    )

    // If you retrieve books then set the books useState to the data you get from backend
    .then(response => {

      // This below sets the total amount of pages there are based on the amount of items we have
      const pageSize = 3;
      const totalBooks = response.data.length;
      const pages = Math.ceil(totalBooks/pageSize);
      setTotalPages(pages);

      handlePageChange(currentPage);

      // setBooks(response.data);
    })
    .catch(error => console.log(error));

  }, [deleteCounter]);


  // This will reload the list of items for every time the page button is clicked
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    axios.get(`${import.meta.env.VITE_API_URL}/api/books/books-list`, 
      {withCredentials: true , params:{pageNumber, pageSize: 3}}
    )
    .then(response => {
      setBooks(response.data);
    })
    .catch(error => console.log(error))
  }



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




  const onSearchFormSubmit = (evt) => {
    evt.preventDefault();

    // the 3rd . like  .search || .minPrice  ==  the id of the input
    const keywordSearch = evt.target.search.values;

    const minPrice = evt.target.minPrice.value;
    const maxPrice = evt.target.maxPrice.value;

    const genre = evt.target.genre.value;

    const sortBy = evt.target.sortBy.value;




    axios.get(`${import.meta.env.VITE_API_URL}/api/books/books-list`,
      {withCredentials: true , 
      // These need to match the name of the key we called it like in postman
      params: {keywords: keywordSearch, minPrice, maxPrice, genre, sortBy, /*pageNumber: 1, pageSize: 3*/} }  // Passing the param or key from postman
    )

    // If you retrieve books then set the books useState to the data you get from backend
    .then(response => {
      // IF the responses data is an empty array of items, DO NOT UPDATE TO SHOW
      if(response.data.length === 0){
        console.log("NO BOOKS BRO!");
        return
      };

      setBooks(response.data);
    })
    .catch(error => console.log(error));
  }




  const generatePageNumbers = () => {
    const pageNumbers = [];
    for(let i = 1; i <= totalPages; i++){
      pageNumbers.push(i);
    }
    return pageNumbers;
  }



  return(
    <>
      <h1 className="m-5">BOOK LIST HERE</h1>
      

      {/* If there is no books, display the h2  : IF THERE ARE : Map and list all of the following items*/}
      {!books.length ? <h2><Link to="/login">Please Login To View All Books</Link></h2> :
        
      <div className="row">


        {/* Searching For Books With Params */}
        <form onSubmit={(evt) => onSearchFormSubmit(evt)}>
          {/* Searching for Books by Keywords */}
          <div className="form-group">
            <label htmlFor="search" className="form-label">Keywords</label>
            <input type="text" className="form-control" id="search" placeholder="Search Books By Keywords" />
          </div>
          {/* Searching for Books by Keywords */}

          {/* Max and Min Price */}
          <div className="form-group">
            <label htmlFor="minPrice" className="form-label">Min Price</label>
            <input type="number" className="form-control" id="minPrice" placeholder="Min Price" />
          </div>
          <div className="form-group">
            <label htmlFor="maxPrice" className="form-label">Max Price</label>
            <input type="number" className="form-control" id="maxPrice" placeholder="Max Price" />
          </div>
          {/* Max and Min Price */}

          {/* Genre */}
          <div className="form-group">
            <label htmlFor="genre" className="form-label">Genre</label>
            <select id="genre" className="form-control">
              <option value="">All</option>
              <option value="Fiction" className="form-control">Fiction</option>
              <option value="Non-Fiction" className="form-control">Non-Fiction</option>
              <option value="Magical Realism" className="form-control">Magical Realism</option>
              <option value="Dystopian" className="form-control">Dystopian</option>
              <option value="Mystery" className="form-control">Mystery</option>
              <option value="Young Adult" className="form-control">Young Adult</option>
            </select>
          </div>
          {/* Genre */}

          {/* Sort By Items */}
          <div className="form-group">
            <label htmlFor="sortBy" className="form-label">Sort By</label>
            <select id="sortBy" className="form-control">
              <option value="">Select A Item To Sort By</option>
              <option value="price" className="form-control">Price</option>
              <option value="year" className="form-control">Year</option>
            </select>
          </div>
          {/* Sort By Items */}



          {/* Submit Button */}
          <br/>
          <button type="submit" className="btn btn-primary">Search</button>
          <br/><br/>
          {/* Submit Button */}
        </form>
        {/* Searching For Books With Params */}




        {books.map(book => (
            <div key={book._id}  className="col-4">
              <BookItem  book={book} key={book._id}   onBookDelete={onBookDelete} usersRole={usersRole}/>
            </div>
        ))}



          <nav aria-label="Page Navigation">
            <ul className="">
              {generatePageNumbers().map((pageNumber) => (
                <li className={`page-item ${pageNumber === currentPage ? "Active" : ""}`} key={pageNumber}>
                  <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                </li>
              ))}
            </ul>

          </nav>


      </div>

      }
    </>
  )


}