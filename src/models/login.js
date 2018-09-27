import {doLoginByUserNameAndPassword,logout,getUserInfo} from '../services/API';
import { routerRedux } from 'dva/router';
import {setLoginToken,clearLoginToken} from '../utils/utils';

export default {
    namespace:"login",
    state:[
        
    ],
    effects: {
        *doLogin({payload:loginData},{call,put}){
            const loginResult = yield call(doLoginByUserNameAndPassword,loginData);
            if(loginResult.result_code === 0){
                console.log("用户"+loginData.userName+"登录成功");
                // 这里需要获取用户的token，然后写入本地浏览器中,同时还需要根据用户信息获取对应的菜单进行渲染
                setLoginToken("xxxxxxx");
                yield put(routerRedux.push("/"));
            }else{
               yield put({type:"showMessage",status:"error"});
            }
        },
        *doLogout(payload,{call,put}){
            console.log("系统退出");
            const result = yield call(logout);
            console.log(result);
            clearLoginToken();
            yield put(routerRedux.push("/login"));
        },
        *test(payload,{call}){
            console.log("测试数据");
            const result = yield call(getUserInfo);
            console.log("获取返回数据");
            console.log(result);
        }

    },

    reducers:{
        //显示错误消息
        showMessage(state,{status}){
            return {
                ...state,
                status:status
            };
        }
    }

}