import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {collection, getDocs } from 'firebase/firestore/lite';
import "../firebase/config";

export const getCategories = async (db, setCategories) => {
    const storage = getStorage();
    const categoriesCollection = collection(db, 'Categorias');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map(async (doc) => {
      const categories = doc.data();
      const imageURL = await getDownloadURL(ref(storage, 'bannersCategories/' + categories.imgBanner + '.jpg'));
      return { ...categories, imageURL  };
    });
    setCategories(await Promise.all(categoriesList));
  }