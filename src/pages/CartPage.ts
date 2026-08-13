
import {BasePage} from "./BasePage.js"
import {Locator,Page} from "@playwright/test"

export class CartPage extends BasePage
{
    //private Locator
    private readonly cartOption:Locator;
    private readonly cartproduct:Locator;
    private readonly removeBtn:Locator;
    private readonly continueShoppingBtn:Locator;
    private readonly checkoutBtn:Locator;


    //constructor
    constructor(page:Page)
    {
        super(page);
        this.cartOption=page.locator("a.shopping_cart_link");
        this.cartproduct=page.locator("div.inventory_item_name");
        this.removeBtn=page.locator("//button[text()='Remove']");
        this.continueShoppingBtn=page.locator("#continue-shopping");
        this.checkoutBtn=page.locator("#checkout");

    }


    //public method
    async goToCartPage():Promise<void>
    {
        return await this.cartOption.click();
    }

    async getProductDetailsFromCart():Promise<string>
    {
        return await this.cartproduct.last().innerText();
    }

    async doRemoveProduct():Promise<void>
    {
        return await this.removeBtn.click();
    }

    async doContinueShopping():Promise<void>
    {
        return await this.continueShoppingBtn.click();
    }


    async clickCheckoutButton():Promise<void>
    {
        return await this.checkoutBtn.click();
    }




}