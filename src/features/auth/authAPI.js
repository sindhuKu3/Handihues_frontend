export function createUser(userData){
    return new Promise (async(resolve)=>{
        const response = await fetch(
          `/auth/signup`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" },
          }
        );
        const data =await response.json() 
        resolve ({data})
        //TODO :ON SERVER IT WILL RETURN USEFUL INFORMATION {not password and any sensitive information}
    })
}


export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/auth/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(loginInfo),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/auth/check`,
        {
          method: "GET",
          credentials: "include", // Include credentials (cookies/tokens) with the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

//SIGNOUT 
export function signOut(userId){
  return new Promise(async(resolve)=>{
    resolve({data:'success'})
  })
}
