
import { delay } from 'roadhog-api-doc';

import {menuData} from './mock/getMenus';
import {appList} from './mock/getAppList';

// 是否禁用代理，需要设置环境变量
const noProxy = process.env.NO_PROXY === 'true';

const API = {
    "POST /api/doLogin":(req,res)=>{
        const {userName,password} = req.body;
        if(userName === "admin" && password === "123456"){
            res.send({
                result_code:0,
                result_msg:"操作成功"
            });
        }else{
            res.send({
                result_code:500,
                result_msg:"登录失败!"
            });
        }
    },
    "POST /api/logout":{
        result:200
    },
    "POST /api/getMenuData":menuData,
    "POST /api/org/appmanager/queryList":appList
}



export default noProxy? {
    'GET /api/*': 'http://127.0.0.1:1988/',
} : delay(API,1000);
