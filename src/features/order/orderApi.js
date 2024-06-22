export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders", {
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
    const response = await fetch("http://localhost:8000/orders/own/", {
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
      `/orders?` + queryString,
      { credentials: "include" }
    );
    const data = await response.json();
    //PAGINATION PAR ABHI KAAM KRNA HAI Q KI SERVER SE Access-Control-Expose-Headers ISKE THROUGH TOTAL DOC ACCESS KR SKTE HAI X-TOTAL-COUNT HAR JAGAH KAAM NAHI KRTA HAI ABHI KE LIYE MANUALLY 37 ELEMENT HMNE MAAN LIYE HAI
    const totalOrders = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders} });
  });
}

//UPDATE ORDER API
export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/` + order.id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
