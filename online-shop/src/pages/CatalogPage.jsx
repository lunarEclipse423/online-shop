import React from "react";
import CatalogItem from "../components/CatalogItem";
import "./CatalogPage.css";

const CatalogPage = () => {
  const data = [
    {
      id: 1,
      image: require("../img/item_1.jpg"),
      title: "Large cork-lid scented candle",
      price: 12.99,
      largeImage: require("../img/item_1_large.jpg"),
    },
    {
      id: 2,
      image: require("../img/item_2.jpg"),
      title: "Large cork-lid scented candle",
      price: 12.99,
      largeImage: require("../img/item_2_large.jpg"),
    },
    {
      id: 3,
      image: require("../img/item_3.jpg"),
      title: "Large cork-lid scented candle",
      price: 12.99,
      largeImage: require("../img/item_3_large.jpg"),
    },
    {
      id: 4,
      image: require("../img/item_4.jpg"),
      title: "Scented candle in a glass jar",
      price: 12.99,
      largeImage: require("../img/item_4_large.jpg"),
    },
    {
      id: 5,
      image: require("../img/item_5.jpg"),
      title: "Cork-lid scented candle",
      price: 3.99,
      largeImage: require("../img/item_5_large.jpg"),
    },
    {
      id: 6,
      image: require("../img/item_6.jpg"),
      title: "Cork-lid scented candle",
      price: 3.99,
      largeImage: require("../img/item_6_large.jpg"),
    },
    {
      id: 7,
      image: require("../img/item_7.jpg"),
      title: "Scented candle in glass holder",
      price: 9.99,
      largeImage: require("../img/item_7_large.jpg"),
    },
    {
      id: 8,
      image: require("../img/item_8.jpg"),
      title: "Scented candle in glass holder",
      price: 8.99,
      largeImage: require("../img/item_8_large.jpg"),
    },
    {
      id: 9,
      image: require("../img/item_9.jpg"),
      title: "Scented candle in glass holder",
      price: 12.99,
      largeImage: require("../img/item_9_large.jpg"),
    },
  ];
  return (
    <div className="catalog">
      <h2 className="catalog__title">Products</h2>
      <p className="catalog__text">Order it for you or for your beloved ones </p>
      <div className="catalog-items">
        {data.map((item) => (
          <CatalogItem
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            largeImage={item.largeImage}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
