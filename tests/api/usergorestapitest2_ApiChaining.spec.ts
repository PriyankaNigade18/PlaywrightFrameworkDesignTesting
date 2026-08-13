

import {test,expect,APIResponse} from "@playwright/test"


let token=process.env.APITOKEN!
let authToken={Authorization:`Bearer ${token}`}


//post()--->id---get()--->Put()--->delete()

let emailId:string="priyanka"+new Date().getTime()+"@gmail.com";
let userId:number;

//searial: to run all test in suite in sequence

test.describe.serial("This is API suite",()=>{
test("Post-Test for NewUser",async({request})=>{

    console.log("Creating new user........");
    
    //Rrequest payload
    let userData={
    "name": "Priyanka",
    "email": emailId,
    "gender": "female",
    "status": "active"
}
    
    let response:APIResponse=await request.post("https://gorest.co.in/public/v2/users",{
        headers:authToken,
        data:userData
    });

    //validation
    console.log(response.status());//201
    
        //to get the response in Json
        let jsonbody=await response.json();
        console.log(jsonbody);

        //to read id : jsonpath
         userId=jsonbody.id;
        console.log("User Id is: "+userId);
        
        
})


test("Get- the newely created user",async({request})=>{

    console.log("Get the new user data.....");
    
    let response:APIResponse=await request.get(`https://gorest.co.in/public/v2/users/${userId}`,{headers:authToken})

    console.log(response.status());

    //to get json response
    let jsonData=await response.json();
    console.log(jsonData);
    
    
    //to ger the text response
    let textData=await response.text();
    console.log(textData);
    

})

test("PUT- user user record",async({request})=>{

    console.log("Record updating.....");
    
 //Rrequest payload
    let userData={
    "name": "PriyankaN",
    "email":"priyankan@open.com",
    "gender": "female",
    "status": "active"
}
 
let response:APIResponse=await request.put(`https://gorest.co.in/public/v2/users/${userId}`,{
    headers:authToken,
    data:userData
})

let jsonData=await response.json();
console.log(jsonData);
console.log(`Record is updated for: ${userId} `);



})
})