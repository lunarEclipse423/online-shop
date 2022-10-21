import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { loginAdmin, loginUser } from "../../store/actions/login";
import ProductPage from "./ProductPage";
import store from "../../store";

describe("Test Product Page component", () => {
  const setup = (testQuantity: number) => {
    const testProduct = {
      id: 987278001,
      image: "item_1.jpg",
      title: "Large cork-lid scented candle",
      description:
        "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
      weight: "1,4 kg",
      composition:
        "Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%",
      quantity: testQuantity,
      price: 12.99,
      largeImage: "item_1_large.jpg",
      cartImage: "item_1_cart.jpg",
    };
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: `/catalog/${testProduct.id}`, state: { product: testProduct } },
          ]}
        >
          <ProductPage />
        </MemoryRouter>
      </Provider>
    );
  };

  test("Renders specific product page", () => {
    setup(10);
    const allProductsText = screen.getByText(
      /All hand-made with natural soy wax, Candleaf is made for your pleasure moments./i
    );
    const shippingText = screen.getByText(/🚚 FREE SHIPPING/i);
    const toBuyText = screen.getByText(/Sign in to buy/i);

    expect(allProductsText).toBeInTheDocument();
    expect(shippingText).toBeInTheDocument();
    expect(toBuyText).toBeInTheDocument();
  });

  describe("Test quantity changes by click", () => {
    test("Decrement", () => {
      setup(10);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      const buttonPlus = screen.getByTestId("button-plus");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
      fireEvent.click(buttonMinus);
      expect(quantity.textContent).toEqual("1");
    });

    test("Decrement if current quantity equals to 1", () => {
      setup(10);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      expect(quantity.textContent).toEqual("1");
      fireEvent.click(buttonMinus);
      expect(quantity.textContent).toEqual("1");
    });

    test("Increment", () => {
      setup(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("1");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
    });

    test("Increment if current quantity equals to available in stock", () => {
      setup(2);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("1");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
    });
  });

  describe("Test user rights", () => {
    const userSetup = (testQuantity: number) => {
      const testProduct = {
        id: 987278001,
        image: "item_1.jpg",
        title: "Large cork-lid scented candle",
        description:
          "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
        weight: "1,4 kg",
        composition:
          "Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%",
        quantity: testQuantity,
        price: 12.99,
        largeImage: "item_1_large.jpg",
        cartImage: "item_1_cart.jpg",
      };
      store.dispatch(loginUser());
      render(
        <Provider store={store}>
          <MemoryRouter
            initialEntries={[
              { pathname: `/catalog/${testProduct.id}`, state: { product: testProduct } },
            ]}
          >
            <ProductPage />
          </MemoryRouter>
        </Provider>
      );
    };

    test("Add 2 pieces of item to cart", () => {
      userSetup(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      const buttonAddToCart = screen.getByRole("button", { name: /Add to cart/i });
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
      fireEvent.click(buttonAddToCart);
      expect(quantity.textContent).toEqual("1");
    });

    test("Add one specific item to cart twice", () => {
      userSetup(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      const buttonAddToCart = screen.getByRole("button", { name: /Add to cart/i });
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
      fireEvent.click(buttonAddToCart);
      expect(quantity.textContent).toEqual("1");
      fireEvent.click(buttonPlus);
      fireEvent.click(buttonPlus);
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("4");
      fireEvent.click(buttonAddToCart);
      expect(quantity.textContent).toEqual("1");
    });
  });

  describe("Test admin rights", () => {
    const adminSetup = (testQuantity: number) => {
      const testProduct = {
        id: 987278001,
        image: "item_1.jpg",
        title: "Large cork-lid scented candle",
        description:
          "Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house.",
        weight: "1,4 kg",
        composition:
          "Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%",
        quantity: testQuantity,
        price: 12.99,
        largeImage: "item_1_large.jpg",
        cartImage: "item_1_cart.jpg",
      };
      store.dispatch(loginAdmin());
      render(
        <Provider store={store}>
          <MemoryRouter
            initialEntries={[
              { pathname: `/catalog/${testProduct.id}`, state: { product: testProduct } },
            ]}
          >
            <ProductPage />
          </MemoryRouter>
        </Provider>
      );
    };

    test("Input handler handles admin typing", async () => {
      adminSetup(10);
      const editButton = screen.getByRole("button", { name: /Edit/i });
      fireEvent.click(editButton);
      await screen.findByRole("button", { name: /Cancel/i });
      const titleInput: HTMLInputElement = screen.getByPlaceholderText(
        "Enter new product name..."
      );
      fireEvent.change(titleInput, { target: { value: "Lamp" } });
      expect(titleInput.value).toBe("Lamp");
    });

    test("Cancel changes", async () => {
      adminSetup(10);
      expect(screen.getByText(/Large cork-lid scented candle/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/1,4 kg/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%/i
        )
      ).toBeInTheDocument();

      const editButton = screen.getByRole("button", { name: /Edit/i });
      fireEvent.click(editButton);
      const cancelButton = await screen.findByRole("button", { name: /Cancel/i });
      fireEvent.click(cancelButton);
      await screen.findByRole("button", { name: /Edit/i });

      expect(screen.getByText(/Large cork-lid scented candle/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/1,4 kg/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%/i
        )
      ).toBeInTheDocument();
    });

    test("Save changes with no error", async () => {
      adminSetup(10);
      const title = screen.getByText(/Large cork-lid scented candle/i);
      expect(title).toBeInTheDocument();
      expect(
        screen.getByText(
          /Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/1,4 kg/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%/i
        )
      ).toBeInTheDocument();

      const editButton = screen.getByRole("button", { name: /Edit/i });
      fireEvent.click(editButton);
      const saveButton = await screen.findByRole("button", { name: /Save/i });

      const titleInput: HTMLInputElement = screen.getByPlaceholderText(
        "Enter new product name..."
      );
      fireEvent.change(titleInput, { target: { value: "Lamp" } });
      expect(titleInput.value).toBe("Lamp");
      fireEvent.click(saveButton);
      await screen.findByRole("button", { name: /Edit/i });

      expect(title).not.toBeInTheDocument();
      expect(screen.getByText(/Lamp/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Large scented candle in a glass holder with a cork lid. Burn time 80 hours. Diameter 8.5 cm. Height 15 cm. The scent has been created in collaboration with perfumers from the renowned Robertet perfume house./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/1,4 kg/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Container: Glass 100%Lid: Cork 100%Other materials: Paraffin 80%, Plant wax 20%/i
        )
      ).toBeInTheDocument();
    });

    test("Save changes with error", async () => {
      adminSetup(10);

      const editButton = screen.getByRole("button", { name: /Edit/i });
      fireEvent.click(editButton);
      const saveButton = await screen.findByRole("button", { name: /Save/i });

      const titleInput: HTMLInputElement = screen.getByPlaceholderText(
        "Enter new product name..."
      );
      fireEvent.change(titleInput, { target: { value: "" } });
      expect(titleInput.value).toBe("");
      fireEvent.click(saveButton);
      await screen.findByText("Field is empty. Please, fill in");
    });
  });
});
