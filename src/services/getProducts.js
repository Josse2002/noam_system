import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from 'firebase/firestore/lite';
import { onAuthStateChanged } from "firebase/auth";
import "../firebase/config";

export const getProducts = async (db, setProducts) => {

  try {
    // Get the storage object
    const storage = getStorage();

    // Get the collection of products
    const productCollection = collection(db, 'productos');

    // Get the products from the collection
    const productSnapshot = await getDocs(productCollection);

    // Get the list of products
    const productList = productSnapshot.docs.map(async (doc) => {
      // Get the product data
      const product = doc.data();
      // Get the product ID
      const productId = doc.id;

      try {
        // Get the image URL
        const imageURL = await getDownloadURL(ref(storage, 'articulos/' + product.image + '.jpg'));
        // Get the list of secondary image URLs
        const secondaryImageURLs = [];
        for (let i = 0; i < product.imagenesSecundarias.length; i++) {
          // Get the secondary image URL
          const secondaryImageURL = await getDownloadURL(ref(storage, 'imagenesSecundarias/' + product.imagenesSecundarias[i] + '.jpg'));
          secondaryImageURLs.push(secondaryImageURL);
        }

        // Return the product with the image and secondary image URLs
        return { ...product, productId, imageURL, secondaryImageURLs };
      } catch (error) {
        // Return null if there is an error
        return null;
      }
    });



    // Set the list of products
    setProducts((await Promise.all(productList)).filter((product) => product !== null));
  } catch (error) {
    // Set an empty list of products if there is an error
    setProducts([]);
  }
}
