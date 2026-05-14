import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { Home, Menu, Promo, About } from './pages';

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/promo' element={<Promo />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
