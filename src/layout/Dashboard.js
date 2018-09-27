import React from 'react';
import {connect} from 'dva';
import { Layout, Menu, Icon,Dropdown,Avatar,LocaleProvider } from 'antd';

import { Route, Switch,Redirect} from 'dva/router';

import styles from './Dashboard.css';

import {setTitle} from '../utils/utils';

import zhCN from 'antd/lib/locale-provider/zh_CN';

const {Header,Sider,Content,Footer}  = Layout;
const SubMenu = Menu.SubMenu;


/**
 *  主布局
 */
@connect(({dashboard} ) => ({
    menuData:dashboard.menuData,
}))
export default class Dashboard extends React.PureComponent{

    state = {
        siderCollapsed:false,
        menuData:[]
    }

    toggle=()=>{
        this.setState({
            siderCollapsed:!this.state.siderCollapsed,
        })
    }

    // 个人中心菜单点击事件
    onProfileMenuClick = (item)=>{
        const {dispatch} = this.props;
        if(item.key === "logout"){
           dispatch({
                type:"login/doLogout",
           });
        }
    }

    // 展示菜单数据
    showMenuData = (menusData)=>{
          console.log("显示菜单");
          console.log(menusData);
        //   if(typeof(menuData) === "undefined"){
        //     return [];
        //   }
        //   return menuData.map((item) => {
        //         if(item.children){
        //             return (
        //                 <SubMenu key={item.code} 
        //             title={item.icon ? (<span><Icon type={item.icon}></Icon><span>{item.name}</span></span>) : item.name}>
        //                          {this.showSubMenu(item.children)};
        //                 </SubMenu>
        //             );
        //         }
        //         return this.showSubMenu(item);
        //   });

        if(typeof(menusData) === "undefined"){
            return [];
        }else{
            return menusData.map((item) => {
                if(item.children){
                    return (
                        <SubMenu key={item.code}
                                title={item.icon ? 
                                    (<span>
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    </span>):item.name}>
                            {this.showMenuData(item.children)}
                        </SubMenu>
                    )
                }else{
                    return (
                        <Menu.Item key={item.code}>
                            <a href={item.path}>{item.name}</a>
                        </Menu.Item>
                    )
                }
            });
        }

        

    }

    showSubMenu = (menus) =>{
        return (
            <Menu.item key={menus.code}>
              {menus.icon ? (<Icon type={menus.icon}></Icon>):""}
              <span>
              {menus.name}
              </span>
            </Menu.item>
        )
    }


    componentDidMount(){
        setTitle("管理系统");
        const {dispatch} = this.props;
        dispatch({
            type:"dashboard/doGetMenu"
        })
    }

    render(){
        
     
        const profileMenu = (
            <Menu onClick={this.onProfileMenuClick}>
              <Menu.Item disabled>
                  <Icon type="user"></Icon>个人中心
              </Menu.Item>
              <Menu.Item disabled>
              <Icon type="setting"></Icon>密码修改
              </Menu.Item>
              <Menu.Divider/>
              <Menu.Item key="logout">
              <Icon type="logout"></Icon>退出登录
              </Menu.Item>
            </Menu>
          );

        // 定义传递的方法
        const {navData,menuData} = this.props;
        
        return (
            <LocaleProvider locale={zhCN}>
                <Layout className={styles.layout}>
                    {/* 左边的菜单开始 */}
                    <Sider  
                        collapsible
                        collapsed={this.state.siderCollapsed}
                        onCollapse={this.toggle}
                        >
                        <div className={styles.logo} />
                        
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                            {/* <Menu.Item key="1">
                                    <Icon type="user"></Icon>
                                    <span>我的菜单</span>
                            </Menu.Item>
                            <SubMenu key="2" title={<span><Icon type="setting"></Icon><span>系统管理</span></span>}>
                                <Menu.Item key="21">
                                    <a href="/#/example">用户管理</a>
                                
                                </Menu.Item>
                                <Menu.Item key="22">
                                <a href="/#/test">资源管理</a>
                                </Menu.Item>
                                <Menu.Item key="23">角色管理</Menu.Item>
                            </SubMenu> */}

                            {
                            
                            this.showMenuData(menuData)
                            }
                            

                        </Menu>
                    </Sider>
                    {/* 左边的菜单结束 */}


                    {/* 右边的内容开始 */}

                    <Layout>
                        <Header className={styles.header}>
                            {/*<Icon className={styles.trigger} type={this.state.siderCollapsed ? "menu-unfold":"menu-fold"} onClick={this.toggle}></Icon>*/}
                            <div className={styles.projName}>
                                <h3>应用管理系统</h3>
                            </div>
                            
                            <Dropdown placement="bottomCenter" overlay={profileMenu} >
                                <div className={styles.profile}>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" size="small"/>&nbsp;
                                    张三
                                </div>
                                
                            </Dropdown>

                        </Header>

                        <Content className={styles.content} >
                            
                            <Switch>
                            {
                                navData.map(item => (
                                    <Route path={item.path} key={item.path} exact component={item.component}></Route>  
                                ))
                            }
                            <Redirect exact from="/" to="/test"></Redirect>
                            </Switch>
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>
                            Copyright ©2018 Created by SCCA
                        </Footer>

                    </Layout>



                    {/* 右边的内容结束 */}
                

                </Layout>
            </LocaleProvider>
        );
    }
}
