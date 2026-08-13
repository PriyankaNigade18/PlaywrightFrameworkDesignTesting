
import {Page} from "@playwright/test";


export class BasePage
{
//global
/*
page should be protected so that we can access in only same class 
and in child class(test case) as testcase will extends peroperties of baseclass

readonly property we can add for object to create constant object
*/
protected readonly page;

constructor(page:Page)//local
{
this.page=page;
}


//common properties of project we can add in page page
//The return type of an async function or method must be the global Promise<T> type.
async getPageTitle():Promise<String>
{
   return await this.page.title();
}

async getPageUrl():Promise<String>
{
   return this.page.url();
}

}

