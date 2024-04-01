import "./App.css";
import React, { useState, useEffect } from "react";
import Products from "./products.json";
import { Link } from "react-router-dom";

const render_products = (ProductsCategory, cart, cartTotal, { setCartQuantity, setCartTotal}) => {

  //adding products to the cart
  const addToCart = (el) => {
    setCartQuantity([...cart, el]); //uses the spread operator
  };

  //removing products from the cart
  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCartQuantity(updatedCart);
    }
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class=
        "img-fluid" src={el.image} width={150} /> <br />
      {el.title} <br />
      ${el.price} <br />
    </div>
  ));

  //calculating the quantity of each item in the cart
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
}

  return (
    <div className="category-section fixed">
      <div
        className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
        style={{ maxHeight: "700px", overflowY: "scroll" }}
      >
        {ProductsCategory.map((product, index) => (
          <div>
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
                </div>
                <p className="text-sm font-medium text-green-600">
                  ${product.price}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1" style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <p> Quantity: {product.quantity} </p>
              <button
                className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
                id="button"
                type="button"
                style={{ width: "40px", marginLeft: "100px" }}
                onClick={() => {
                  //setCartQuantity(cart + 1);
                  setCartTotal(cartTotal + 1);
                  product.quantity += 1;
                  console.log("+ button is clicked");
                }}
                //onClick={() => addToCart(product)}
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
                //onClick={() => removeFromCart(product)}
              >
                <b>-</b>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [ProductsCategory, setProductsCategory] = useState(Products.phones); // ProductsCategory is used to display the products onto the webpage
  const [query, setQuery] = useState(""); // query is used to collect the input from the user when they use the search feature

  const [cart, setCartQuantity] = useState([]); //cart is an array that'll store the products that we are interested in buying
  const [cartTotal, setCartTotal] = useState(0); //cartTotal holds the total amount of items in the cart

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

  //this is called every time you add or remove an item from the cart
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
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
        <Link to="/cartView"><button
          className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
          style={{ marginLeft: "50px" }}
        >
          Checkout
        </button>
        </Link>
      </div>
      <div className="ml-5 p-1 xl:basis-4/5">
        {render_products(ProductsCategory, cart, cartTotal, { setCartQuantity, setCartTotal})}
      </div>
    </div>
  );
};

export default App;
