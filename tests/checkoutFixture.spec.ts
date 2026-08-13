

import {test,expect} from "../src/fixture/pagefixtures.js"


test.beforeEach(async({loginPage})=>{

    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);

})

test("Test for checkout process",async({checkoutPage,inventoryPage,cartPage})=>{
    await inventoryPage.addProductInCart(process.env.PRODUCT!);
    await cartPage.goToCartPage();
    await cartPage.clickCheckoutButton();
    await checkoutPage.doCheckout(process.env.FN!,process.env.LN!,process.env.PC!);

//assertion
expect(await checkoutPage.getPageUrl()).toContain("checkout-step-two")


})