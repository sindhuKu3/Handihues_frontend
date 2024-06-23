//FETCH LOGGED IN USER COMPLETE INFO INCLUDING IT ADDRESS AND ORDER STATUS
export function fetchLoggedInUserInfo() {

  return new Promise(async (resolve) => {
    const response = await fetch(
      `/users/own`,
      {
        credentials: "include",
      }
    );
  
    const data = await response.json();
    resolve({ data });
  });
}


//FETCH LOGGED IN USER ORDER DETAILS
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/orders/own`,
      {
        credentials: "include",
      }
    );
      //?user=" + userId
    const data = await response.json();
    resolve({ data });
  });
}
//update user
export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/users/` + update.id,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

