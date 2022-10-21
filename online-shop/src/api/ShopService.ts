export const getAllProducts = async () => {
  try {
    const response = await fetch(
      "https://online-shop-api-project.herokuapp.com/products"
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await fetch(
      "https://online-shop-api-project.herokuapp.com/products/" + id
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async <T>(): Promise<T | undefined> => {
  try {
    const response = await fetch("https://online-shop-api-project.herokuapp.com/users");
    return response.json() as Promise<T>;
  } catch (e) {
    console.log(e);
  }
};
