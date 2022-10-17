export const getAllProducts = async () => {
  const response = await fetch("https://online-shop-api-project.herokuapp.com/products");
  return response.json();
};

export const getProductById = async (id: number) => {
  const response = await fetch(
    "https://online-shop-api-project.herokuapp.com/products/" + id
  );
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch("https://online-shop-api-project.herokuapp.com/users");
  return response.json();
};
