
/*
Fixtures
=============
To supply page class object and test data to test case

Playwright support two types of fixtures
1.Inbuilt fixtures: browser,context,page,request
2.Custom fixtures: as per requirement/page object we can design custom fixture


*/

import {test as baseTest} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import {OverviewPage} from "../pages/OverviewPage.js";

//define type of page fixtures
type pageFixtures={
    loginPage:LoginPage,
    inventoryPage:InventoryPage,
    cartPage:CartPage,
    checkoutPage:CheckoutPage,
    overviewPage:OverviewPage

}

//extends playwright baseTest
//Extends the test object by defining fixtures and/or options that can be used in the tests.
export let test=baseTest.extend<pageFixtures>({


    loginPage:async({page},use)=>{
        //create object of page
        let loginPage=new LoginPage(page);
        //share object with test case
        use(loginPage);
    },
    inventoryPage:async({page},use)=>{
        let inventoryPage=new InventoryPage(page);
        use(inventoryPage);
    },
    cartPage:async({page},use)=>{
       let cartPage=new CartPage(page);
       use(cartPage);
    },
    checkoutPage:async({page},use)=>{
        let checkoutPage=new CheckoutPage(page);
        use(checkoutPage)
    },
    overviewPage:async({page},use)=>{
        let overviewPage=new OverviewPage(page);
        use(overviewPage)
    }




})


export {expect} from "@playwright/test";




