import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ChatInterface from './components/ChatInterface';
import Team from './components/Team';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-furia-black text-furia-white font-barlow">
      <Header />
      <main>
        <Hero />
        <About />
        <ChatInterface />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;