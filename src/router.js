import React from 'react';
import { Router, Route, Switch ,Redirect} from 'dva/router';
import {getRouterData} from './common/router';
import {checkLogin} from './utils/utils';

// 根据请求path获取对应的router

function getRouter(DashboardView,props,commonProps){
    // 这里可以判断用户是否处于登录状态，如果不是登录状态，直接返回到登录界面
    let isLogin = checkLogin();
    if(isLogin){
      return <DashboardView {...props} {...commonProps}></DashboardView>
    }else{
      return <Redirect to="/login"></Redirect>
    }
    
}

function RouterConfig({ history,app }) {
  const routerData = getRouterData(app);

  const LoginView = routerData.filter(item=>item.path === "/login")[0].component;
  const DashboardView = routerData.filter(item=>item.path === "/")[0].component;
  
  const commonProps = {
    app,
    navData:routerData.filter((item)=>{
      return (item.path !== "/" && item.path !== "/login");
    })
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" render={props=><LoginView {...props}/>} />
        <Route path="/"  render={props=> getRouter(DashboardView,props,commonProps) }>  </Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
