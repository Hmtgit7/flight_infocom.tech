import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ListingPage from './Pages/ListingPage';
import ChatGpt from './Pages/ChatGpt';
import React from 'react';
import NavBar from './Pages/NavBar';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/lists' component={ListingPage} />
        <Route path='/chatgpt' component={ChatGpt} />
      </Switch>
    </BrowserRouter>
  );
}


export default App;