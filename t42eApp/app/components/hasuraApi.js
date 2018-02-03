const clusterName = "clarinetist87"

const dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
const loginUrl = "https://auth." + clusterName + ".hasura-app.io/v1/login";
const signupUrl = "https://auth." + clusterName + ".hasura-app.io/v1/signup";
const logoUrl= "https://filestore." + clusterName + ".hasura-app.io/v1/file/c7998c9e-e29e-40dd-9ccb-331fe7c9c2e1";

import { Alert } from 'react-native';



const networkErrorObj = {
  status: 503
}

export async function trySignup(username, password) {
  console.log('Making signup query');
  let requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type":"application/json"
    }
  };

  let body = {
    "provider":"username",
    "data": {
      "username": username,
      "password": password
    }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log("Auth Response ---------------------");
  
  try {
    let resp = await fetch(signupUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function tryLogin(username, password) {
  console.log('Making login query');
  let requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type":"application/json"
    }
  };

  let body = {
    "provider":"username",
    "data": {
      "username": username,
      "password": password
    }
  };

  requestOptions["body"] = JSON.stringify(body);

  console.log("Auth Response ---------------------");
  
  try {
    let resp = await fetch(loginUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function getArticleList() {
	console.log('Making data query (get article list)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "article",
          "columns": [
              "id",
              "title",
          ]
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try {
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp; 
  }
  catch(e) {
  	console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function getArticle(id) {
  console.log('Making data query (get article)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "article",
          "columns": [
              "content",
              "id",
              "title",
              {
                "name": "author",
                "columns":[
                  "name"
                ]
              }
          ],
          "where": {
              "id": {
                  "$eq": id
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};


export async function fetchfile() {
  console.log('Getting file');
  
  var fetchAction =  require('fetch');
  
  var url = "https://filestore.carton66.hasura-app.io/v1/file/53f95824-aa76-4b6b-8d3c-b4945207dcaa";
  
  var requestOptions = {
      "method": "GET",
      "headers": {}
  };
  
  fetchAction(url, requestOptions)
  .then(function(response) {
    return response.blob();
  })
  .then(function(blob) {
    console.log(result);
  })
  .catch(function(error) {
    console.log('Request Failed:' + error);
  });
}

export async function getSearchList(searchText) {
  console.log('Making data query (search article)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "article",
          "columns": [
              "content",
              "id",
              "title",
              {
                "name": "author",
                "columns":[
                  "name"
                ]
              }
          ],
          "where": {
              "title": {
                  "$like": '%'+searchText+'%'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};

export async function getFashionList(searchText) {
  console.log('Making data query (search article)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "article",
          "columns": [
              "content",
              "id",
              "title",
              {
                "name": "author",
                "columns":[
                  "name"
                ]
              }
          ],
          "where": {
              "title": {
                  "$like": '%'+searchText+'%'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};


export async function getApplianceList(searchText) {
  console.log('Making data query (fashion list)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "article",
          "columns": [
              "content",
              "id",
              "title",
              {
                "name": "author",
                "columns":[
                  "name"
                ]
              }
          ],
          "where": {
              "title": {
                  "$like": '%'+searchText+'%'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};

export async function getGroceryList(searchText) {
  console.log('Making data query (search article)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "article",
          "columns": [
              "content",
              "id",
              "title",
              {
                "name": "author",
                "columns":[
                  "name"
                ]
              }
          ],
          "where": {
              "title": {
                  "$like": '%'+searchText+'%'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};

// New APIs
// New APIs
// New APIs
// New APIs

export async function getProductList() {
	console.log('Making data query (get product list)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "product",
          "columns": [
              "prod_id",
              "prod_name",
          ]
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try {
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp; 
  }
  catch(e) {
  	console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function getProduct(id) {
  console.log('Making data query (get product)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "product",
          "columns": [
              "prod_id",
              "prod_name",
              "prod_desc",
              "prod_price"
          ],
          "where": {
              "prod_id": {
                  "$eq": id
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};


export async function getSearchProductList(searchText) {
  console.log('Making data query (search product)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "product",
          "columns": [
            "prod_id",
            "prod_name",
            "prod_desc",
			"prod_price"
          ],
          "where": {
              "prod_desc": {
                  "$like": '%'+searchText+'%'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};

export async function getFashionProductList() {
  console.log('Making data query ( FashionProductList)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "product",
          "columns": [
            "prod_id",
            "prod_name",
            "prod_category"
          ],
          "where": {
              "prod_category": {
                  "$eq": 'Fashion'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};


export async function getApplianceProductList() {
  console.log('Making data query (appliance list)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "product",
          "columns": [
            "prod_id",
            "prod_name",
            "prod_category"
          ],
          "where": {
              "prod_category": {
                  "$eq": 'Appliance'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};

export async function getGroceryProductList(searchText) {
  console.log('Making data query (grocery product list)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "product",
          "columns": [
            "prod_id",
            "prod_name",
            "prod_category"
          ],
          "where": {
              "prod_category": {
                  "$eq": 'Grocery'
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};

export async function AddtoCart(product) {
    console.log('Adding to cart');
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
  
    let body = {
        "type": "insert",
        "args": {
            "table": "cart",
            "objects": [
                {
                
                "cart_prodid":product.prod_id,
                "cart_prodname":product.prod_name,
                "cart_proddesc":product.prod_desc,
                "cart_prodprice":product.prod_price
            }                    
            ]
            
            }
        };
    
  
    requestOptions["body"] = JSON.stringify(body);
    console.log('Data Response ---------------------');
    
    try{
        let resp = await fetch(dataUrl, requestOptions);
      console.log(resp);
        return resp;
    }
    catch (e) {
        console.log("Request failed: " + e);
      return networkErrorObj;
    }
  };

export async function getCartList() {
	console.log('Making data query (get cart list)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };

  let body = {
      "type": "select",
      "args": {
          "table": "cart",
          "columns": [
              "cart_id",
              "cart_prodname",
          ]
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try {
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp; 
  }
  catch(e) {
  	console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}


export async function getCartProduct(id) {
    console.log('Making data query (get product)');
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
  
    let body = {
        "type": "select",
        "args": {
            "table": "cart",
            "columns": [
                "cart_id",
                "cart_prodname",
                "cart_proddesc",
                "cart_prodprice"
            ],
            "where": {
                "cart_id": {
                    "$eq": id
                }
            }
        }
    };
  
    requestOptions["body"] = JSON.stringify(body);
    console.log('Data Response ---------------------');
    try{
        let resp = await fetch(dataUrl, requestOptions);
      console.log(resp);
        return resp;
    }
    catch (e) {
        console.log("Request failed: " + e);
      return networkErrorObj;
    }
  };
  
  export async function PlaceOrder(cartproduct) {
    console.log('Placing order');
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
  
    let body = {
        "type": "insert",
        "args": {
            "table": "order",
            "objects": [
                {
                
                "order_cartid":cartproduct.cart_id,
                "order_prodname":cartproduct.cart_prodname,
                "order_proddesc":cartproduct.cart_proddesc,
                "order_prodprice":cartproduct.cart_prodprice
            }                    
            ]
            
            }
        };
    
  
    requestOptions["body"] = JSON.stringify(body);
    console.log('Data Response ---------------------');
    
    try{
        let resp = await fetch(dataUrl, requestOptions);
      console.log(resp);
        return resp;
    }
    catch (e) {
        console.log("Request failed: " + e);
      return networkErrorObj;
    }
  };
