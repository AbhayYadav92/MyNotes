import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Createnote from './pages/Createnote'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <Navbar />

      <main className='flex-1 container mx-auto p-4'>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected page */}
          <Route
            path="/create-note"
            element={
              <ProtectedRoute>
                <Createnote />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
