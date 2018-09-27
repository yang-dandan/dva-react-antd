/**
 *  设置用户登录的权限列表
 * @param {权限列表} authority 
 */
export function setAuthority(authority){
    localStorage.setItem("loginUserAuthority",authority);
}

/**
 *  清除用户登录权限
 */
export function clearAuthority(){
    localStorage.removeItem("loginUserAuthority");
}

/**
 *  获取当前用户的登录权限列表数据
 */
export function getAuthority(){
    return localStorage.getItem("loginUserAuthority");
}

/**
 *  设置用户登录凭证
 * @param {登录凭证} token 
 */
export function setLoginToken(token){
    localStorage.setItem("loginUserToken",token);
}

/**
 *  清除用户登录凭证
 */
export function clearLoginToken(){
    localStorage.removeItem("loginUserToken");
}

/**
 *  获取用户的登录凭证
 */
export function getLoginToken(){
    return localStorage.getItem("loginUserToken");
}

/**
 *  检查当前用户是否登录状态
 */
export function checkLogin(){
    let userToken = getLoginToken();
    if(userToken === null){
        return false;
    }
    return true;
}

/**
 *  设置页面标题
 * @param {*} title 
 */
export function setTitle(title){
    document.title = title;
}


