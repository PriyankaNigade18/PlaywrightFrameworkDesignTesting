/*
GET https://api.github.com/user/repos

1.Create Application in Git hub
2.Get Client_ID   &  Client_Secret 
3.Click on update application button
4.Set the id to url https://github.com/login/oauth/authorize?client_id=Ov23liaZlXBN8p8Q4PJA
5.Click on Authorize button. you will get auth code
6.In response , user redirected to redirects URL and get the code within URL
7.Get the access token https://github.com/login/oauth/access_token?client_id= &client_secret=&code=
8.Use API to get git hub access  GET https:// api.github.com/user/repos

*/


//open authorization 2.0
/*
import {test,expect} from "@playwright/test"
let accessToken:number;

test("Get-Generate token for accessign github repo",async({request})=>{

    let basUrl="https://github.com/login/oauth/access_token";
    let queryParam={
        client_id:"Ov23liaZlXBN8p8Q4PJA",
        client_secret:"99f115642905ba59afa7573eacdeaf575c217abb",
        code:"26d65e590c2d10b3a4a6"
    }

    //send the request to server
    let repsonse=await request.get(`${basUrl}`,{
                                            headers:
                                                {
                                            Accept:"application/json"
                                        },params:queryParam})
                //console.log(repsonse);
                
                console.log(await repsonse.json());


                let apiRes=await repsonse.json();
                accessToken=apiRes.access_token;

                //get request for all guthub repo

                let authToken={Authorization:`Bearer ${accessToken}`}
                let res=await request.get(`https://api.github.com/user/repos`,{
                    headers:authToken
                })

                expect(res.status()).toBe(200);
                console.log(await res.json());
                


})
                */