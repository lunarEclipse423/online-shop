import { EditProductType, ErrorsProductType } from "../types/products";

const EMPTY_FIELD_ERROR = "Field is empty. Please, fill in";
const NEGATIVE_QUANTITY_ERROR = "Product quantity cannot be negative";

export const validateProductInfo = (values: EditProductType) => {
  const errors: ErrorsProductType = {
    title: "",
    description: "",
    weight: "",
    composition: "",
    quantity: "",
  };

  for (let key in values) {
    if (!values[key]) {
      errors[key] = EMPTY_FIELD_ERROR;
    }
  }

  errors.title = validateFieldLength(values.title, 30);
  errors.weight = validateFieldLength(values.weight, 30);
  errors.quantity = validateFieldLength(values.quantity.toString(), 30);
  errors.composition = validateFieldLength(values.composition, 100);
  errors.description = validateFieldLength(values.description, 600);

  if (values.quantity && values.quantity < 0) {
    errors.quantity = NEGATIVE_QUANTITY_ERROR;
  }

  return errors;
};

const validateFieldLength = (field: string, requiredLength: number) => {
  return field && field.length > requiredLength
    ? `Entry must be no longer than ${requiredLength} characters`
    : field.length === 0
    ? EMPTY_FIELD_ERROR
    : "";
};
