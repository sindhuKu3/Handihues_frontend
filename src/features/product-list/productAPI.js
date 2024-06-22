

//ACTION PERFORMED TO FETCH ALL PRODUCTS
export function fetchAllProducts(){
    return new Promise(async(resolve)=>{
        const response = await fetch(`${window.location.origin}/products`, {
          credentials: "include",
        });
        const data = await response.json() ; 
        resolve({data}) ; 
    })
}
//FECTH PRODUCT BY ID 
export function fetchProductById(id){
  return new Promise(async(resolve)=>{
    const response = await fetch(`${window.location.origin}/products/` + id, {
      credentials: "include",
    });
    const data = await response.json() ; 
    resolve({data});
  })
}

//ACTION PERFORMED TO FILTER A SECTION OF PRODUCT 
export function fetchProductsByFilter(filter,sort,pagination,admin){
    //filter - {"category":smartPhone}
    let queryString ='';
    for(let key in filter){
           queryString += `${key}=${filter[key]}&`
      }
  

    for(let key in sort){
      queryString += `${key}=${sort[key]}&`;
    }
console.log(pagination)
    for(let key in pagination){
      queryString += `${key}=${pagination[key]}&`
    }

    if(admin){
      queryString +=`admin=true`
    }
      return new Promise(async (resolve) => {
        //TODO: we will not hard-code server URL here
        const response = await fetch(
          `${window.location.origin}/products?` + queryString,
          { credentials: "include" }
        );
        const data = await response.json();
        //PAGINATION PAR ABHI KAAM KRNA HAI Q KI SERVER SE Access-Control-Expose-Headers ISKE THROUGH TOTAL DOC ACCESS KR SKTE HAI X-TOTAL-COUNT HAR JAGAH KAAM NAHI KRTA HAI ABHI KE LIYE MANUALLY 37 ELEMENT HMNE MAAN LIYE HAI
        const totalItems = response.headers.get("X-Total-Count") || 37;
        console.log({ totalItems });
        resolve({ data: { products: data, totalItems: +totalItems } });
      });
}


//CREATE PRODUCT API BY ADMIN
export function createProduct(product){
  return new Promise(async (resolve) => {
    const response = await fetch(`${window.location.origin}/products`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  
  });
}


//UPDATING USER OBJECT IN CASE WE HAVE TO ADD ADDRESS DURING THE CHECKOUT TIME 
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${window.location.origin}/products/` + update.id,
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

