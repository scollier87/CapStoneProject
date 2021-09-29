import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import NewEventForm from './components/event_createForm/eventForm';
import GetAllEvents from './components/event_getForm/index'
import UpdateEventForm from './components/event_updateForm';
import GetAllBookings from './components/booking_getForm';
import NewBookingForm from './components/booking_createForm';
import SplashPage from './components/splashPage';
import Home from './components/home';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>

        <Route path='/login' exact={true}>
          <NavBar/>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>Splash</h1>
          <SplashPage/>
        </Route>
        <ProtectedRoute path='/events' exact={true}>
          <NewEventForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/eventsuser' exact={true}>
          <GetAllEvents/>
        </ProtectedRoute>
        <ProtectedRoute path='/events/:id' exact={true}>
          <UpdateEventForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/bookingsuser' exact={true}>
          <GetAllBookings/>
        </ProtectedRoute>
        <ProtectedRoute path='/bookings/:id' exact={true}>
          <NewBookingForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true}>
          <Home/>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
