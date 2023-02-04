import brand from '../images/brand.jpg'

function BannerHeader() {
    return(
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
    );
  
}

export default BannerHeader;