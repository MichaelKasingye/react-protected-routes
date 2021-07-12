import React, { useEffect, useState } from "react";
import { baseUrl,parcel } from "../../../global/config";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import Table from "../../Table/AdminTable";

import "../AllOrders.css";
import axios from "axios";

function AllOrders() {
  const [orders, setOrders] = useState("");
  const [{ user }] = useStateValue();
  const [{ Admin }] = useStateValue();

  const history = useHistory();

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  const redirect = () => {
    if (!user || !Admin) {
      history.push("/");
    }
  };
  useEffect(() => {
    redirect();
    axios.get(baseUrl + parcel, config).then((response) => {
      setOrders(response.data);
    });
  }, []);

  const info = orders;
  const tableRow = [...info].map((item) => (
    <Table
      key={item._id}
      link={item._id}
      UserName={item.user.name}
      parcelName={item.parcelName}
      pickUp={item.pickUp}
      destination={item.destination}
      status={item.status}
      isCancelled={!item.isCancelled ? "No" : "Yes"}
      changes="Edit"
    />
  )) 

  return (
    <div className="main-section">
      <div className="title-table">
        <h1>Your Orders</h1>
      </div>
      <div className="table">
        {info ? (
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Parcel Name</th>

                <th>Pick Up</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Cancelled</th>
              </tr>
            </thead>
            <tbody>
              {tableRow}
            </tbody>
          </table>
        ) : (
          <h3>Loadinging data..... Please wait</h3>
        )}
        <div className="page-results"></div>
        SAFE COURIER
      </div>
    </div>
  );
}

export default AllOrders;
