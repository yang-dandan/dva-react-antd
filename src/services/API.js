import request from '../utils/request';


export async function getUserInfo(params){
    return request("/api/getUserInfo",{
        method:"GET",
        body:params
    });
}

/**
 *  用户名密码登录
 * @param {*} params  请求的参数
 */
export async function doLoginByUserNameAndPassword(params){
    return request("/api/doLogin",{
        method:"POST",
        body:params
    });
}

/**
 * 退出登录
 * @param {*} params 退出登录 
 */
export async function logout(params){
    return request("/api/logout",{
        method:"POST",
        body:params
    })
}

/**
 * 获取用户菜单
 * @param {用户信息} params 
 */
export async function getMenu(params){
    return request("/api/getMenuData",{
        method:"POST",
        body:params
    })
}

/**
 *  获取应用列表
 * @param {*} params 
 */
export async function getAppManagerList(params){
    return request("/api/org/appmanager/queryList",{
        method:"POST",
        body:params
    })
}