import http from "./http-common";

const getAll = () => {
  return http.get("/assets");
};

const get = id => {
  return http.get(`/assets/${id}`);
};

const create = data => {
  return http.post("/assets", data);
};

const update = (id, data) => {
  return http.put(`/assets/${id}`, data);
};

const remove = id => {
  return http.delete(`/assets/${id}`);
};

const removeAll = () => {
  return http.delete(`/assets`);
};

const findByTitle = title => {
  return http.get(`/assets?title=${title}`);
};

const AssetService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default AssetService;