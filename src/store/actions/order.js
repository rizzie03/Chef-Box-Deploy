import { GET_ORDER_BEGIN, PATCH_ORDER_BEGIN } from "../../constants/types";

export const getOrder = () => {
  return {
    type: GET_ORDER_BEGIN,
  };
};

export const patchOrder = (data) => {
  console.log("data patch", data)
  return {
    type: PATCH_ORDER_BEGIN,
    data,
  };
};
