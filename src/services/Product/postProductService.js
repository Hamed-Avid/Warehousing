import http from "../httpService";

export function postProduct(product) {
  return http.post("/products", product);
}
