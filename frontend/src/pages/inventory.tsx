import { useState } from "react";
import Header from "../components/header";
import Logo from "../components/logo";
import FeedStockForm from "../components/inventoryForm";
import { dummyProducts } from "../assets/dummy";
import ProductCart from "../components/feedStockCard";

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="inventory">
      <aside>
        <Logo navigator={true} />
      </aside>
      <div className="head-content">
        <Header />
        <main>
          <div className="details">
            <article>
              <h1>Inventory</h1>
              <span>Your FeedStock</span>

              {dummyProducts.length < 1 && (
                <p>You currently have no Feedstock in your inventory</p>
              )}
              <br />
              <button onClick={toggleForm}>Add FeedStock</button>
            </article>
            {showForm && <FeedStockForm />}
          </div>
          <div className="Product">
            {dummyProducts.map((product, index) => (
              <ProductCart
                key={index}
                name={product.name}
                availability={product.availability}
                location={product.location}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
