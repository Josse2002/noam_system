import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import fire from "../firebase/config";
import CheckUser from "../services/checkUser";
import { doc, updateDoc } from "firebase/firestore";
import departamentosData from '../data/departamentos.json'


function ProfileInfo() {
    const navigate = useNavigate();
    const [usuario, getUsuariosDB] = useState([]);
    const db = getFirestore(fire);
    const [departamentSelected, setDepartamentosSelected] = useState(usuario.departament);
    const [departamentos, setDepartamentos] = useState([]);
    const [activeTab, setActiveTab] = useState("basicInfo");
    const [errorPhone, setErrorPhone] = useState("");
    const [hasChanges, setHasChanges] = useState(false);
    const [valuesChanged, setValuesChanged] = useState({});
   

    useEffect(() => {
        async function fetchData() {
        const data = JSON.parse(JSON.stringify(departamentosData.departamentos));
          setDepartamentos(data);
          
        }
        fetchData();

      }, []);

    const handleUpdateDoc = (e) => {
        const { name, value } = e.target;
        if (name == "departament") {
            setDepartamentosSelected(value); 
        }
        setValuesChanged({ ...valuesChanged, [name]: value });
    };


    console.log(departamentos);
    const handleInputChange = (e) => {
        setHasChanges(true);
    };
    
    useEffect(() => {
        if (usuario.departament) {
            setDepartamentosSelected(usuario.departament);
        }
    }, [usuario]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (hasChanges) {
                event.preventDefault();
                event.returnValue = "";
                const message = "¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.";
                if (window.confirm(message)) {
                    window.removeEventListener("beforeunload", handleBeforeUnload);
                }
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [hasChanges]);

    useEffect(() => {
        CheckUser(db, getUsuariosDB);


    }, []);

    function handleLogOut() {
        signOut(auth).then(() => {
            navigate("/login");
        }).catch((error) => {
            console.log(error);
        });
    }
    function validatePhone(e) {
        const phone = e.target.value;
        const pattern = /^\d{8}$/;
        if (!pattern.test(phone)) {
            setErrorPhone("El número de teléfono debe tener 8 dígitos y solo contener números*");
        } else {
            setErrorPhone("");
        }
    }

    const updateDocument = async (e) => {
        e.preventDefault();
        const userRef = doc(db, "usuarios", usuario.uid);

        try {
            await updateDoc(userRef, {
                ...valuesChanged
            });
            setHasChanges(false);
            valuesChanged = {};
            console.log("valores actualizados");

            handleInputChange();
        } catch (error) {

        }
    };



    return (
        <div className="profile">
            <div className="miPerfil">
                <h2>Mi perfil</h2>
                <div className="infoBasic">
                    <img src={usuario.photo} alt="" />
                    <div className="info">
                        <h2>{usuario.name}</h2>
                        <h3>{usuario.email}</h3>
                        <button onClick={handleLogOut}>Cerrar sesión</button>
                    </div>

                </div>
            </div>
            <div className="editProfile">
                <h2>Mis datos</h2>
                <div className="buttonsOptions">
                    <button className={`${activeTab === "basicInfo" ? "activeButtonSe" : "noActiveButton"}`} onClick={() => setActiveTab("basicInfo")}>Información básica</button>
                    <button className={`${activeTab === "address" ? "activeButtonSe" : "noActiveButton"}`} onClick={() => setActiveTab("address")}>Dirección</button>
                </div>
                <form className="profileInfo" onChange={handleInputChange} >
                    <div className={`${activeTab === "address" ? "active" : "noShow"}`}>
                        <div className="profile-input">
                            <label for="addres">Direccion:</label>
                            <input defaultValue={usuario.address !== undefined || usuario.address !== "" ? usuario.address : ""} onChange={handleUpdateDoc} name="address" type="text" placeholder="Direccion (Calle y colonia)" />
                        </div>
                        <div className="profile-input">
                            <input defaultValue={usuario.secondAddress !== undefined || usuario.secondAddress !== "" ? usuario.secondAddress : ""} onChange={handleUpdateDoc} type="text" name="secondAddress" placeholder="Nº de casa, apto, oficina u otro" />
                        </div>
                        <div>
                            <div className="profile-input">
                                <select value={departamentSelected} name="departament" onChange={handleUpdateDoc}>
                                    {departamentos.map(departamento => (
                                        <option key={departamento.id} value={departamento.nombre}>
                                            {departamento.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`${activeTab === "basicInfo" ? "active" : "noShow"}`}>
                        <div className="profile-input">
                            <label for="phone">Nombre completo</label>
                            <input onChange={handleUpdateDoc} type="text" defaultValue={usuario.name !== undefined || "" ? usuario.name : ""} name="name" />
                        </div>

                        <div className="profile-input">
                            <label for="city">Fecha de nacimiento</label>
                            <input defaultValue={usuario.birthday !== undefined || usuario.birthday !== "" ? usuario.birthday : ""} onChange={handleUpdateDoc} type="date" name="birthday" />
                        </div>
                        <div className="profile-input">
                            <label for="phone">Numero de teléfono:</label>
                            <input defaultValue={usuario.phone !== undefined || usuario.phone !== "" ? usuario.phone : ""} onChange={handleUpdateDoc} className={`${errorPhone === "" ? "" : "errorInput"}`} type="tel" pattern="[0-9]*" name="phone" onInput={validatePhone} />
                            <p className="error">{errorPhone}</p>
                        </div>
                    </div>


                    <div className="sendInfo">
                        <button type="submit" onClick={updateDocument} disabled={!hasChanges}>Actualizar datos</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
export default ProfileInfo;