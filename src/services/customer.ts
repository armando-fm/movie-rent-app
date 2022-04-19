

export async function queryCustomerList() {
  // TODO: remove domain
  return fetch('http://localhost:5200/api/customers')
  .then(response => response.json())
  .then(response => response.customers);
}


export async function removeCustomer(id: string) {
  const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
  return await res.json();
}
