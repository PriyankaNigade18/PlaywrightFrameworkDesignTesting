
import XLSX, { WorkBook } from "xlsx";


export class ExcelHelper
{
    static readExcelFile(filepath:string,sheetname:string):Record<string,string>[]
    {
        const workbook:WorkBook=XLSX.readFile(filepath);
        const sheet=workbook.Sheets[sheetname];
        return XLSX.utils.sheet_to_json<Record<string,string>>(sheet);

    }
}
