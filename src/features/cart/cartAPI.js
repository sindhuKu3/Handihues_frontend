export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://handihues-backend.onrender.com/carts`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

//FETCH ITEMS INSERTED BY USER WITH PARTICULAR ID
export function fetchItemsByUserId(){
    return new Promise(async(resolve)=>{
 const response = await fetch(`https://handihues-backend.onrender.com/carts`, {
   credentials: "include",
 });
 const data = await response.json() ; 
 resolve({data})
    })
   
}

//UPDATE CART EX:CHANGING THE QUANTITY OF PARTICULAR PRODUCT FROM THE CART 
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://handihues-backend.onrender.com/carts/` + update.id,
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

//API CALL FOR DELETING AN ITEM FROM THE CART ITEM 
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://handihues-backend.onrender.com/carts/` + itemId,
      {
        method: "DELETE",
        credentials: "include",
        // body: JSON.stringify(itemId),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data: { id: itemId } });
     
  });
}



export async function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    //userId
    const items = response.data;
    // console.log(items);
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}