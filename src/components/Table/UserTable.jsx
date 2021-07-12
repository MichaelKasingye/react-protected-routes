import React from 'react';
import {  Link } from "react-router-dom";

import './Table.css'

function UserTable(props) {
    return (
        <>
                <tr key={props.link}>
                  <td>{props.parcelName}</td>
                  <td>{props.pickUp}</td>
                  <td>{props.destination}</td>
                  <td>{props.status}</td>
                  <td>{props.isCancelled}</td>
                  <td className = "table-btn"><Link to={`/viewOrder/${props.link}`}>Edit</Link></td> 

                </tr>
      </>
    
    )
}

export default UserTable
