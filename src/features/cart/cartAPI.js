export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://handi-hues-backend.vercel.app/carts`,
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
 const response = await fetch(`https://handi-hues-backend.vercel.app/carts`, {
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
      `https://handi-hues-backend.vercel.app/carts/` + update.id,
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
      `https://handi-hues-backend.vercel.app/carts/` + itemId,
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

//RESET CART OF PARTICULAR USER 

// export async function resetCart(){
//   //GET ALL THE ITEM OF USER CAR DELETE THEM ONE BY ONE 
//   return new Promise (async(resolve)=>{
//     const response = await fetchItemsByUserId() ; 
//     const items = response.data ; 
//     for(let item of items){
//       await deleteItemFromCart(item.id) ; 
//     }
//     resolve({status:'success'})
//   })

// }

// export async function resetCart() {
//   //GET ALL THE ITEM OF USER CAR DELETE THEM ONE BY ONE
//   return new Promise(async (resolve) => {
//     const response = await fetchItemsByUserId();
//     const items = response.data;
//       console.log(items);
//     for (let item of items) {
//       await deleteItemFromCart(item.id);
//     }
//     resolve({ status: "success" });
//   });
// }

export async function resetCart() {
  return new Promise(async (resolve) => {
    // if (!userId) {
    //   resolve({ status: "error", message: "userId is undefined" });
    //   return;
    // }
    const response = await fetchItemsByUserId();
    //userId
    const items = response.data;
    console.log(items);
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}