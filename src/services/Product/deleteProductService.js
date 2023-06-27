import http from "../httpService";

export function deleteProduct(id) {
  return http.delete(`/products/${id}`);
}
