import getHostByEnviroment from "@/helpers/utils";
import { MovieRent } from "@/models/movie-rent";
import { request } from "umi";

const baseUrl = getHostByEnviroment();

export async function queryMovieRentList() {
  return await request<{data: MovieRent[]}>(`${baseUrl}/api/movieRents`);
}

export async function createMovieRent(movieRent: MovieRent) {
  return await request(`${baseUrl}/api/movieRents`, {
    method: 'POST',
    body: JSON.stringify(movieRent),
    headers : {
      'Content-Type': 'application/json'
    }});
}

export async function removeMovieRent(id: number) {
  return await request(`${baseUrl}/api/movieRents/${id}`, { method: 'DELETE' });
}
