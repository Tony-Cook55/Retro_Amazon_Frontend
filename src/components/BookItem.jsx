

/* eslint-disable */




// *********** IMPORTS *********** //
import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";

// *********** IMPORTS *********** //








export default function BookItem(  {book, onBookDelete, onBookUpdate, usersRole}  ){
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

          {/* This sees if the user has the role to Update book If so then you will see this link*/}
          {usersRole.includes("Quality Analyst") && 
            <Link to={`/books/update/${book._id}`} className="btn btn-info" >Update</Link>
          }

        </div>
    </div>




    </>
  )
}