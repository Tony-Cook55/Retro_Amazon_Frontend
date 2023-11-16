
// *********** IMPORTS *********** //
import { NavLink } from "react-router-dom"
// *********** IMPORTS *********** //





export default function NavBar(){
  
  return(
    <>
      <nav>
        <ul className="nav  nav-tabs">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )


}