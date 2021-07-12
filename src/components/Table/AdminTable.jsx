import React from 'react';
import {  Link } from "react-router-dom";

import './Table.css'

function AdminTable(props) {
    return (
        <>
        <tr key={props.link}>
          <td>{props.UserName}</td>
          <td>{props.parcelName}</td>
          <td>{props.pickUp}</td>
          <td>{props.destination}</td>
          <td>{props.status}</td>
          <td>{props.isCancelled}</td>
          <td className = "table-btn"><Link to={`/adminviewOrder/${props.link}`}>Edit</Link></td> 

        </tr>
</>
    )
}

export default AdminTable
