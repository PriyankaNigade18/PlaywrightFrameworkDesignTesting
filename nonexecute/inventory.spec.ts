


import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";
import {InventoryPage} from "../src/pages/InventoryPage.js"

let loginPage:LoginPage;
let inventoryPage:InventoryPage;

//precodition
test.beforeEach(async({page})=>{
loginPage=new LoginPage(page);
await loginPage.goToLoginPage();//open app
loginPage.doLogin("standard_user","secret_sauce");
inventoryPage=new InventoryPage(page);//inv page object
})

test("Test for InventoryPage Title",async({})=>{
let pageTitle=await inventoryPage.getInventoryPageTitle();
expect(pageTitle).toEqual("Swag Labs");
console.log("Page title is: "+pageTitle);

})

test("Test for Product count",async({})=>{

    await inventoryPage.waitForPage();
    let productCount=await inventoryPage.getProductCount();
    expect(productCount).toBe(6);
    console.log("Total Products on page: "+productCount);
    
})

test("Test for ProductName",async({})=>{

    await inventoryPage.waitForPage();
    await inventoryPage.getProductDetails();
})

test("Test for adding product to cart",async({})=>{
    await inventoryPage.waitForPage();
    await inventoryPage.addProductInCart("Sauce Labs Fleece Jacket");
    
})
