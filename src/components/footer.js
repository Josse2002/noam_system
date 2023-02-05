function Footer() {
    return (


        <footer class="flex-rw">

            <ul class="footer-list-top">
                <li>
                    <h4 class="footer-list-header">Categorias</h4></li>
                <li><a href='/shop/about-mission' class="generic-anchor footer-list-anchor" itemprop="significantLink">Bisuteria</a></li>
                <li><a href='/promos.html' class="generic-anchor footer-list-anchor" itemprop="significantLink">Collares</a></li>
                <li><a href='/retailers/new-retailers.html' class="generic-anchor footer-list-anchor" itemprop="significantLink">Aretes</a></li>

                <li><a href='/job-openings.html' itemprop="significantLink" class="generic-anchor footer-list-anchor">Carteras</a></li>

                <li><a href='/shop/about-show-schedule' class="generic-anchor footer-list-anchor" itemprop="significantLink">Pulseras</a></li>
            </ul>




            <ul class="footer-list-top">
                <li id='help'>
                    <h4 class="footer-list-header">Horario</h4></li>
                    <h5>Lunes a Viernes</h5>
                    <p>8:00 am - 10:00 pm</p>
                    <h5>Sabado a domingo</h5>
                    <p>8:00 am - 11:00 pm</p>
            </ul>



            <ul class="footer-list-top">
                <li>
                    <h4 class="footer-list-header">Contacto</h4></li>


                    <a href="https://api.whatsapp.com/send?phone=50377981569" target="_blank"><i className="fa-brands fa-whatsapp"></i> 7798 1569</a>
                <li><a href='mailto:noamgemstone.jewerly@gmail.com' target="_blank" className="generic-anchor footer-list-anchor">noamgemstone.jewerly@gmail.com</a></li>
               
            </ul>






            <section class="footer-social-section flex-rw">
                <span class="footer-social-overlap footer-social-connect">
                    Noam Gemstone<span class="footer-social-small"></span>
                </span>
                <span class="footer-social-overlap footer-social-icons-wrapper">
                    <a href="https://www.facebook.com/profile.php?id=100089339387749" class="generic-anchor" target="_blank" title="Facebook" itemprop="significantLink"><i class="fa fa-facebook"></i></a>
                    
                    <a href="https://www.instagram.com/noam_gemstone/" class="generic-anchor" target="_blank" title="Instagram" itemprop="significantLink"><i class="fa fa-instagram"></i></a>

                    <a href="https://api.whatsapp.com/send?phone=50377981569" class="generic-anchor" target="_blank" title="Google Plus" itemprop="significantLink"><i className="fa-brands fa-whatsapp"></i></a>
                </span>
            </section>
            <section class="footer-bottom-section flex-rw">
                <div class="footer-bottom-wrapper">
                    

                </div>
               
               
            </section>
        </footer>


    );
}

export default Footer;