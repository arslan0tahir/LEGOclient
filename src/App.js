import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar'
import LoginPage from './pages/LoginPage'

let Home=(<div>
  <h1>Home Page</h1>
</div>);



function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
                <Route path="/" element={Home} exact />
                <Route path="/login" element={<LoginPage/>} />
                {/* <Route path="/shop" component={Shop} /> */}
      </Routes>
    </div>
  );
}

export default App;
