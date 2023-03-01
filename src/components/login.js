import googleLogo from '../images/googleLogo.png';
import { useDispatch} from 'react-redux';
import { setUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import fire from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
   


function Login(){
    const db = getFirestore(fire);  
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    function HandleLogin() {
        signInWithPopup(auth, provider)
        
            .then((result) => {
                const user = result.user;    

                let userObj = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }

                const fetchData = async () => {
                    
                    const docRef = doc(db, "usuarios", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (!(docSnap.exists())) {
                        await setDoc(doc(db, "usuarios", user.uid), userObj);
                        navigate('/');

                    } else{
                        console.log(docSnap.data());
                        navigate('/');
                    }
                  };
              
                  fetchData();

                
                

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    return(
        <div className="login-box">
        <div className="login-content">
            <h2>Iniciar Sesion</h2>
            <div className="login-ways">
                <button onClick={HandleLogin}> <img src={googleLogo}/> Iniciar con Google</button>
            </div>
        </div>

    </div>
    );
}
export default Login;