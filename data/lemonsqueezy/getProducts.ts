import { LSProductTypes } from "@/types/lsProduct.types";
import axios from "axios";

const lsqyConfig = {
  API_KEY: process.env.LEMONSQUEEZY_API_KEY,
  URL: "https://api.lemonsqueezy.com/v1",
};

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

const getProducts = async () => {
  try {
    const response = await axios.get(`${lsqyConfig.URL}/products`, {
      headers,
    });

    // Access the data array from the response
    const products = response.data.data;

    // Loop through the data array and log each product's attributes
    // products.forEach((product) => {
    //   console.log(product.attributes);
    // });

    return products;
  } catch (error) {
    console.error(error);
  }
};

const getLSSingleProduct = async (productId: number) => {
  try {
    const response = await axios.get(
      `${lsqyConfig.URL}/products/${productId}`,
      {
        headers,
      }
    );

    // Access the data array from the response
    const product = response.data.data;

    // Loop through the data array and log each product's attributes
    // products.forEach((product) => {
    //   console.log(product.attributes);
    // });
    // console.log(product);

    return product as LSProductTypes;
  } catch (error) {
    console.error(error);
  }
};

export { getProducts, getLSSingleProduct };
