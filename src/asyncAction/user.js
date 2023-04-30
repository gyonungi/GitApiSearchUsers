import { getUser } from "../store/reducers/user";
import { useEffect, useState } from "react";

export const getUsers = (value) => {
  return async (dispatch) => {
    const res = await fetch(`https://api.github.com/search/users?q=${value}`);
    const data = res.json();

    data
      .then((result) => {
        dispatch(getUser(result));
      })
      .catch((err) => {});
  };
};
/* export const getPopularUsers = () => {
  return async (dispatch) => {
    const res = await fetch(`https://api.github.com/search/users?q=gyonungi`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = res.json();
    data
      .then((result) => {
        dispatch(getUser(result));
      })
      .catch((err) => {});
  };
}; */
