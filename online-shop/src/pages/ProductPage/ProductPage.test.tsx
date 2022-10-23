import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { loginAdmin, loginUser } from "../../store/actions/login";
import ProductPage from "./ProductPage";
import store from "../../store";

describe("Product page", () => {
  const renderProductPage = (testQuantity: number) => {
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

  test("Should render specific product page", () => {
    // given
    renderProductPage(10);
    const allProductsText = screen.getByText(
      /All hand-made with natural soy wax, Candleaf is made for your pleasure moments./i
    );
    const shippingText = screen.getByText(/🚚 FREE SHIPPING/i);
    const toBuyText = screen.getByText(/Sign in to buy/i);

    // then
    expect(allProductsText).toBeInTheDocument();
    expect(shippingText).toBeInTheDocument();
    expect(toBuyText).toBeInTheDocument();
  });

  describe("Should change quantity on click", () => {
    test("Decrement", () => {
      // given
      renderProductPage(10);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      const buttonPlus = screen.getByTestId("button-plus");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");

      // when
      fireEvent.click(buttonMinus);

      // then
      expect(quantity.textContent).toEqual("1");
    });

    test("Dont decrement if current quantity equals to 1", () => {
      // given
      renderProductPage(10);
      const quantity = screen.getByTestId("quantity");
      const buttonMinus = screen.getByTestId("button-minus");
      expect(quantity.textContent).toEqual("1");

      // when
      fireEvent.click(buttonMinus);

      // then
      expect(quantity.textContent).toEqual("1");
    });

    test("Increment", () => {
      // given
      renderProductPage(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("1");

      // when
      fireEvent.click(buttonPlus);

      // then
      expect(quantity.textContent).toEqual("2");
    });

    test("Dont increment if current quantity equals to available in stock", () => {
      // given
      renderProductPage(2);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      expect(quantity.textContent).toEqual("1");
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");

      // when
      fireEvent.click(buttonPlus);

      // then
      expect(quantity.textContent).toEqual("2");
    });
  });

  describe("User rights", () => {
    const renderUserProductPage = (testQuantity: number) => {
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

    test("Should add 2 pieces of item to cart", () => {
      // given
      renderUserProductPage(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      const buttonAddToCart = screen.getByRole("button", { name: /Add to cart/i });
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");

      // when
      fireEvent.click(buttonAddToCart);

      // then
      expect(quantity.textContent).toEqual("1");
    });

    test("Should add one specific item to cart twice", () => {
      // given
      renderUserProductPage(10);
      const quantity = screen.getByTestId("quantity");
      const buttonPlus = screen.getByTestId("button-plus");
      const buttonAddToCart = screen.getByRole("button", { name: /Add to cart/i });

      // when
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("2");
      fireEvent.click(buttonAddToCart);

      // then
      expect(quantity.textContent).toEqual("1");

      // when
      fireEvent.click(buttonPlus);
      fireEvent.click(buttonPlus);
      fireEvent.click(buttonPlus);
      expect(quantity.textContent).toEqual("4");
      fireEvent.click(buttonAddToCart);

      // then
      expect(quantity.textContent).toEqual("1");
    });
  });

  describe("Admin rights", () => {
    const renderAdminProductPage = (testQuantity: number) => {
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

    test("Should handle admin typing", async () => {
      // given
      renderAdminProductPage(10);
      const editButton = screen.getByRole("button", { name: /Edit/i });

      // when
      fireEvent.click(editButton);
      await screen.findByRole("button", { name: /Cancel/i });
      const titleInput: HTMLInputElement = screen.getByPlaceholderText(
        "Enter new product name..."
      );
      fireEvent.change(titleInput, { target: { value: "Lamp" } });

      // then
      expect(titleInput.value).toBe("Lamp");
    });

    test("Should cancel changes by click", async () => {
      // given
      renderAdminProductPage(10);
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

      // when
      const editButton = screen.getByRole("button", { name: /Edit/i });
      fireEvent.click(editButton);
      const cancelButton = await screen.findByRole("button", { name: /Cancel/i });
      fireEvent.click(cancelButton);
      await screen.findByRole("button", { name: /Edit/i });

      // then
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

    test("Should save changes with no error", async () => {
      // given
      renderAdminProductPage(10);
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

      // when
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

      // then
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

    test("Should don't save changes and fail with error", async () => {
      // given
      renderAdminProductPage(10);

      // when
      const editButton = screen.getByRole("button", { name: /Edit/i });
      fireEvent.click(editButton);
      const saveButton = await screen.findByRole("button", { name: /Save/i });

      const titleInput: HTMLInputElement = screen.getByPlaceholderText(
        "Enter new product name..."
      );
      fireEvent.change(titleInput, { target: { value: "" } });
      expect(titleInput.value).toBe("");
      fireEvent.click(saveButton);

      // then
      await screen.findByText("Field is empty. Please, fill in");
    });
  });
});
