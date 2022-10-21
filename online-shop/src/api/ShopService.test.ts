import { getAllProducts, getAllUsers, getProductById } from "./ShopService";
import { UserType } from "../types/user";

describe("Test API functions", () => {
  test.only("my only true test", () => {
    expect(1 + 1).toEqual(2);
  });

  test("Get response for products", async () => {
    const products = await getAllProducts();
    expect(products!.length).toBe(9);
  });

  test("Get response for users", async () => {
    const users = await getAllUsers<UserType[]>();
    expect(users!.length).toBe(2);
  });

  test("Get response for specific product", async () => {
    const testProduct = {
      id: 987278001,
      image: "item_1.jpg",
      title: "Large cork-lid scented candle",
      description:
        "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
      weight: "1,4 kg",
      composition:
        "Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%",
      quantity: 10,
      price: 12.99,
      largeImage: "item_1_large.jpg",
      cartImage: "item_1_cart.jpg",
    };
    const product = await getProductById(testProduct.id);
    expect(product!).toEqual(testProduct);
  });
});
