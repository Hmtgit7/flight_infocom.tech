import { Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ListingPage from './Pages/ListingPage';
import ChatGpt from './Pages/ChatGpt';



function App() {
  return (
    <div className="App">
      <Route path='/' component={HomePage} exact/>
      <Route path='/lists'component={ListingPage}/>
      <Route path='/chatgpt'component={ChatGpt}/>
      </div>
  );
}


export default App;