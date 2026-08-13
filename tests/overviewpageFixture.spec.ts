
import {test,expect} from "../src/fixture/pagefixtures.js";


test.beforeEach(async({loginPage})=>{

    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);

})

//AAA" Arrang test act  and assert

test("Test for payment details",async({overviewPage,inventoryPage,cartPage,checkoutPage})=>{
await inventoryPage.addProductInCart(process.env.PRODUCT!);
await cartPage.goToCartPage();
await cartPage.clickCheckoutButton();
await checkoutPage.doCheckout(process.env.FN!,process.env.LN!,process.env.PC!);
//overview
let count=await overviewPage.getPaymentDetails();
expect(count).toBe(8);
console.log("Total details count is: "+count);

})

test("Test for finish checkout process",async({overviewPage,inventoryPage,cartPage,checkoutPage})=>{
await inventoryPage.addProductInCart(process.env.PRODUCT!);
await cartPage.goToCartPage();
await cartPage.clickCheckoutButton();
await checkoutPage.doCheckout(process.env.FN!,process.env.LN!,process.env.PC!);
let heading=await overviewPage.doFinishCheckoutProcess();
expect(heading).toBe("Thank you for your order!");
console.log("Success Message: "+heading);


})