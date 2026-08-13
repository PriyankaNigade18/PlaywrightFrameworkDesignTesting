import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";


export class CheckoutPage extends BasePage
{
    //locators
    private readonly fname;
    private readonly lname;
    private readonly postalCode;
    private readonly continueBtn;

    constructor(page:Page)
    {
        super(page);
        this.fname=page.getByRole('textbox',{name:'First Name'});
        this.lname=page.locator("#last-name");
        this.postalCode=page.getByPlaceholder("Zip/Postal Code");
        this.continueBtn=page.locator("#continue");

    }

    //actions
    async doCheckout(fn:string,ln:string,pc:string)
    {
        console.log("Checkout process started....");
        
        await this.fname.fill(fn);
        await this.lname.fill(ln);
        await this.postalCode.fill(pc);
        console.log("Checkout with user name: "+fn);
        await this.continueBtn.click();
        
    }

}
