import api from "./axios";

export const getTours = async (search = "") => {
  const response = await api.get("/tours", {
    params: search ? { search } : {}
  });
  return response.data;
};

export const getTourById = async (id) => {
  const response = await api.get(`/tours/${id}`);
  return response.data;
};
