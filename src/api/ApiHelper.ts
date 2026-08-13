
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

async get(endpoint:string,headers?:Record<string,string>)
{

    let response=await this.request.get(`${this.baseUrl}${endpoint}`,{
        headers:headers
    });

   return  {
        status:response.status(),
        statusMessage:response.statusText(),
        body:await response.json()

        }
}

async post(endpoint:string,payload:object,headers?:Record<string,string>)
{
    let response=await this.request.post(`${this.baseUrl}${endpoint}`,{
        headers:headers,
        data:payload
    });

    return  {
        status:response.status(),
        statusMessage:response.statusText(),
        body:await response.json()

        }
    
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