import { getAllProducts, getAllUsers, getProductById } from "./ShopService";
import { UserType } from "../types/user";
import { ProductType } from "../types/products";

describe("API functions", () => {
  const mockFetch = (data: ProductType | ProductType[] | UserType[]) => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) })) as jest.Mock
      );
  };

  test("Should get response for products", async () => {
    // given
    mockFetch(PRODUCTS);

    // when
    const products = await getAllProducts<ProductType[]>();

    // then
    expect(global.fetch).toBeCalledTimes(1);
    expect(products!.length).toBe(3);
    expect(products).toEqual(PRODUCTS);
  });

  test("Should get response for users", async () => {
    // given
    mockFetch(USERS);

    // when
    const users = await getAllUsers<UserType[]>();

    // then
    expect(global.fetch).toBeCalledTimes(1);
    expect(users!.length).toBe(2);
    expect(users).toEqual(USERS);
  });

  test("Should get response for specific product", async () => {
    // given
    mockFetch(TEST_PRODUCT);

    // when
    const product = await getProductById<ProductType>(TEST_PRODUCT.id);

    // then
    expect(global.fetch).toBeCalledTimes(1);
    expect(product).toEqual(TEST_PRODUCT);
  });
});

const PRODUCTS = [
  {
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
  },
  {
    id: 987278003,
    image: "item_2.jpg",
    title: "Large cork-lid scented candle",
    description:
      "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
    weight: "1,2 kg",
    composition:
      "Other materials: Paraffin 80%, Plant wax 20%Lid: Cork 100%Container: Glass 100%",
    quantity: 12,
    price: 12.99,
    largeImage: "item_2_large.jpg",
    cartImage: "item_2_cart.jpg",
  },
  {
    id: 987278002,
    image: "item_3.jpg",
    title: "Large cork-lid scented candle",
    description:
      "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
    weight: "1,4 kg",
    composition:
      "Container: Glass 100%Other materials: Paraffin 80%, Plant wax 20%Lid: Cork 100%",
    quantity: 10,
    price: 12.99,
    largeImage: "item_3_large.jpg",
    cartImage: "item_3_cart.jpg",
  },
];

const USERS = [
  {
    userId: 123456,
    username: "arthur",
    password: "qwerty",
    role: "user",
  },
  {
    userId: 89101112,
    username: "martha",
    password: "nonqwerty",
    role: "admin",
  },
];

const TEST_PRODUCT = {
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
