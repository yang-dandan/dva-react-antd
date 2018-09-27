import React from 'react';
import {Form,Row,Button,Col,Icon,Table,Modal} from 'antd';

import {getSearchFieldsForm,getListTableColumns,getViewFiledsForm,getEditFiledsForm} from '../../common/genForm';


/**
 *  通用表格视图，上半部分是查询界面，下面为列表数据
 */
@Form.create()
export default class ListTable extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            expand:false
        }
    }

 

    onSubmit =(e)=>{
        let formData = this.props.form.getFieldsValue();
        this.processQueryData(formData);
        this.props.queryData(formData);
    }

    //处理查询条件
    processQueryData=(queryData)=>{
        let format = "YYYY-MM-DD";
        this.props.fieldData.map(m=>{
            if(typeof(queryData[m.id]) === "undefined"){
                delete queryData[m.id];
            }else{
                //处理日期
                if(m.type === "DatePicker"){
                    queryData[m.id] = queryData[m.id].format(format);
                }
                if(m.type === "RangePicker"){
                    let start = queryData[m.id][0].format(format);
                    let end = queryData[m.id][1].format(format);
                    delete queryData[m.id];
                    queryData[m.id +"_start"] = start;
                    queryData[m.id +"_end"] = end;
                }
            }
        });
    }


    toggle=()=>{
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    submitEditData=()=>{
        const s = this.props.submitEditData;
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log("提交数据");
                console.log(values);
                s(values);
            }
        })
    }

    /**
     *  分页按钮事件
     */
    onPageHandler=(pagination,filters,sorter)=>{
        let formData = this.props.form.getFieldsValue();
        const s = this.props.onPageHandler;
        this.processQueryData(formData);
        s(pagination,filters,sorter,formData);
    }


    render(){
        const {getFieldDecorator} = this.props.form;
        const {listResult,tableLoading,viewDialog,editDialog,isEdit,searchBarBtn} = this.props;
        
        let dataSource = [];
        let pagination = [];
        if(typeof(listResult) !== "undefined"){
            let obj = listResult.body;
            dataSource = obj.list;
            pagination.current = obj.pageAt;
            pagination.pageSize = obj.pageSize;
            pagination.total = obj.totalRow;
            pagination.showTotal = (total,range)=>{
                return "总共" + total + "条记录，当前为" + range[0] + "~" + range[1] + "条";
            }
        }
        return (
            <div>
                <div >
                    <Form onSubmit={this.onSubmit} layout="inline">
                        <Row gutter={24}>
                            {getSearchFieldsForm(this.props.fieldData,getFieldDecorator,this.state.expand)}
                        </Row>
                        <Row style={{marginTop:'10px'}}>
                            <Col span={24}>

                                {
                                    searchBarBtn().map(m=>{
                                        return <Button type={m.type} key={m.label} htmlType={m.isSubmitBtn ? 'submit':'button'} onClick={m.onClick} style={{marginLeft:'8px'}}>{m.label}</Button>
                                    })
                                }

                                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                            折叠 <Icon type={this.state.expand ? 'up' : 'down'} />
                                </a>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div style={{marginTop:'20px'}}>
                        <Table 
                            columns={getListTableColumns(this.props.fieldData)}
                            rowKey={record=>record.id}
                            dataSource={dataSource}
                            loading={tableLoading}
                            pagination={pagination}
                            onChange={this.onPageHandler}
                            >
                        </Table>
                </div>


                <Modal
                    visible={viewDialog}
                    title="查看"
                    onOk={this.handleOk}
                    closable={false}
                    width={800}
                    footer={[
                        <Button key="back" onClick={this.props.closeModal}>关闭</Button>
                    ]}
                    >
                    <div>
                        <Row>
                            {getViewFiledsForm(this.props.fieldData)}
                        </Row>
                    </div>
                    </Modal>



                 <Modal
                        visible={editDialog}
                        title={isEdit ? "修改":"新增"}
                        onOk={this.handleOk}
                        width={1000}
                        closable={false}
                        footer={[
                            <Button key="back" onClick={this.props.closeModal}>关闭</Button>,
                            <Button key="submit" type="primary" loading={tableLoading} onClick={this.submitEditData}>
                            提交
                            </Button>,
                        ]}
                        >
                        <Form>
                            <Row gutter={24}>
                                {getEditFiledsForm(this.props.fieldData,getFieldDecorator)}
                            </Row>
                        </Form>
                    </Modal>



            </div>
        )
    }

}