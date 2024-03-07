import React from 'react';

interface ProductCartProps {
  name: string;
  availability: string;
  location: string;
  imageUrl: string;
}

const ProductCart: React.FC<ProductCartProps> = ({ name, availability, location, imageUrl }) => {
  return (
    <div className="product-cart">
      <div className="product-image">
        <img src={imageUrl} alt="Product Image" />
      </div>
      <h2>{name}</h2>
      <p>Availability: {availability}</p>
      <p>Location: {location}</p>
    </div>
  );
}

export default ProductCart;
