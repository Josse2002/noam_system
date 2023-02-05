function servicesSection(){

    return(
        <div className="services-section" >
           <div className="text-center">
                <h2 className="title">Servicios</h2>
                <div className="line"></div>
                <div class="subtitle-text">
                            <h3 class="caption gray">Ofrecemos una variedad de servicios convenientes en línea, incluyendo pagos seguros, entregas a domicilio y mucho más para hacer de su experiencia con nosotros lo más fácil y satisfactoria posible</h3>
                        </div>
            </div>
           
           
            <section id="services" class="services content-section" >
                <div class="container">
                    <div class="row text-center">
                       


                        {/*Servicio pago en linea*/}
                        <div class="container">
                            <div class="row text-center">
                                <div class="col-md-3">
                                    <div class="row services-item text-center" data-wow-offset="10">
                                        <i class="fa-sharp fa-solid fa-credit-card fa-3x"></i>
                                        <h4>Pago en linea</h4>
                                        <p>El pago en línea en nuestra tienda es fácil, rápido y seguro.</p>
                                    </div>
                                </div>


                                 {/*Servicio a domicilio*/}
                                <div class="col-md-3">
                                    <div class="row services-item text-center" data-wow-offset="10">
                                    <i class="fa-sharp fa-solid fa-truck fa-3x"></i>
                                        <h4>Servicio a domicilio</h4>
                                        <p>envíos confiables para que recibas tus compras en tu hogar</p>
                                    </div>
                                </div>


                                 {/*Servicio de reservacion*/}
                                <div class="col-md-3">
                                    <div class="row services-item text-center" data-wow-offset="10">
                                    <i class="fa-sharp fa-solid fa-calendar-days fa-3x"></i>
                                        <h4>Reservación</h4>
                                        <p>puedes reservar tus productos con anticipación</p>
                                    </div>
                                </div>


                                {/*Servicio de calidad internacional*/}
                                <div class="col-md-3">
                                    <div class="row services-item text-center" data-wow-offset="10">
                                    <i class="fa-sharp fa-solid fa-earth-americas fa-3x"></i>
                                        <h4>Calidad internacional</h4>
                                        <p>productos de alta calidad con estándares internacionales </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );

};

export default servicesSection;