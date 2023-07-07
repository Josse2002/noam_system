import React, { useState, useRef, useEffect} from "react";
import ButtonsBuy from "./buttons-buy";

// A function that returns the product's name, price, and description.
// The product parameter is an object with the following properties:
// name, price, description, and image.

function ProductInfo({ product }) {
  const descriptionRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    setBigImage(product.imageURL);
  }, [product.imageURL]);


  const renderSecondaryImages = (images) => {
    return images.map((image, index) => (
      <img 
      key={index} 
      src={image} 
      alt={product.Nombre} 
      onClick={() => setBigImage(image)} 
      className={image === imageBig ? "selected" : ""}
    />
    ));
  };

  const [imageBig, setImageBig] = useState(product.imageURL);

  function setBigImage(image) {
    setImageBig(image);
  }
  useEffect(() => {
    setImageBig(product.imageURL);
  }, [product]);

  const renderValue = (value, title) => {
    if (value === "" || value === "No") {
      return null;
    }

    return (
      <p>
        <span>{title}: </span>
        {value}
      </p>
    );
  };

  return (
    <div>
      <div className="productDetail">
        <div className="imageProduct">
          <img src={imageBig} alt={product.Nombre} />
          <div className="imagenesSecundarias">
          <img src={product.imageURL} alt={product.Nombre} onClick={() => setImageBig(product.imageURL)} className={imageBig === product.imageURL ? 'selected-image' : ''} />
            {renderSecondaryImages(product.secondaryImageURLs)}
          </div>
        </div>
        <div className="infoProduct">
          <h2>{product.Nombre}</h2>
          <div className="moreInformation">
            {renderValue(product.Material, "Material")}
            {renderValue(`$${product.Precio}`, "Precio")}
            {renderValue(product.Categoria, "Categoria")}
            {renderValue(product.Piedra, "Piedra")}
            {renderValue(product.color, "Color")}
            {renderValue(product.Customizable, "Customizable")}
            <p
              className="descripcion-info"
              ref={descriptionRef}
              style={{
                height: showFullDescription ? "100%" : "93px",
                overflow: "hidden",
              }}
            >
              <span> Sobre este producto:</span>
              <br />
              {product.Descripcion}
            </p>
            {
              product.Descripcion.length > 100 && (
                <button className="infoMore" href="#" onClick={handleClick}>
                  {showFullDescription ? "Ver menos" : "Ver más"}
                </button>
              )
            }
          
            <ButtonsBuy product={product}/>
  

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
