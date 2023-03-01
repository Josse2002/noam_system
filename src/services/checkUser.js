import { auth } from "../firebase/config";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CheckUser = async (db, setUser) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // Verificar si el uid del usuario autenticado es igual al id del documento
            if (docSnap.id === user.uid) {
                setUser({...docSnap.data(), uid: user.uid});
            } else {
              console.log("El uid del usuario no es igual al id del documento en Firestore");
            }
          } else {
            console.log("El documento no existe en Firestore");
          }
        } else {
          console.log("El usuario no está autenticado");
        }
      });
};

export default CheckUser;
