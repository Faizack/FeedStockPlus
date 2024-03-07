import { FaPlus } from "react-icons/fa6";
import ProductCart from "../components/feedStockCard";
import Header from "../components/header";
import Logo from "../components/logo";
import { dummyProducts } from "../assets/dummy";




const Dashboard = () => {
  return (
    <div className="dasboard">
      <aside>
        <Logo navigator={true} />
      </aside>
      <div className="head-content">
        <Header />

        <main>
          <div className="add-product" key="add-product">
            <div className="addIcon">
              <FaPlus size={50} color="white"/>
            </div>
            <button>Add Product</button>
          </div>
          {dummyProducts.map((product, index) => (
            <ProductCart
              key={index}
              name={product.name}
              availability={product.availability}
              location={product.location}
              imageUrl={product.imageUrl}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
