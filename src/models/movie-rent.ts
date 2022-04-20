import { Customer } from "./customer";
import { Movie } from "./movie";

export class MovieRent {
  id: Number | undefined;
  rentDate: string | undefined;
  movie: Movie | undefined;
  customer: Customer | undefined;
}
