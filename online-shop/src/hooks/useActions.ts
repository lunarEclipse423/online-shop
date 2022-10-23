import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActionCreators from "../store/actions/cart";
import * as EntryActionCreators from "../store/actions/entry";
import * as LoginActionCreators from "../store/actions/login";
import * as ModalActionCreators from "../store/actions/modal";
import * as ProductsActionCreators from "../store/actions/products";

export const useCartActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CartActionCreators, dispatch);
};

export const useProductsActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ProductsActionCreators, dispatch);
};

export const useEntryActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(EntryActionCreators, dispatch);
};

export const useLoginActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(LoginActionCreators, dispatch);
};

export const useModalActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ModalActionCreators, dispatch);
};
