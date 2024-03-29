import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './SignUp.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [signUpText, setSignupText] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };

  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleSignUp = async () => {
    console.log('register in with:', { username, email, password, conPassword});
    try {
          const response = await axios.post('https://backend-server-hswc.onrender.com/register', {username, email, password});
          if (response.status === 201) {
              setSignupText("Sign up Successful")
              setIsPopupOpen(true)
              await sleep(3000)
              setIsPopupOpen(false)

              console.log('Product added successfully');
          } else {
              console.error('Failed to add product');
          }
      } 
    catch (error) {
        console.error('Error adding product:', error);
        setSignupText("Username or Email is alreay Exists")
        setIsPopupOpen(true)
        await sleep(3000)
        setIsPopupOpen(false)
    }
  };

  return (
    <div className="container">
      <div className="head">
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field input-field-with-padding"
        />
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field input-field-with-padding"
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field input-field-with-padding"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="password-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="password-input">
          <input
            type={showConPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={conPassword}
            onChange={(e) => setConPassword(e.target.value)}
            className="input-field input-field-with-padding"

          />
          <FontAwesomeIcon
            icon={showConPassword ? faEye : faEyeSlash}
            className="password-icon"
            onClick={toggleConPasswordVisibility}
          />
        </div>
        <button type="button" onClick={handleSignUp}>Sign Up</button>
        <div className="form-row">
          <label className="have-acc">Already have an account ?</label>
          {/* <a href="#" className="login-page">Login</a> */}
          <Link to = {'/signin'} className="login-page">Login</Link>
        </div>
      </form>
      <div className="line">
        <hr className="divider" />
        <span className="or-text">OR</span>
        <hr className="divider" />
      </div>
      <div className="social-icons">
        <a href="#">
          <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faGoogle} className="google-icon" />
        </a>
      </div>
        {/* Pop-up for successful login */}
        <Popup open={isPopupOpen} closeOnDocumentClick >
            <div className="popup-content">
                <p>{signUpText}</p>
            </div>
        </Popup>
    </div>
  );
}

export default LoginPage;
