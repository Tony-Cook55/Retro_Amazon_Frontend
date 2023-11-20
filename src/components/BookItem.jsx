

/* eslint-disable */




// *********** IMPORTS *********** //
import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";

// *********** IMPORTS *********** //








export default function BookItem(  {book, onBookDelete}  ){
  return(
    <>
    
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




    </>
  )
}