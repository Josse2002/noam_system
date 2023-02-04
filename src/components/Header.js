import logo_noam from '../images/logo_noam.png';
import brand from '../images/brand.jpg'
import { Link,BrowserRouter} from "react-router-dom";

function Header(){
    return(
        <BrowserRouter>    
        
                <div>
                    <div className="headerL">
                        <div className="image">
                            <img src={logo_noam} alt="Noam Gemstone Logo" />
                        </div>
                        <div className="options">
                                <a href="#"><i class="fa-solid fa-bag-shopping"></i></a>
                        </div>
                    </div>
                    <div className="categories">
                        <div className='categories-options'>
                            <Link to="/collares">Collares</Link>
                        </div>
                    </div>

                    <div className='image-brand' style={{
                        backgroundImage: `url(${brand})`,
                    }}>
                        <div className='text-brand'>
                            <h2>Pulseras para chica</h2>
                            <p>Pulseras de moda para chica</p>
                            <div className='button-comprar'>
                                <a href='#'>Ver producto</a>
                            </div>
                        </div>
                    </div>

                </div>
        </BrowserRouter>
    
    )
}
export default Header;
