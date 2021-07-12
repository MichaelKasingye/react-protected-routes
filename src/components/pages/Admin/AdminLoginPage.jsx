import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseUrl } from "../../../global/config";
import axios from "axios";

import "../loginPage.css";
function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorSignup, setErrorSignup] = useState("");

  const [name, setName] = useState("");
  const [press, setPress] = useState(false);

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
        history.push("/allorders");
        localStorage.setItem("token", response.data.acessToken);
        localStorage.setItem("name", name);
        localStorage.setItem("Admin", "Admin");

        window.location.reload();
      })
      .catch((error) => {
        setErrorLogin(error.response.data);
      });
    setPassword("");
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
        localStorage.setItem("Admin", "Admin");

        history.push("/allorders");
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
          {press ? <h1>Admin Login</h1> : <h1>Create Admin Account</h1>}

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
                  Admin Create your Account
                </button>
              )}
              {password && password.length < 6
                ? " Password must be more than six charaters "
                : " "}
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
                Admin Sign In from Here if you have an Account
              </p>
            )}
          </div>
          <p className="register_button" onClick={() => history.push("/")}>
            USER LOGIN
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
