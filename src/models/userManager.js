import {getAppManagerList} from '../services/API';


export default {
    namespace:"userManager",
    state:{
   
    },

    effects:{
        *userList(payload,{put,call}){
            const result = yield call(getAppManagerList,payload.userName);
            yield put({type:"updateTableList",result});

        },

        *initFieldData(payload,{put}){
            const newColumns = payload.fieldData.map(m=>{
                
                    if(m.id === "userSex"){
                        m.selectData = [
                            {key:-1,val:"全部"},
                            {key:1,val:"男"},
                            {key:0,val:"女"} 
                        ]
                       return  m;
                    }else{
                        return m;
                    }
            });
            yield put({type:"updateFieldData",payload:newColumns});
        }
    },

    reducers:{
        updateTableList(state,{result}){
            return {
                ...state,
                listResult:result
            }
        },
        updateFieldData(state,payload){
            return {
                ...state,
                fieldData:payload.payload
            }
        }
    }
}