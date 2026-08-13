
/*
In every test case you should call action methods and do assertion
testcase= test() + 1 hard assertion

hooks also can be part of test case

*/

import {test,expect} from "@playwright/test"


import {LoginPage} from "../src/pages/LoginPage.js"

let loginPage:LoginPage;

test.beforeEach(async({page})=>{
//create object of loginpage to call method
loginPage=new LoginPage(page);
//open login page
await loginPage.goToLoginPage();
})

test("Test for loginPageTitle",async({})=>{
//get thetitle
let appTitle=await loginPage.getLoginPageTitle();
console.log("Application title is: "+appTitle);

//assertion
expect(appTitle).toEqual("Swag Labs");

})

test("Test for APP URL",async({})=>{

    let appUrl=await loginPage.getLoginPageUrl();
    expect(appUrl).toContain("saucedemo");
    console.log("Application Url is: "+appUrl);
    
})


test("Tets for Login functionality with valid data",async({page})=>{

    await loginPage.doLogin("standard_user","secret_sauce");
    expect(page).toHaveURL(/inventory/);
    console.log("User navigated to Inventory page!");
    

})
