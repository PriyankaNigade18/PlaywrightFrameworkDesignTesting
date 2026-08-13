
//custom fixtures
import {test,expect} from "../src/fixture/pagefixtures.js";
import {CsvHelper} from "../src/utilities/CsvHelper.js";
import {JsonHelper} from "../src/utilities/JsonHelper.js";
import {ExcelHelper} from "../src/utilities/ExcelHelper.js"

//hook
test.beforeEach(async({loginPage})=>{
//open login page
await loginPage.goToLoginPage();

})

test("Test for loginPageTitle",async({loginPage})=>{
//get thetitle
let appTitle=await loginPage.getLoginPageTitle();
console.log("Application title is: "+appTitle);

//assertion
expect(appTitle).toEqual("Swag Labs");

})

test("Test for APP URL",async({loginPage})=>{

    let appUrl=await loginPage.getLoginPageUrl();
    expect(appUrl).toContain("saucedemo");
    console.log("Application Url is: "+appUrl);
    
})


test("Tets for Login functionality with valid data",async({page,loginPage})=>{

   // await loginPage.doLogin("standard_user","secret_sauce");
   await loginPage.doLogin(process.env.APPUSERNAME!,process.env.APPPASSWORD!);
    expect(page).toHaveURL(/inventory/);
    console.log("User navigated to Inventory page!");
    

})


//data provider : data driven test in Playwright

const testRecord=CsvHelper.readCSV("src/testData/loginCsvData.csv");

for(let row of testRecord)//3
{
test(`Test for invalid login with CSV data ${row.username}`,async({loginPage})=>{

    await loginPage.doLogin(row.username,row.password);
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    console.log("Error message: "+await loginPage.getErrorMessage());
   
})
}

//how to read data from Json file

const jsonRecord=JsonHelper.readJson("src/testData/loginJsonData.json");

for(let row of jsonRecord)//3
{
test(`Test for invalid login with Json data ${row.username}`,async({loginPage})=>{

    await loginPage.doLogin(row.username,row.password);
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    console.log("Error message: "+await loginPage.getErrorMessage());
   
})
}

const excelRecord=ExcelHelper.readExcelFile("src/testData/loginExcelData.xlsx","logindata");

for(let row of excelRecord)//3
{
test(`Test for invalid login  ${row.Username} with excel data `,async({loginPage})=>{

    await loginPage.doLogin(row.Username,row.Password);
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    console.log("Error message: "+await loginPage.getErrorMessage());
   
})
}