import React, { useEffect, useState } from "react";
import { baseUrl, parcel } from "../../../global/config";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { useHistory, useParams } from "react-router-dom";
import Card from "../../Card/Card";

import "./../AllOrders.css";
import axios from "axios";

function AdminViewOrder() {
  const [orders, setOrders] = useState("");
  const [pickUp, setPickUp] = useState("");

  const history = useHistory();

  const [{ user }] = useStateValue();

  const { Id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [clickDestination, setClickedDestination] = useState(false);

  const redirect = () => {
    if (!user) {
      history.push("/adminsignUp");
    }
  };

  const OrderDataStatusOnroute = {
    status: "On Route",
  };
  const OrderDataStatusDelivered = {
    status: "Delivered",
  };
  const OrderDataPresentLocation = {
    pickUp: pickUp,
  };
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    redirect();

    axios.get(baseUrl + `${parcel}${Id}`, config).then((response) => {
      setOrders(response.data);
    });
    return () => {
      setClickedDestination(false);
    };
  }, [clickDestination]);

  function pickUPHandler(e) {
    e.preventDefault();
    setClickedDestination(true);

    axios.put(
      baseUrl + `${parcel}${Id}/presentLocation`,
      OrderDataPresentLocation,
      config
    );
  }

  function statusHandlerOnRoute(e) {
    e.preventDefault();
    setClickedDestination(true);
    axios.put(
      baseUrl + `${parcel}${Id}/status`,
      OrderDataStatusOnroute,
      config
    );
  }
  function statusHandlerDelivered(e) {
    e.preventDefault();
    setClickedDestination(true);
    axios.put(
      baseUrl + `${parcel}${Id}/status`,
      OrderDataStatusDelivered,
      config
    );
  }
  const info = orders;
  const tableRow = [...info].map((item) => (
    <Card
      key={item._id}
      id={item._id}
      userName={item.user.name}
      parcelName={item.parcelName}
      pickUp={item.pickUp}
      destination={item.destination}
      status={item.status}
      isCancelled={!item.isCancelled ? "No" : "Yes"}
    />
  )) 

  return (
    <div className="main-section">
      <div className="main">.</div>
      <div className="title">
        <h1>Users Order</h1>
      </div>

      {info ? (
        <>
          {tableRow}
        </>
      ) : (
        <h4>Loading Data.... Please wait.....</h4>
      )}

      <div className="">
        {!info ? (
          ""
        ) : (
          <button type="submit" onClick={() => setClicked(true)}>
            Make Adjustments
          </button>
        )}

        {clicked ? (
          <form className="adiust-form">
            <div className="adjust">
              <h4>Change status</h4>
              <button type="submit" onClick={statusHandlerOnRoute}>
                On Route
              </button>
              <button type="submit" onClick={statusHandlerDelivered}>
                Delivered
              </button>
            </div>
            <div className="adjust-location">
              <input
                type="text"
                placeholder="Change Present Location"
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
              />
              <button type="submit" onClick={pickUPHandler}>
                Change location
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>

      <div className="page-results"></div>
    </div>
  );
}

export default AdminViewOrder;
