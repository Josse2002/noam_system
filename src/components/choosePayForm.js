import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import departamentosData from '../data/departamentos.json'
import fire from "../firebase/config";
import CheckUser from "../services/checkUser";
import { getFirestore } from "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function ChoosePay() {
    const items = useSelector((state) => state.cart.items);
    const [usuario, getUsuariosDB] = useState([]);
    const db = getFirestore(fire);
    const priceShipping = 5;
    console.log(items)

    //Verificar numero


    //Estados de los deslizadores
    const [showAddress, setShowAddress] = useState(false);
    const [showShippingMethod, setShowShippingMethod] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(true);
    const [departamentSelected, setDepartamentosSelected] = useState(usuario.departament);
    const [departamentos, setDepartamentos] = useState([]);
    const [errorPhone, setErrorPhone] = useState("");

    //Funciones para cambiar estado
    const toggleAddress = () => setShowAddress(!showAddress);
    const toggleShipping = () => setShowShippingMethod(!showShippingMethod);
    const toggleUserInfo = () => setShowUserInfo(!showUserInfo);
    useEffect(() => {
        CheckUser(db, getUsuariosDB);


    }, []);
    // This function sets up the details of the transaction, including the amount and line item details.
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01", // $0.01
                    },
                },
            ],
        }).catch(err => {
            // Handle any errors from the createOrder call
            console.log(err);
        });
    };



    const onApprove = (data, actions) => {
        return actions.order.capture();
    };


    useEffect(() => {
        async function fetchData() {
            const data = JSON.parse(JSON.stringify(departamentosData.departamentos));
            setDepartamentos(data);

        }
        fetchData();

    }, []);
    useEffect(() => {
        if (usuario.departament) {
            setDepartamentosSelected(usuario.departament);
        }

    }, [usuario]);



    function validatePhone(e) {
        const phone = e.target.value;
        const pattern = /^\d{8}$/;
        if (!pattern.test(phone)) {
            setErrorPhone("El número de teléfono debe tener 8 dígitos y solo contener números*");
        } else {
            setErrorPhone("");
        }
    }
    return (
        <div className="wayPay">
            <div className="return-button">
                <Link to='/cartView'> <i class="fa-solid fa-chevron-left"></i> Regresar</Link>
            </div>

            <div className="pay-resume-form">
                <div className="information-pay">

                    <div className="informationCard">
                        <div className="card-info-pay" onClick={toggleUserInfo}>
                            <div className="brand-info">
                                <i class="fa-solid fa-user"></i>
                                <h4>Información de contacto</h4>
                            </div>
                            <i class={showUserInfo ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                        </div>
                        <div className={showUserInfo ? "informationShow" : "informationNotShow"}>
                            <div className="information-div">
                                <div className="profile-input">
                                    <label for="phone">Nombre completo</label>
                                    <input type="text" defaultValue={usuario.name !== undefined || "" ? usuario.name : ""} name="name" />
                                </div>

                                <div className="profile-input">
                                    <label for="phone">Numero de teléfono (sin guiones y sin codigo de país):</label>
                                    <div className="PhoneValidate">
                                        <input defaultValue={usuario.phone !== undefined || usuario.phone !== "" ? usuario.phone : ""} className={`${errorPhone === "" ? "" : "errorInput"}`} type="tel" pattern="[0-9]*" name="phone" onInput={validatePhone} />

                                    </div>

                                    <p className="error">{errorPhone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="informationCard">
                        <div className="card-info-pay" onClick={toggleAddress}>
                            <div className="brand-info">
                                <i class="fa-solid fa-location-dot"></i>
                                <h4>Direccion de envío</h4>
                            </div>
                            <i class={showAddress ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                        </div>
                        <div className={showAddress ? "informationShow" : "informationNotShow"}>

                            <div className="information-div">
                                <div className="profile-input">
                                    <label for="addres">Direccion (Calle y colonia):</label>
                                    <input defaultValue={usuario.address !== undefined || usuario.address !== "" ? usuario.address : ""} name="address" type="text" placeholder="Direccion (Calle y colonia)" />
                                </div>
                                <div className="profile-input">
                                    <label for="addres">Nº de casa, apto, oficina u otro</label>
                                    <input defaultValue={usuario.secondAddress !== undefined || usuario.secondAddress !== "" ? usuario.secondAddress : ""} type="text" name="secondAddress" placeholder="Nº de casa, apto, oficina u otro" />
                                </div>
                                <div>
                                    <div className="profile-input">
                                        <label for="addres">Departamento: </label>
                                        <select value={departamentSelected} name="departament">
                                            {departamentos.map(departamento => (
                                                <option key={departamento.id} value={departamento.nombre}>
                                                    {departamento.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="informationCard">
                        <div className="card-info-pay" onClick={toggleShipping}>
                            <div className="brand-info">
                                <i class="fa-solid fa-wallet"></i>
                                <h4>Metodo de pago</h4>
                            </div>
                            <i class={showShippingMethod ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                        </div>
                        <div className={showShippingMethod ? "informationShow" : "informationNotShow"}>
                            <div className="methods">

                                <div className="pay-m">
                                    <div className="pay-method">
                                        <i class="fa-brands fa-paypal"></i>
                                        <h4>Paypal o tarjeta de debito/credito</h4>
                                    </div>
                                    <p>Paga con tu tarjeta de credito o de debito con Paypal, posteriormente a la realizacion del pago, te enviaremos un correo con la fecha de entrega</p>
                                    <PayPalButton
                                        createOrder={(data, actions) => createOrder(data, actions)}
                                        onApprove={(data, actions) => onApprove(data, actions)}
                                        currency="USD"
                                    />
                                </div>

                                <div className="pay-m">
                                    <div className="pay-method">
                                        <i class="fa-solid fa-truck"></i>
                                        <h4>Contra-entrega</h4>
                                    </div>
                                    <p>Se te generará un recibo con los productos que deseas y tus datos personales, posteriormente se enviara a nuestro Whatsapp y nos contactaremos contigo para verificar tu identidad y coordinar la entrega</p>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <div className='cart-total'>
                    <h2>Resumen</h2>
                    <div className='infoSell'>
                        <p> <span> Subtotal: </span></p>
                        <p> ${items.reduce((a, c) => a + c.productData.Precio * c.quantity, 0).toFixed(2)}</p>
                    </div>
                    <div className='infoSell'>
                        <p> <span> Estimado de envío: </span></p>
                        <p> ${priceShipping.toFixed(2)}</p>
                    </div>
                    <div className='lineaSeparate'>

                    </div>
                    <div className='infoSell'>
                        <p> <span>Total:</span></p>
                        <p> ${parseFloat(items.reduce((a, c) => a + c.productData.Precio * c.quantity, 0).toFixed(2)) + parseFloat(priceShipping.toFixed(2))}</p>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ChoosePay;