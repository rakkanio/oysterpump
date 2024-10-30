import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar/Navbar.Component";
import Footer from "./components/footer/Footer.Component";
import HomeComponent from "./components/home/Home.Component";
import PlayboardComponent from './components/playboard/Playboard.Component'
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/board" element={<PlayboardComponent />} />
         </Routes>
         <Footer/>
    </>
  );
}

export default App;
