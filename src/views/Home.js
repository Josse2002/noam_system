
import '../App.css';
import Header from '../components/Header';
import FProducts from '../components/FProducts';
import ServicesPage from '../components/ServicesPage';
import ServicesSection from '../components/ServicesSection';
import BannerHeader from '../components/Banner_header';
import Footer from '../components/footer';
function Home() {
  return (
    <div className="App">
      <Header />
      <BannerHeader />
      <FProducts tipo="Nuevos productos"/>
      <ServicesPage />
      <ServicesSection />
      <FProducts tipo="Productos populares"/>
      <Footer/>
    </div>
  );
}

export default Home;
