


import fs from "fs";

import {parse} from "csv-parse/sync"

export class CsvHelper
{
     static readCSV(filepath:string):Record<string,string>[]
    {
        return parse(fs.readFileSync(filepath,'utf-8'),{
            columns:true, //it will consider first rows which is columns entry
            skip_empty_lines:true,
            trim:true
        }) as Record<string,string>[];

    }
}
