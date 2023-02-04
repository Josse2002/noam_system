
import './App.css';
import Header from './components/Header';
import FProducts from './components/FProducts';
import ServicesPage from './components/ServicesPage';
import ServicesSection from './components/ServicesSection';

function App() {
  return (
    <div className="App">
      <Header />
      <FProducts />
      <ServicesPage />
      <ServicesSection />
    </div>
  );
}

export default App;
