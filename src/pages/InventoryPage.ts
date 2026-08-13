

import {Locator, Page} from "@playwright/test"
import {BasePage} from "../pages/BasePage.js"

export class InventoryPage extends BasePage
{

//private Locators
private readonly productList:Locator;
private readonly cartOption:Locator;
private readonly addToCartBtn:Locator;

//constructor
constructor(page:Page)
{
    super(page);
    this.productList=page.locator("//div/div[@class='inventory_item']//a//div[@class='inventory_item_name ']");//6
    this.cartOption=page.locator("a.shopping_cart_link");
    this.addToCartBtn=page.locator("//button[text()='Add to cart']");
}


//public method

async getInventoryPageTitle():Promise<String>
{
    return await this.page.title();
}

async getProductCount():Promise<number>
{
    return await this.productList.count();

}

async getProductDetails():Promise<void>
{
   let allProductText:string[]=await this.productList.allInnerTexts();
   for(let i of allProductText)
   {
    console.log(i);
    
   }
}

async addProductInCart(pname:string):Promise<void>
{
    let allProducts:Locator[]=await this.productList.all();
     for(let i of allProducts)
    {
        console.log(await i.innerText());
        if((await i.innerText()).includes(pname))
        {
            await i.click();
            break;
        }
        
    }

    //click on Add to cart button
    await this.addToCartBtn.click();

}

async waitForPage():Promise<void>
{
   await this.page.waitForTimeout(1500);
}




}