import React,{createElement} from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

let routerDataCache;

/**
 *  定义动态加载modele方法
 * @param {*} app 
 * @param {*} models 
 * @param {*} component 
 */
const dynamicWrapper = (app,models,component) =>{
    models.forEach(model=>{
        if(modelNotExisted(app,model)){
            console.log("加载model：" + model)
            app.model(require(`../models/${model}.js`).default);
        }
    });
    
    //新版本  cnpm i -S react-loadable
    // 安装组建
    return Loadable({
        loader: () => { 
          routerDataCache = getRouterData(app);
          return component().then(raw => {
            const Component = raw.default || raw;
            return props =>
              createElement(Component, {
                ...props,
                routerData: routerDataCache,
              });
          });
        },
        loading: () => {
            //进度
          return <Spin size="large" className="global-spin" />;
        },
      });

}


//定义路由
export const getRouterData = (app) => {

    const routerConfig = [
        {
            path:"/login",
            component:dynamicWrapper(app,["login"],()=>import("../routes/login/login")),
        },
        {
            path:"/",
            component:dynamicWrapper(app,["example","dashboard"],()=>import("../layout/Dashboard"))
        },
        {
            path:"/example",
            component:dynamicWrapper(app,[],()=> import("../routes/demo"))
        },
        {
            path:"/test",
            component:dynamicWrapper(app,[],()=> import("../routes/IndexPage"))
        },
        {
            path:"/UserManager",
            component:dynamicWrapper(app,["userManager"],()=>import("../routes/UserManager/UserManager"))
        }


    ];
      
    return routerConfig;
}

