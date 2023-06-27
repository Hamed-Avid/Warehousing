import http from "../httpService";

export function putProduct(id, { title, quantity, categoryId, createAt }) {
  return http.put(`/products/${id}`, { title, quantity, categoryId, createAt });
}
