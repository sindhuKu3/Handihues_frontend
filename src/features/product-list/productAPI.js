

//ACTION PERFORMED TO FETCH ALL PRODUCTS
// export function fetchAllProducts(){
//     return new Promise(async(resolve)=>{
//         const response = await fetch(
//           `/products`,
//           {
//             credentials: "include",
//           }
//         );
//         const data = await response.json() ; 
//         resolve({data}) ; 
//     })
// }
//FECTH PRODUCT BY ID 
export function fetchProductById(id){
  return new Promise(async(resolve)=>{
    const response = await fetch(
      `/products/` + id,
      {
        credentials: "include",
      }
    );
    const data = await response.json() ; 
    resolve({data});
  })
}

//ACTION PERFORMED TO FILTER A SECTION OF PRODUCT 
export function fetchProductsByFilter(filter,sort,pagination,admin){
//     //filter - {"category":smartPhone}
//     let queryString ='';
//     for(let key in filter){
//           //  queryString += `${key}=${filter[key]}&`
//            const categoryValues = filter[key];
//            if (categoryValues.length) {
//              queryString += `${key}=${categoryValues}&`;
//            }
//       }
  

//     for(let key in sort){
//       queryString += `${key}=${sort[key]}&`;
//     }
// // console.log(pagination)
//     for(let key in pagination){
//       queryString += `${key}=${pagination[key]}&`
//     }

//     if(admin){
//       queryString +=`admin=true`
//     }
//       return new Promise(async (resolve) => {
//         //TODO: we will not hard-code server URL here
//         const response = await fetch(
//           `/products?` + queryString,
//           { credentials: "include" }
//         );
//         const data = await response.json();
//         //PAGINATION PAR ABHI KAAM KRNA HAI Q KI SERVER SE Access-Control-Expose-Headers ISKE THROUGH TOTAL DOC ACCESS KR SKTE HAI X-TOTAL-COUNT HAR JAGAH KAAM NAHI KRTA HAI ABHI KE LIYE MANUALLY 37 ELEMENT HMNE MAAN LIYE HAI
//         const totalItems = response.headers.get("X-Total-Count") || 37;
//         // console.log({ totalItems });
//         resolve({ data: { products: data, totalItems: +totalItems } });
//       });

 const queryParams = new URLSearchParams();

 // Add filter parameters
 for (let key in filter) {
   const categoryValues = filter[key];
   if (categoryValues.length) {
     queryParams.append(key, categoryValues);
   }
 }

 // Add sorting parameters (price, rating, etc.)
 for (let key in sort) {
   queryParams.append(key, sort[key]);
 }

 // Add pagination parameters
 for (let key in pagination) {
   queryParams.append(key, pagination[key]);
 }

 // Add admin flag if needed
 if (admin) {
   queryParams.append("admin", "true");
 }

 return new Promise(async (resolve) => {
   try {
     const response = await fetch(`/products?${queryParams.toString()}`, {
       credentials: "include",
     });
     const data = await response.json();

     // Get total items from headers (default to 37 if missing)
     const totalItems = response.headers.get("X-Total-Count") || 37;
     resolve({ data: { products: data, totalItems: +totalItems } });
   } catch (error) {
     console.error("Error fetching products:", error);
     resolve({ data: { products: [], totalItems: 0 } });
   }
 });
}


//CREATE PRODUCT API BY ADMIN
export function createProduct(product){
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/products`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  
  });
}


//UPDATING USER OBJECT IN CASE WE HAVE TO ADD ADDRESS DURING THE CHECKOUT TIME 
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/products/` + update.id,
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

