import { takeEvery, put } from "@redux-saga/core/effects";
import {
  GET_ORDER_BEGIN,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  PATCH_ORDER_BEGIN,
  PATCH_ORDER_SUCCESS,
  PATCH_ORDER_FAIL,
} from "../../constants/types";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

const baseUrl = "http://chefbox2021.herokuapp.com";
const currentToken = localStorage.getItem("token");
const config = {
  headers: { access_token: currentToken },
};

function* getOrderList() {
  try {
    const res = yield axios.get(`${BASE_URL}order`, config,
    );
    yield put({
      type: GET_ORDER_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (err) {
    console.log(err, "err");
    yield put({
      type: GET_ORDER_FAIL,
      error: err,
    });
  }
}
function* patchOrderList(action) {
  const { payload, id } = action;
  // const data = payload;
  try {
    const res = yield axios.patch(`${BASE_URL}order/${id}`);
    yield put({
      type: PATCH_ORDER_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    yield put({
      type: PATCH_ORDER_FAIL,
      error: err,
    });
  }
}

export function* watchGetOrderList() {
  yield takeEvery(GET_ORDER_BEGIN, getOrderList);
}
export function* watchUpdateAddress() {
  yield takeEvery(PATCH_ORDER_BEGIN, patchOrderList);
}
