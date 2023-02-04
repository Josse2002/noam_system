import { initializeApp } from 'firebase/app';
const firebaseConfig = { 
  apiKey: "AIzaSyBFqTG_yHQTGLJoOpcM-t_i3usQZYPrSeE",
  authDomain: "noamgemstone.firebaseapp.com",
  databaseURL: "https://noamgemstone-default-rtdb.firebaseio.com",
  projectId: "noamgemstone",
  storageBucket: "noamgemstone.appspot.com",
  messagingSenderId: "77446741511",
  appId: "1:77446741511:web:c4dd43e1849d12766034a2",
  measurementId: "G-RESJWFC4DJ"
};

const fire = initializeApp(firebaseConfig);

export default fire;
