import { md5 } from "js-md5";
import { PASSWORD, REQUEST_LIMIT, SAFE_URL, URL } from "../constants";

async function fetchValantisData(request) {
  const url = SAFE_URL || URL;
  const password = PASSWORD;

  const getTimestamp = () =>
    new Date().toISOString().slice(0, 10).replaceAll("-", "");

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": md5(password + "_" + getTimestamp()),
    },
    body: JSON.stringify(request),
  });
  if (await response.ok) {
    let data = await response.json();
    return data.result;
  } else {
    throw new Error(response.status);
  }
}

export async function getIds(pageNum) {
  const request = {
    action: "get_ids",
    params: { offset: (pageNum - 1) * REQUEST_LIMIT, limit: REQUEST_LIMIT },
  };
  const resp = await fetchValantisData(request);
  return resp;
}

export async function getFiltered(filter) {
  const request = {
    action: "filter",
    params: { ...filter },
  };
  return fetchValantisData(request);
}

export async function getItems(ids) {
  const request = {
    action: "get_items",
    params: { ids: ids },
  };
  return fetchValantisData(request);
}
