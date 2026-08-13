
/*
https://transform.tools/json-to-json-schema

In Playwright for schema validation use Ajv library

Ajv takes a schema for your JSON data and converts it into a very efficient JavaScript code 
that validates your data according to the schema. 
install
---------------
npm install ajv

*/


import { get } from "node:http";
import {test,expect} from "../../src/fixture/apiFixture.js"

//import Ajv from "ajv"
import AjvModule from 'ajv'
import { getErrorPath } from "ajv/dist/compile/util.js";
const Ajv=AjvModule.default;
const ajv=new Ajv();

let token=process.env.APITOKEN!
let authToken={Authorization:`Bearer ${token}`}
let emailId:string="priyanka"+new Date().getTime()+"@gmail.com";


//schema
let userSchema={
    "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}

let arraySchema={
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "number"
      },
      "name": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "gender": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    },
    "required": [
      "id",
      "name",
      "email",
      "gender",
      "status"
    ]
  }
}




//create user--->get single user
test("Get- single user schema validation",async({apiHelper})=>{


    //payload
      //Rrequest payload
    let userData={
    "name": "Priyanka",
    "email": emailId,
    "gender": "female",
    "status": "active"
}
  
let response=await apiHelper.post(`/public/v2/users/`,userData,authToken);
let userId=response.body.id;
console.log("User created with iD: "+userId);

//get the single user 
let getRes=await apiHelper.get(`/public/v2/users/${userId}`,authToken);
expect(getRes.status).toBe(200);

console.log(getRes.body);

//schema validation
//"AJV, take this schema and prepare a function that can check whether data follows this schema."
let validateObj=ajv.compile(userSchema);

//Here we pass the actual API response to the validation function.
let isSchemaValid=validateObj(getRes.body);

//If schema validation is NOT successful.
if(!isSchemaValid)
{
  //AJV automatically stores validation errors in:
console.log("Schema Error!: ",validateObj.errors);

}
//I expect this value to be true/truthy.
expect(isSchemaValid).toBeTruthy();

console.log("Response matches with schema");


})


test("Schema validation for Array of Objects",async({apiHelper})=>{


 let response=await apiHelper.get(`/public/v2/users`,authToken);
  //console.log(response.body);
  expect(response.status).toBe(200);


  //schema validate


  //compile
  let validateFun=ajv.compile(arraySchema);

  //validate()
  let isSchemaValid=validateFun(response.body);

  //log the errors if schema is invalid
  if(!isSchemaValid)
  {
    console.log("Schema Errors",validateFun.errors);
    
  }

  //assertion: schema is valid
  expect(isSchemaValid).toBeTruthy();
  console.log("Array schema validated");
  
  

})



