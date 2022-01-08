import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Routes } from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/shop" element={<Shop/>} />
      </Routes>
    </div>
  );
}

export default App;
