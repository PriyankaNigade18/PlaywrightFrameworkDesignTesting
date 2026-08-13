

import {test,expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";
import { InventoryPage } from "../src/pages/InventoryPage.js";
import { CartPage } from "../src/pages/CartPage.js";

let loginPage:LoginPage;
let inventoryPage:InventoryPage;
let cartPage:CartPage;

test.beforeEach(async({page})=>{

    loginPage=new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin("standard_user","secret_sauce");
    inventoryPage=new InventoryPage(page);//inv page object
   await  inventoryPage.addProductInCart("Sauce Labs Bike Light");
    cartPage=new CartPage(page);
    await cartPage.goToCartPage();
})


test("Test for cart product ",async()=>{
let productName=await cartPage.getProductDetailsFromCart();
console.log(productName);

})