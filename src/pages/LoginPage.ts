/*
Page object where page class should follow Encapsulation principle
where we can maintain private locators and public actions methods
and to initialize private locator we need constructor

Page class= private Locator+ constructor+ public Methods
*/

import { Locator,Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";


export class LoginPage extends BasePage
{
//private + constant locator
private readonly username:Locator;
private readonly password:Locator;
private readonly loginBtn:Locator;
private readonly errorMessage:Locator;

//constructor: initialize every locator we need constructor
constructor(page:Page)
{
    super(page)//call parent class constructor
    this.username=page.locator("#user-name");
    this.password=page.locator("#password");
    this.loginBtn=page.locator("#login-button");
    this.errorMessage=page.locator("//h3[@data-test='error']");

}

//public action methods


async goToLoginPage():Promise<void>
{
    await this.page.goto("/");//url will launch from config file from use object
}

async getLoginPageTitle():Promise<String>
{
    return await this.page.title();
}

async getLoginPageUrl():Promise<string>
{
    return this.page.url();
}

async doLogin(un:string,psw:string):Promise<void>
{
    await this.username.fill(un);
    await this.password.fill(psw);
    await this.loginBtn.click();


}


async isErrorMessageDisplayed():Promise<boolean>
{
    return await this.errorMessage.isVisible();
}


async getErrorMessage():Promise<string>
{
return await this.errorMessage.innerText();
}



}