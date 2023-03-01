import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import ProfileInfo from "../components/profile-info";
import Header from "../components/Header";
import '../App.css'
import Footer from "../components/footer";

function ProfileView() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  
  return (
    <div>
        <Header />
        <ProfileInfo />
        <Footer />
    </div>
  );
}

export default ProfileView;
