import { Movie } from "@/models/movie";
import { request } from "umi";
import getHostByEnviroment from "@/helpers/utils"

const baseUrl = getHostByEnviroment();

export async function queryMovieList() {
  // TODO: remove domain and use a proxy
  return await request<{data: Movie[]}>(`${baseUrl}/api/movies`);
}

export async function removeMovie(id: number) {
  return await request(`${baseUrl}/api/movies/${id}`, { method: 'DELETE' });
}


export async function uploadCsv(formData: FormData) {
  return await request(`${getHostByEnviroment()}/api/movies/import`, {
    method: 'POST',
    body: formData,
  })
}
