import getHostByEnviroment from "@/helpers/utils";
import { Customer } from "@/models/customer";
import { request} from 'umi'

const baseUrl = getHostByEnviroment();

export async function queryCustomerList() {
  return await request<{data: Customer[]}>(`${baseUrl}/api/customers`);
}

export async function createCustomer(customer: Customer) {
  return await request<Customer>(`${baseUrl}/api/customers`, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers : {
      'Content-Type': 'application/json'
    }});
}

export async function removeCustomer(id: number) {
  return await request(`${baseUrl}/api/customers/${id}`, { method: 'DELETE' });
}
