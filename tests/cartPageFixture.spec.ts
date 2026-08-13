

import {test,expect} from "../src/fixture/pagefixtures.js";


test.beforeEach(async({loginPage,inventoryPage,cartPage})=>{

    await loginPage.goToLoginPage();
    //await loginPage.doLogin("standard_user","secret_sauce");
     await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    await inventoryPage.addProductInCart("Sauce Labs Bolt T-Shirt");
    //open cart page
    await cartPage.goToCartPage();

})

test("Test for Cart product details",async({cartPage})=>{

    let details=await cartPage.getProductDetailsFromCart();
    expect(details).toBe("Sauce Labs Bolt T-Shirt");
    console.log("Product from Cart:",details);

    
})

test("Test for product remove from cart",async({cartPage,inventoryPage})=>{
await cartPage.doRemoveProduct();
await inventoryPage.waitForPage();

})


test("Test for continueshopping option",async({cartPage,inventoryPage})=>{
//click on button
await cartPage.doContinueShopping();
//inventorypage
await inventoryPage.addProductInCart("Sauce Labs Backpack");
await cartPage.goToCartPage();
expect(await cartPage.getProductDetailsFromCart()).toBe("Sauce Labs Backpack");

})


test("Test for Checkout option",async({cartPage,inventoryPage})=>{
await cartPage.clickCheckoutButton();
await inventoryPage.waitForPage();
})