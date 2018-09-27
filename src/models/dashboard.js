import {getMenu} from '../services/API';

export default {
    namespace:"dashboard",
    state:[

    ],
    effects: {
        *doGetMenu(payload,{call,put}){
            const menuData = yield call(getMenu,payload);
            yield put({
                type:"setMenuData",
                menuData
            })
        }

    },

    reducers:{
        //设置菜单状态
        setMenuData(state,{menuData}){
            return {
                ...state,
                menuData:menuData
            };
        }
    }

}