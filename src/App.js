import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation,Redirect  } from "react-router-dom";
import { useStateValue } from "./components/ContextAPI/StateProvider";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import AllOrders from "./components/pages/Admin/AllOrders";
import UserOrders from "./components/pages/SpecificUserOrder";
import ViewOrder from "./components/pages/ViewOrder";


import PostOrder from "./components/pages/PostOrder";
import Login from "./components/pages/LoginPage";
import AdminSignUp from "./components/pages/Admin/AdminLoginPage";
import AdminViewOrder from "./components/pages/Admin/AdminViewOrder";
// import ProtectedRoute from "./protectedroutes/ProtectedRoutes";

import "./App.css";

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  const [{ user }] = useStateValue();
  // const {location} = useLocation();

// useEffect(() => {

//   if (user) {
//     setIsAuth(true)
//   } else {
//     setIsAuth(false)
    
//   }
// }, [])
console.log(user);
function ProtectedRoute({children, ...rest}) {
  return(
    <Route {...rest} render={(props) => {
      return props.user === !null?
      children
      : <Redirect to={{
        pathname: '/',
        state: {from: props.location}
      }}/>
    }}/>
  )
}

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
            
        <Route path="/postorder" render={() => { return user != null? <PostOrder/> : <Redirect to={{pathname: '/' }}/>}}/>

        <Route path="/UserOrders" render={() => { return user != null? <UserOrders/> : <Redirect to={{pathname: '/' }}/>}}/>
        <Route path="/viewOrder/:Id" render={() => { return user != null? <ViewOrder/> : <Redirect to={{pathname: '/' }}/>}}/>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home}/>
         
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
