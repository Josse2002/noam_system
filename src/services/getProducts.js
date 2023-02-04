import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import "../firebase/config";

export const getProducts = async (db, setProducts) => {
    const storage = getStorage();
    const productCollection = collection(db, 'productos');
    const productSnapshot = await getDocs(productCollection);
    const productList = productSnapshot.docs.map(async (doc) => {
      const product = doc.data();
      const imageURL = await getDownloadURL(ref(storage, 'articulos/' + product.image + '.jpg'));
      return { ...product, imageURL  };
    });
    setProducts(await Promise.all(productList));
  }