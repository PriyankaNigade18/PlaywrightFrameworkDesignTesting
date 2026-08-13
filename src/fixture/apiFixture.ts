

import {test as baseTest} from "@playwright/test";
import { ApiHelper } from "../api/ApiHelper.js";

//type of variable
type apiFixture={
apiHelper:ApiHelper

}

//extend the playwright baseTest
export let test=baseTest.extend<apiFixture>({

    apiHelper:async({request},use)=>{
        //create object
        let apiHelper=new ApiHelper(request,process.env.APIBASEURL!);
        //share it
        use(apiHelper);

    }




})

export {expect} from "@playwright/test"