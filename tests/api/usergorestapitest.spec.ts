
/*
GET: Promise<APIResponse>Sends HTTP(S) GET request and returns its response.
*/

import {test,expect, APIResponse} from "@playwright/test";


let token=process.env.APITOKEN!
let AuthToken={Authorization:`Bearer ${token}`}
let emailId:string="priyanka"+new Date().getTime()+"@gmail.com";


test("GET:all user details",async({request})=>{

    let response:APIResponse=await request.get("https://gorest.co.in/public/v2/users");
    //print the response in console
    console.log(response);
    console.log("--------------");
    console.log("Status code: "+response.status());
    console.log("Status Message: "+response.statusText());
    //to get the body of response
    let jsonBody=await response.json();
    console.log(jsonBody);
            
})

test("POST: create new user ",async({request})=>{



    //request payload
    let userData={
    name: "Priyanka",
    email: emailId,
    gender: "female",
    status: "active"
    }

   let response:APIResponse=await request.post("https://gorest.co.in/public/v2/users",
                                                {
                                                        headers:AuthToken,
                                                        data:userData
                                                        
                                                        })

                    console.log("Status code: "+response.status());
                    console.log("Status message: "+response.statusText());

                    let jsonBody=await response.json();
                    console.log(jsonBody);
                              


})


test("PUT: Update user",async({request})=>{

 //request payload
    let userData={
    name: "PriyankaNigade",
    email: emailId,
    gender: "female",
    status: "active"
    }


let response:APIResponse=await request.put("https://gorest.co.in/public/v2/users/8564637",{
                                headers:AuthToken,
                                data:userData
                            })


                    console.log("Status code: "+response.status());
                    console.log("Status message: "+response.statusText());

                    let jsonBody=await response.json();
                    console.log(jsonBody);
                              

})


test("DELETE: delete exesting user",async({request})=>{


    let response:APIResponse=await request.delete("https://gorest.co.in/public/v2/users/8564637",{
                                                                        headers:AuthToken
                                                                    })

        console.log('Status code: '+response.status());
        console.log('Status Text: '+response.statusText());
        
})