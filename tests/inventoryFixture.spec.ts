

import {test,expect} from "../src/fixture/pagefixtures.js";

test.beforeEach(async({loginPage})=>{
//create object for login and inventory : take it from fixture
await loginPage.goToLoginPage();
//await loginPage.doLogin("standard_user","secret_sauce");
 await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
})

test("Test for InventoryPage title",async({inventoryPage})=>{

    let appTitle=await inventoryPage.getInventoryPageTitle();
    expect(appTitle).toBe("Swag Labs");
    console.log("Title is: "+appTitle);
    
})


test("Test for Total Product count from InventoryPage",async({inventoryPage})=>{
const count=await inventoryPage.getProductCount();
expect(count).toBe(6);
console.log("Total Products on the Inventory page: "+count);

})


test("Test for getting product details",async({inventoryPage})=>{

    await inventoryPage.getProductDetails();
})

test("Test for Selecting product",async({inventoryPage})=>{
await inventoryPage.addProductInCart("Sauce Labs Bolt T-Shirt");

})