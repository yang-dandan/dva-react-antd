import React from 'react';
import {Divider,Popconfirm,Icon} from 'antd';

import ListTable from '../../components/commons/ListTable';
import { connect } from 'dva';
/**
 *  用户管理中心
 */
@connect(({userManager,loading}) =>({
    listResult:userManager.listResult,
    fieldData:userManager.fieldData,
    tableLoading:loading.effects["userManager/userList"]
}))
export default class UserManager extends React.PureComponent{


    state = {
        viewDialog:false,
        editDialog:false,
        isEdit:false
    }

    /**
     *  查询区域按钮
     */
    getSearchBarBtn=()=>{
        let btnGroup = [
            {type:"primary",label:"查询",isSubmitBtn:true},
            {type:"",label:"新增",isSubmitBtn:false,onClick:this.addData},
        ];
        return btnGroup;
    }

    /**
     *  配置查询信息
     */
    getFieldData = () =>{
        let fieldsDta = [ 
            {type:"Input",id:"userName",name:"姓名",placeholder:"请输入姓名",opType:["queryForm","viewForm","editForm"]},
            {type:"Input",id:"userName2",name:"姓名2" ,placeholder:"请输入姓名",opType:["queryForm","viewForm","editForm"],isTextArea:true},
            {type:"Select",id:"userSex",name:"性别",selectData:[],defaultValue:"-1",opType:["queryForm","viewForm","editForm"]},
            {type:"DatePicker",id:"createTime",name:"创建日期",opType:["queryForm","editForm"]},
            {type:"RangePicker",id:"opTime",name:"操作时间",opType:["queryForm"]},
            {type:"Input",id:"test",name:"测试验证",opType:["editForm"],rules:[{required: true, message: 'Please input your E-mail!'}]},
            {type:"Input",id:"appName",name:"应用名称",opType:["listTable"],render:d=>{return d;}},
            {type:"Input",id:"linkMan",name:"应用联系人",opType:["listTable"],render:d=>{return d;}},
            {type:"Input",id:"linkPhone",name:"联系人电话",opType:["listTable"],render:d=>{return d;}},
            {type:"Input",id:"createTime",name:"创建时间",opType:["listTable"],render:d=>{return d;}},
            {type:"Input",id:"orgName",name:"企业名称",opType:["listTable"],render:d=>{return d;}},
            {type:"Input",id:"action",name:"操作",opType:["listTable"],render:(text,record)=>{
                return  <span>
                            <a href="javascript:;" onClick={()=>this.viewData(record.id)}>查看</a> 
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>this.editData(record.id)}>修改</a>
                            <Divider type="vertical" />
                            <Popconfirm title="确定要删除吗？" onConfirm={()=>this.delData(record.id)}  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                                <a href="javascript:;" style={{color:'red'}}>删除</a>
                            </Popconfirm>
                            
                        </span>
            }},
            
        ];
        return fieldsDta;
    }

   

    addData=()=>{
        console.log("添加数据:" );
        this.setState({
            isEdit:false,
            editDialog:true
        });
        
    }

    delData =(id)=>{
        console.log("删除数据:" + id);
    }

    viewData =(id)=>{
        this.setState({
            viewDialog:true
        })
    }

    editData = (id) =>{
        console.log(id);
        this.setState({
            isEdit:true,
            editDialog:true
        });
        
    }


    queryData =(params)=>{
        console.log("查询条件");
        console.log(params);
    }


    submitEditData=(values)=>{
        console.log(values);
    }

    onPageHandler=(pagination,filters,sorter,queryParam)=>{
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
        console.log(queryParam)
    }

    componentDidMount(){
        console.log("开始获取表格数据");
        const {dispatch} = this.props;
        dispatch({
            type:"userManager/initFieldData",
            fieldData:this.getFieldData()
        })
        dispatch({
            type:"userManager/userList",
            userName:"222"
        })
    }


    closeModal=()=>{
        this.setState({
            viewDialog:false,
            editDialog:false
        })
    }

    render(){
        const {listResult,fieldData,tableLoading} = this.props;
        const {viewDialog,isEdit,editDialog} = this.state;
        return (
            <div>
                <ListTable 
                    listResult={listResult}
                    tableLoading ={tableLoading}
                    fieldData={fieldData}
                    queryData={this.queryData}
                    addData={this.addData}
                    onPageHandler={this.onPageHandler}
                    viewDialog={viewDialog}
                    editDialog={editDialog}
                    isEdit={isEdit}
                    closeModal={this.closeModal}
                    submitEditData={this.submitEditData}
                    searchBarBtn={this.getSearchBarBtn}
                >
                </ListTable>
                
            </div>
        )
    }

}