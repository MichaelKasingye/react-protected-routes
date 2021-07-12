import React from 'react'
import "./Card.css"
function Card(props) {
    return (
        <div className="cards" key={props.id}>
            <p> <span className="card-title">Parcel Name: </span> <span>{props.parcelName}</span></p>
            <p>  <span className="card-title">Pick Up:</span> <span>{props.pickUp} </span></p>
            <p>  <span className="card-title">Destination:</span> <span>{props.destination}</span></p>
            <p> <span className="card-title">Status:</span> <span>{props.status}</span></p>
            <p> <span className="card-title">Order Cancelled:</span> <span>{props.isCancelled} </span></p>
          </div>
    )
}

export default Card
