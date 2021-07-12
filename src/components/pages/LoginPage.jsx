import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../../global/config";
import { useStateValue } from "../ContextAPI/StateProvider";

import jwt_decode from "jwt-decode";

import axios from "axios";

import "./loginPage.css";
function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [press, setPress] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [errorSignup, setErrorSignup] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const signUpData = {
    name: name,
    email: email,
    password: password,
  };
  const loginData = {
    name: name,
    password: password,
  };

  function login(e) {
    e.preventDefault();

    axios
      .post(baseUrl + "/api/v1/auth/login", loginData)
      .then((response) => {
        const token =  response.data.acessToken;
        const user = jwt_decode(token);
        const userJSON = JSON.stringify(user)
        localStorage.setItem("token", token);
        localStorage.setItem("name", user.name);
        // window.location.reload();
        dispatch({
          type:'SET_USER',
          user:user.name
        })
        history.push("/");
        console.log(user.name);
      })
      .catch((error) => {
        setErrorLogin(error.response.data);
      });
    // setPassword("");
  }

  function register(e) {
    e.preventDefault();

    axios
      .post(baseUrl + "/api/v1/auth/signup", signUpData)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.setItem("token", response.data.acessToken);
        localStorage.setItem("name", name);

        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        setErrorSignup(error.response.data);
      });
    setPassword("");
  }

  return (
    <div className="Results">
      <div>.</div>

      <div className="login">
        <Link to="/"></Link>
        <div className="login_container">
          {press ? <h1>Sign in</h1> : <h1>Create Account</h1>}

          <form>
            <h5>Name</h5>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {press ? (
              " "
            ) : (
              <>
                <h5>E-mail</h5>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </>
            )}
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
          {press ? (
            <>
              {!name || !password ? (
                " "
              ) : (
                <button
                  type="submit"
                  onClick={login}
                  className="login_signButton"
                >
                  Sign In
                </button>
              )}
              {password && password.length < 6
                ? " Password must be more than six charaters "
                : " "}
            </>
          ) : (
            <>
              {!name || !password || !email ? (
                " "
              ) : (
                <button className="login_registerButton" onClick={register}>
                  Create your Account
                </button>
              )}
            </>
          )}
          <h4 className="error">{errorLogin}</h4>
          <h4 className="error">{errorSignup}</h4>

          <div className="register_buttons">
            {press ? (
              <p className="register_button" onClick={() => setPress(false)}>
                Create your new Account
              </p>
            ) : (
              <p
                className="register_button"
                type="submit"
                onClick={() => setPress(true)}
              >
                Sign In from Here if you have an Account
              </p>
            )}
          </div>
          <p
            className="register_button"
            onClick={() => history.push("/adminsignUp")}
          >
            ADMIN
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
