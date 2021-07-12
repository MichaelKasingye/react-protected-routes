import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";


function Home() {
  const [{ user }, dispatch] = useStateValue();
  const [{ Admin }] = useStateValue();
  const history = useHistory();

const name = localStorage.getItem('name');


function logBack() {
  // return(
    // <Redirect to={{
    //   pathname: '/login',
    //   state: {from: history}
    // }}/>
  // )
  dispatch({
    type:'SET_USER',
    user:name
  })
  // history.goBack()
  // window.history.back()
}

  return (
    <div className="home">
      <h1>Safe Courier</h1>

      {!user ? (
        <div className="">
          <button>
            <Link style={{ color: "white" }} to="/login">
              SIGN UP
            </Link>
          </button>
          <button>
            <Link style={{ color: "white" }} to="/login">
              LOGIN
            </Link>
          </button>
        </div>
      ) : (
        <div>
          {Admin?
          <>
          <h4>Wellcome Admin {user}</h4>
          <p style={{ fontSize: "1.5rem" }}>
            Click the button below to view all users Orders
          </p>
          <button>
            <Link style={{ color: "white" }} to="/allorders">
              View all Orders
            </Link>
          </button>
          </>
          :
          <>
          <h4>Wellcome {user}</h4>
          <p style={{ fontSize: "1.5rem" }}>
            Click the button below to post an Order
          </p>
          <button>
            <Link style={{ color: "white" }} to="/postorder">
              Post an Order
            </Link>
          </button>
          </>
          }
          
        </div>
      )}
      {!user&& <p onClick={logBack}>Click here{name}</p>}
     
    </div>
  );
}

export default Home;
