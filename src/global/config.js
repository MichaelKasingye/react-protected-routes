export const config = {
    headers:{
      Authorization: localStorage.getItem('token')

    }
}


// export const baseUrl = "https://safecourier.herokuapp.com";
export const baseUrl = "http://localhost:4000";

export const parcel = "/api/v1/parcel/";
export const users = "/api/v1/users/";

