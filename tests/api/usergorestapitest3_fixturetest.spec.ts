


import {test,expect} from "../../src/fixture/apiFixture.js"

//let token=process.env.APITOKEN;
const token = process.env.APITOKEN;

console.log("API_TOKEN exists:", !!token);
console.log("API_TOKEN length:", token?.length);
let auth_header={Authorization:`Bearer ${token}`}

let userId:number;
/*hook: execute before every test case
test.beforeEach(async({apiHelper})=>{

    console.log("New User is creating...");
    
    //Request payload
    let userData={
    "name": "Priyanka",
    "email": emailId,
    "gender": "female",
    "status": "active"
}
    let response=await apiHelper.post(`/public/v2/users`,userData,auth_header);
    console.log(response.body);
    
    expect(response.status).toBe(201);
    console.log('Status code is: '+response.status);
    
     userId=response.body.id;
    console.log("User created with Id: "+userId);
    
})*/


async function createUser(apiHelper:any)
{
    //request payload
    let userData={
    name:"Priyanka",
    email:`priyanka_${Date.now()}@open.com`,// //email:"priyanka@open.com",
    gender:"female",
    status:'active'
}
    
    let response=await apiHelper.post("/public/v2/users",userData,auth_header);
    expect(response.status).toBe(201);
    return response.body;
   
}

test("Get- all users",async({apiHelper})=>{

    console.log("Get all usres api is running");
    
    let response=await apiHelper.get(`/public/v2/users`,auth_header);
    expect(response.status).toBe(200);
    console.log(response.status);
    console.log(response.body);
})

let emailId="priyanka"+new Date().getTime()+"@gmail.com";





test("Get-single user record",async({apiHelper})=>{

    console.log("Get single user api is running....");
    
    let userRes=await createUser(apiHelper);
    let response=await apiHelper.get(`/public/v2/users/${userRes.id}`,auth_header);
    //validation
    expect(response.status).toBe(200);
    console.log(response.body);
    
})

//post()==>id===>put()

//create user+get the id+use it in put and verify
test('PUT-update user',async({apiHelper})=>{
console.log("PUT update newly created user api is running....");


    //post
    let userRes=await createUser(apiHelper);


    let updateUser=
    {
        name:"PriyankaN"
        
    }

    //updateUser
    let response=await apiHelper.put(`/public/v2/users/${userRes.id}`,updateUser,auth_header);
    expect(response.status).toBe(200);

    //get the user
    let getRes=await apiHelper.get(`/public/v2/users/${userRes.id}`,auth_header);
    expect(getRes.status).toBe(200);
    console.log(getRes.body);
    


})

//post-->create user id-->delete user based id
test("DELETE- delete resource from server",async({apiHelper})=>{

    console.log("Delete api is running");
    
    //post
    let userResponse=await createUser(apiHelper);

    //delete
    let response=await apiHelper.delete(`/public/v2/users/${userResponse.id}`,auth_header);

    //status code:204
    expect(response.status).toBe(204);

    //confirm it from get call
    let getRes=await apiHelper.get(`/public/v2/users/${userResponse.id}`,auth_header);

    expect(getRes.status).toBe(404);
    console.log(getRes.body);
    

})
