import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";


export class OverviewPage extends BasePage{

    //locator
    private readonly paymentInfo;
    private readonly finishBtn;
    private readonly headingEle;


    //constructor
    constructor(page:Page)
    {
        super(page);
        this.paymentInfo=page.locator("//div[@class='summary_info']/div[contains(@class,'summary')]")
        this.finishBtn=page.locator("#finish");
        this.headingEle=page.getByRole('heading',{level:2});


    }

   //methods

    async getPaymentDetails():Promise<number>
    {
         let allData=await this.paymentInfo.allInnerTexts()
         for(let i of allData)
         {
            console.log(i);
            
         }
         return allData.length;
    }


    async doFinishCheckoutProcess():Promise<String>
    {
        await this.finishBtn.click();
       return await this.headingEle.innerText()
    }





}
