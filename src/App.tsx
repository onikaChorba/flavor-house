import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components';
import { Home, Menu, Promo, About, Contacts } from './pages';
import { CartProvider, AuthProvider } from './context';

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/promo' element={<Promo />} />
              <Route path='/about' element={<About />} />
              <Route path='/contacts' element={<Contacts />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
