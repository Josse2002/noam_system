
import '../App.css';
import Header from '../components/Header';
import FProducts from '../components/FProducts';
import ServicesPage from '../components/ServicesPage';
import ServicesSection from '../components/ServicesSection';
import BannerHeader from '../components/Banner_header';
function Home() {
  return (
    <div className="App">
      <Header />
      <BannerHeader />
      <FProducts />
      <ServicesPage />
      <ServicesSection />
    </div>
  );
}

export default Home;
