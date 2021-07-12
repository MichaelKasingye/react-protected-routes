import React, { useEffect, useState } from "react";
import { baseUrl, parcel,users } from "../../global/config";
import { useStateValue } from "../ContextAPI/StateProvider";
import { useHistory, Link } from "react-router-dom";
import Table from '../Table/UserTable';

import "./AllOrders.css";
import axios from "axios";

function SpecificOrder() {
  const [orders, setOrders] = useState("");
  const history = useHistory();
  const [{ user }] = useStateValue();

  const redirect = () => {
    if (!user) {
      history.push("/");
    }
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    redirect();
    const ac = new AbortController();

  //   axios
  //     .get(baseUrl + "/api/v1/parcel", config, {signal: ac.signal})
  //     .then((response) => {
  //       response.data
  //         .filter((filterData) => filterData.user.name === user)
  //         .filter((person) => {
  //           const theURL = person.user._id;

  //           axios
  //             .get(baseUrl + `/api/v1/users/${theURL}/parcels`, config)
  //             .then((response) => {
  //               setOrders(response.data);
  //             })
             
  //         });
  //     })
  //     return () => {
  //       ac.abort();
  //     };
  // }, []);
  axios
  .get(baseUrl + parcel, config, {signal: ac.signal})
  .then((response) => {
    response.data
      .filter((filterData) => filterData.user.name === user)
      .filter((person) => {
        const theURL = person.user._id;

        axios
          .get(baseUrl + `${users}${theURL}/parcels`, config)
          .then((response) => {
            setOrders(response.data);
          })
         
      });
  })
  return () => {
    ac.abort();
  };
}, []);

const info = orders;

const tableRow =  [...info].map((item) => (
  <Table
  key = {item._id}
  link = {item._id}
  parcelName = {item.parcelName}
  pickUp = {item.pickUp}
  destination = {item.destination}
  status = {item.status}
  isCancelled = {!item.isCancelled ? "No" : "Yes"}
  changes = "Edit"
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
        ):(
          <h3>Loading data..... Please wait</h3>
        )}
        
        


        <button>
            <Link style={{ color: "white" }} to="/postorder">
              Post an Order
            </Link>
          </button>
          </div>
      <div className="page-results"></div>
      
    </div>
  );
}

export default SpecificOrder;
