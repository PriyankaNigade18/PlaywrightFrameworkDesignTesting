import XLSX from "xlsx";

export function readSheet(sheetName: string, rowNumber: number):any {
    const workbook = XLSX.readFile("src/data/TestExcelData.xlsx");

    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet);

    return data[rowNumber];
}

/*

import {test,expect} from "@playwright/test"
import {readSheet} from "../utils/ExcelSheetwise.js"
test("Excel file reading",()=>
{
    let loginData=readSheet("login",2);
   
   
    console.log(loginData.username);
    
    
})


*/