import React from 'react'
import { Route, Redirect  } from "react-router-dom";

// function ProtectedRoutes({isauth: isAuth, componet: Component, ...rest}) { //... rest - get any other prop out there
//     return <Route {...rest} render={(props)=>{
//         if(isAuth){
//             return <Component />;
//         } else {
//             return <Redirect to={{pathname: '/', state: {from: props.location}}}/>//state: {from: props.location}} - from where the route was called
//         }
//     }}/>;
// }

// function ProtectedRoutes({isauth: isAuth, comp: Component, ...rest}) { //... rest - get any other prop out there
//     return <Route {...rest} render={(props)=>{
//         if(isAuth){
//             return <Component />;
//         } 
//         else {
//             return <Redirect to={{pathname: '/', state: {from: props.location}}}/>//state: {from: props.location}} - from where the route was called
//         }
//     }}/>;
// }

// function ProtectedRoutes({children, ...rest}) {
//     return(
//       <Route {...rest} render={(props) => {
//         return props.user === !null?
//         children
//         : <Redirect to={{
//           pathname: '/',
//           state: {from: props.location}
//         }}/>
//       }}/>
//     )
//   }

// export default ProtectedRoutes
