import "./App.css";
import React, { useState } from "react";
import Products from "./products.json";
import { Link } from "react-router-dom"; 

const Shop = () => {

    return (
        <div>
            <h1>This is the shopping cart view</h1>
            <Link to="/"><button
                className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg p-1"
                style={{ marginLeft: "50px" }}
            >
                Return
            </button>
            </Link>
            <p>Quantity: {Products.phones[0].quantity}</p>
        </div>
    );
};

export default Shop;