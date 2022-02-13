import { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import BillingHistory from './components/BillingHistory/BillingHistory';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Packages from './components/Packages/Packages';
import PrivateRouteBalance from './components/PrivateRouteBalance/PrivateRouteBalance';
import PrivateRouteUser from './components/PrivateRouteUser/PrivateRouteUser';
import StripePayment from './components/Payment/StripeContainer/StripePayment';


export const UserContext = createContext();
export const StatusContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('email'));
  const [paymentStatus, setPaymentStatus] = useState(localStorage.getItem('paymentStatus'));


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <StatusContext.Provider value={[paymentStatus, setPaymentStatus]}>
    <div className="App">
        <Router>
        <Switch>
            <Route exact path='/'>
              <Login></Login>
            </Route>
            <Route exact path='/login'>
              <Login></Login>
            </Route>
            <Route path='/signup'>
              <SignUp></SignUp>
            </Route>
            <PrivateRouteUser path='/packages'>
                <Packages />
            </PrivateRouteUser>
            <PrivateRouteUser path='/payment/:packageId/:title/:amount/:validity'>
                <StripePayment />
            </PrivateRouteUser>
            <PrivateRouteBalance path='/dashboard'>
                <Dashboard />
            </PrivateRouteBalance>
            <PrivateRouteUser path='/billing'>
                <BillingHistory />
            </PrivateRouteUser>
           <Route path="*">
                  <NotFound></NotFound>
            </Route>

        </Switch>
      </Router>
    </div>
    </StatusContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
