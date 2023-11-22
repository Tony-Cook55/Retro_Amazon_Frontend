
/* eslint-disable */



// *********** IMPORTS *********** //
import { useState } from "react"

import axios from "axios";

// Lets us on a command go to another page
import { useNavigate } from "react-router-dom";

// *********** IMPORTS *********** //


                               // Allows us to set the users fullName from backend to call it in on nav
export default function LoginForm(   {setUserFullName, setUsersRole}   ){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  {/* xxxxx ERROR HANDLING xxxxx */}
    const [error, setError] = useState("");

    // If no email is there say required : if otherwise : the email doesn't have @ say its required : if all good : do nothing " "
    const emailError = !email ? "Email is required" : 
    !email.includes("@") ? "Email must contain @" : "";

    // If no password say its required : if otherwise : the length is less than 8 say must be at least 8 : if all good : do nothing " "
    const passwordError = !password ? "Password is required" :
    password.length < 8 ? "Password Must be at least 8 characters" : "";
  {/* xxxxx ERROR HANDLING xxxxx */}




  const navigateToAnotherPage = useNavigate();


  // Plugs into the submit button --> onClick={(evt) => onSubmitLogin(evt)}
  function onSubmitLogin(evt){
    evt.preventDefault(); // Makes sure that the form doesn't try and post the submit button

    {/* xxxxx ERROR HANDLING xxxxx */}
      // Resets Error message on submit
      setError("");
      
      // If there is a error present we are going to make setError the value of the message to display
      if(emailError){
        setError(emailError);
        return;
      }
      else if(passwordError){
        setError(passwordError);
        return;
      }
    {/* xxxxx ERROR HANDLING xxxxx */}



    {/* SUCCESS  IF NO ERRORS POST LOGIN TO SERVER  SUCCESS */}

    /* This is basically PostMan and on button click this function posts the info into our backend*/
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        // This is plugging in our email & password to the backends/server email & password
          email: email,
          password: password
    }, 
    {
      // ! Receives the cookies from the server and is received on the client !
      withCredentials: true
    })
    // SUCCESS - If response is valid log our backend message results
    .then(response => {
      console.log(response.data);

      // Puts the fullName we get back into the local storage
      localStorage.setItem("fullName", response.data.fullName);

      //Sets this to the fullName from our database  calling from this in message in backend:  fullName: usersLoggedIn.fullName
      setUserFullName(response.data.fullName);

      // This gets the role from the message sent to check later on in functions like update
      setUsersRole(response.data.roles);

      navigateToAnotherPage("/");
    })
    // xxxx ERROR BAD LOGIN xxxx
    .catch(error => {
    //console.log(error.response.data);
     //console.log(responseError.Error.details[0].message);

      // if there is an error and a response get the data of the error
      const responseError = error?.response?.data;


      // If bad error set our self made error message to the data from axios
      if(responseError){
        // If the error is a string then we send back the stringed response from Axios
        if(typeof responseError === "string"){ // Bad Username or Password
          setError(error.response.data);
        }
        else if(responseError.error.details){  // Joi validation errors for Email
          setError(responseError.error.details[0].message);
        }
      }
    });
  } // end of onSubmitLogin function




  return(
    <>
      <div className="row">
        <div className="col-4"></div>

        <div className="col-4">
          <form>

            {/* eeee EMAIL eeee */}
            <div className="form-group  my-3">
              <label htmlFor="txtEmail">Email address</label>
              <input type="email" className="form-control" id="txtEmail"   onChange={(evt) => setEmail(evt.target.value)}    placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">Well never share your email with anyone else.</small>
            </div>
            {/* eeee EMAIL eeee */}


            {/* pppp PASSWORD pppp */}
            <div className="form-group mb-3">
              <label htmlFor="txtPassword">Password</label>
              <input type="password" className="form-control" id="txtPassword"   onChange={(evt) => setPassword(evt.target.value)}   placeholder="Password" />
            </div>
            {/* pppp PASSWORD pppp */}

            <button type="submit" className="btn btn-primary" onClick={(evt) => onSubmitLogin(evt)}>Submit</button>
          
          </form>
        </div>


      {/* xxxxxxxxxxxxx ERROR MESSAGE BOX xxxxxxxxxxxxx */}
        <div className="mt-3  col-12">

          {/* IF error is truthy show the error this if not it wont display */}
          {error && 
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          }
        </div>
      {/* xxxxxxxxxxxxx ERROR MESSAGE BOX xxxxxxxxxxxxx */}

      </div> {/* End of the className="row" div*/}
    </>
  )

}