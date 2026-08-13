
/*
Interception
==================
It means stopping request or response in between and take a full control of process

Watch the request
mock the request/response
block the request
send the fake data/generate fake 

*/


//wildcard operator: **/* : match evey url or request
//It will intercept all network request by the browser and print it method type and url

import {test,expect} from "@playwright/test"
import { log } from "console";

test("API Iterception: observe the api request",async({page})=>{

    //control: route():Routing provides the capability to modify network requests that are made by a page.
    await page.route("**/*",async(route)=>{

        console.log("Http Method:"+route.request().method());
        console.log("URL: "+route.request().url());
        
        //send the request to server
        await route.continue();
    })
    await page.goto("https://tutorialsninja.com/demo/index.php?");

    await page.waitForTimeout(2000);

})

test("API Interception-Block the current request",async({page})=>{


    await page.route("https://tutorialsninja.com/demo/index.php?",async(route)=>{

        console.log("Request Intercepted...");
        
        await route.abort();
    })

    await page.goto("https://tutorialsninja.com/demo/index.php?");


await page.waitForTimeout(2000);

})


test("Mocking the APi Response",async({page})=>{

    let fakeResponse={
        id:101,
        name:"Kiran",
        username:"kiran123"
    }

    await page.route("https://jsonplaceholder.typicode.com/users/1",async(route)=>{

        //Fulfills route's request with given response.
        await route.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify(fakeResponse)
        })
    })

    //to observe the same responsesend request
    await page.goto("https://jsonplaceholder.typicode.com/users/1");

await page.waitForTimeout(2000);


})


