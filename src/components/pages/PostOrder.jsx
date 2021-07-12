import React, { useEffect, useState } from "react";
import "./AllOrders.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
// import {AddPacel} from "../ContextAPI/Actions/parcelActions"
import { baseUrl, config, parcel  } from "../../global/config";
// import { addParcel  } from "../../global/endPoints";


import axios from "axios";

function PostOrders() {
  const [parcelName, setParcelName] = useState(" ");
  const [pickUp, setPickUp] = useState(" ");
  const [destination, setDestination] = useState(" ");
  const [feedback, setFeedback] = useState("");
  const [pressed, setPressed] = useState(false);

  const [{ user }] = useStateValue();
  const history = useHistory();

  const OrderDataSend = {
    parcelName: parcelName,
    pickUp: pickUp,
    destination: destination,
    status: "OnBoarded",
  };

  const redirect = () => {
    if (!user) {
      history.push("/");
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  // const config = {
  //   headers: {
  //     Authorization: localStorage.getItem("token"),
  //   },
  // };
  function submitHandlerSend(e) {
    e.preventDefault();
    setPressed(true);
    axios
      .post(baseUrl + parcel, OrderDataSend, config)

      .then((response) => {
        setFeedback(response.statusText);
      });
  }
  // function submitHandlerSend(e) {
  //   e.preventDefault();
  //   console.log(`send data`);
  //   addParcel(OrderDataSend)
  //   setPressed(true);
  // }

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Make An Order</h1>
      </div>

      <form>
        <label>Parcel Name</label>
        <input
          type="text"
          placeholder="eg.2kgs of rice"
          value={parcelName}
          onChange={(e) => setParcelName(e.target.value)}
        />
        <label>Pick up Locaton</label>
        <input
          type="text"
          placeholder="Enter Location"
          value={pickUp}
          onChange={(e) => setPickUp(e.target.value)}
        />
        <label>Parcel Destination</label>
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </form>
     
        <>
          <button type="submit" onClick={submitHandlerSend}>
            Send Order
          </button>
          <button type="submit" onClick={() => history.push("/UserOrders")}>
            Show Order
          </button>
        </>
      {feedback ? <h3>Order sent </h3> : <h3>Press send to make Order</h3>}
      {pressed && !feedback ? <h3> Sending Order</h3> : ""}
    </div>
  );
}

export default PostOrders;
