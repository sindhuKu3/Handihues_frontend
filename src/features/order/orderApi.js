export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/orders`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders() {
 
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/orders/own/`, {
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchAllOrders( pagination) {

  let queryString = "";
 
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      `${window.location.origin}/orders?` + queryString,
      { credentials: "include" }
    );
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders} });
  });
}

//UPDATE ORDER API
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/orders/` + order.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
