import "./App.css";
import React, { useState } from "react";
import Products from "./products.json";

const render_products = (ProductsCategory, cart, { setCartQuantity }) => {
  return (
    <div className="category-section fixed">
      <div
        className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
        style={{ maxHeight: "700px", overflowY: "scroll" }}
      >
        {ProductsCategory.map((product, index) => (
          <div key={index} className="group relative shadow-lg">
            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
              <img
                alt="Product Image"
                src={product.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      <b>
                        <center>{product.title}</center>
                      </b>
                    </span>
                  </a>
                </h3>
                <br></br>
                <p className="mt-1 text-sm text-gray-500">
                  <b>Description:</b> {product.description}
                </p>
                <br></br>
                <p
                  className="mt-1 text-sm text-gray-500"
                  style={{ paddingBottom: "1rem" }}
                >
                  <b>Rating:</b> {product.rating.rate} out of 5
                </p>
                <hr
                  style={{
                    paddingBottom: "1rem",
                    borderTop: "1px solid black",
                  }}
                ></hr>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p> Quantity: {product.quantity} </p>

                  <button
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
                    id="button"
                    type="button"
                    style={{ width: "40px", marginLeft: "50px"}}
                    onClick={() => {
                      setCartQuantity(cart + 1);
                      product.quantity += 1;
                      console.log("+ button is clicked");
                    }}
                  >
                    <b>+</b>
                  </button>
                  <button
                    className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
                    id="button"
                    type="button"
                    style={{ width: "40px" }}
                    onClick={() => {
                      if (cart > 0) setCartQuantity(cart - 1);
                      if (product.quantity > 0) product.quantity -= 1;
                      console.log("- button is clicked");
                    }}
                  >
                    <b>-</b>
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium text-green-600">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [ProductsCategory, setProductsCategory] = useState(Products.phones); // ProductsCategory is used to display the products onto the webpage
  const [query, setQuery] = useState("Search for a product"); // query is used to collect the input from the user when they use the search feature
  const [cart, setCartQuantity] = useState(0); //c art is used to keep track of total number of items in the cart

  // when input is typed into the search bar, handleChange() updates ProductsCategory with the correct products to show based on the user's input
  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.phones.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  return (
    <div>
      <div
        className="py-10"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <input
          className="border border-gray-30 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-1/12 p-1 dark:bg-white-700
dark:border-gray-300 dark:placeholder-gray-400 dark:text-black
dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="search"
          value={query}
          onChange={handleChange}
        />
        <button
          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
          onClick={() => {
            setQuery("");
            setProductsCategory(Products.phones);
          }}
        >
          Clear Search
        </button>
        <button
          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
          style={{ marginLeft: "50px" }}
          onClick={() => {
            // is supposed to perform a div swap that transports the user to the cart view
          }}
        >
          Checkout
        </button>
      </div>
      <div className="ml-5 p-1 xl:basis-4/5">
        {render_products(ProductsCategory, cart, { setCartQuantity })}
      </div>
    </div>
  );
};

export default App;
