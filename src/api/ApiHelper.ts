
import {APIRequestContext,APIResponse} from "@playwright/test";

export class ApiHelper
{

    //private data
    private readonly baseUrl:string;
    private readonly request:APIRequestContext;

//to initialize object
constructor(request:APIRequestContext,baseUrl:string)
{
this.baseUrl=baseUrl;
this.request=request;
}

//public method

async get(
    endpoint: string,
    headers?: Record<string, string>
) {

    const response = await this.request.get(
        `${this.baseUrl}${endpoint}`,
        {
            headers
        }
    );

    const text = await response.text();

    let body;

    try {
        body = JSON.parse(text);
    } catch {
        body = text;
    }

    return {
        status: response.status(),
        statusMessage: response.statusText(),
        body
    };
}

async post(
    endpoint: string,
    payload: object,
    headers?: Record<string, string>
) {

    console.log("POST URL:", `${this.baseUrl}${endpoint}`);

    console.log(
        "Authorization header exists:",
        !!headers?.Authorization
    );

    console.log(
        "Authorization starts with Bearer:",
        headers?.Authorization?.startsWith("Bearer ")
    );

    const response = await this.request.post(
        `${this.baseUrl}${endpoint}`,
        {
            headers,
            data: payload
        }
    );

    console.log("POST status:", response.status());

    const text = await response.text();

    let body;

    try {
        body = JSON.parse(text);
    } catch {
        body = text;
    }

    return {
        status: response.status(),
        statusMessage: response.statusText(),
        body
    };
}
async put(endpoint:string,payload:object,headers?:Record<string,string>)
{
     let response=await this.request.put(`${this.baseUrl}${endpoint}`,{
        headers:headers,
        data:payload
    });

    return  {
        status:response.status(),
        statusMessage:response.statusText(),
        body:await response.json()

        }
    
}

async delete(endpoint:string,headers?:Record<string,string>)
{
    let response=await this.request.delete(`${this.baseUrl}${endpoint}`,{
        headers:headers
    })
    
    return{
        status:response.status(),
        statusMessage:response.statusText()
    }
}

}