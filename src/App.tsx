import { BrowserRouter, Route, Routes } from 'react-router'
import './styles/main.scss'
import { MainPage } from './pages/MainPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { Footer } from './components/Footer/Footer'
import { Navbar } from './components/Navbar/Navbar'
import { SearchContext } from './contexts/SearchContext'
import { useState } from 'react'
import { Hero } from './components/Hero/Hero'

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/:search" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App
