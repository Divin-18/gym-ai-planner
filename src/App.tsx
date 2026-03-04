import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Onboarding from "./pages/Onboarding"
import Profile from "./pages/Profile"
import Account from "./pages/Account"
import Navbar from "./components/layout/Navbar"
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from './lib/auth';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
   <NeonAuthUIProvider authClient={authClient} defaultTheme="dark">
    <AuthProvider>
    <BrowserRouter>
   <div className="min-h-screen flex flex-col"> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/account/:pathname" element={<Account />} />
      <Route path="/auth/:pathname" element={<Auth />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
   </div>
   </BrowserRouter>
   </AuthProvider>
   </NeonAuthUIProvider>
  )
}

export default App
