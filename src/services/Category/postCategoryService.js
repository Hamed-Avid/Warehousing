import http from "../httpService";

export function postCategory(category) {
  return http.post("/categories", category);
}
