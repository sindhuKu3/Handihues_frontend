
//FECTH PRODUCT BY ID 
export function fetchProductById(id){
  return new Promise(async(resolve)=>{
    const response = await fetch(
      `https://handihues-backend.onrender.com/products/` + id,
      {
        credentials: "include",
      }
    );
    const data = await response.json() ; 
    resolve({data});
  })
}

//ACTION PERFORMED TO FILTER A SECTION OF PRODUCT 
export function fetchProductsByFilter(filter,pagination,admin){
  // sort
  const queryParams = new URLSearchParams();

  // Add filter parameters
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryParams.append(key, categoryValues);
    }
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
      const response = await fetch(
        `https://handihues-backend.onrender.com/products?${queryParams.toString()}`,
        {
          credentials: "include",
        }
      );
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

export function createProduct(productFormData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://handihues-backend.onrender.com/products`,
      {
        method: "POST",
        credentials: "include",
        body: productFormData, // Send FormData directly
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

//UPDATING USER OBJECT IN CASE WE HAVE TO ADD ADDRESS DURING THE CHECKOUT TIME 
export function updateProduct(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://handihues-backend.onrender.com/products/${formData.get("id")}`, // Get ID from FormData
        {
          method: "PATCH",
          credentials: "include",
          body: formData, // Send FormData directly
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error); // Reject the promise on error
    }
  });
}



