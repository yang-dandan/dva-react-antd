import React from 'react';
import {Col,Form,Input,DatePicker,Select,Checkbox} from 'antd';

/**
 *  获取表单查询区域数据
 * @param {*} fieldsDta 
 */
export  function getSearchFieldsForm(fieldsDta,getFieldDecorator,isFull){
    const viewData = [];
    const FormItem = Form.Item;
    const {RangePicker} = DatePicker;
    for(let i = 0; typeof(fieldsDta) !== "undefined" && i< fieldsDta.length;i++){
        
        let obj = fieldsDta[i];

        if(obj.opType && obj.opType.some(op=>{return op === 'queryForm'})){
            let temp = "";
            if(obj.type === "Input"){
                temp = getFieldDecorator(obj.id)(<Input placeholder={obj.placeholder} id={obj.id} style={{width:'240px'}}/>);
            }else if(obj.type === "Select"){
                const options = obj.selectData.map(m =>{
                    return <Select.Option key={m.key}>{m.val}</Select.Option>
                });
            temp = getFieldDecorator(obj.id,{initialValue:obj.defaultValue})(<Select id={obj.id} style={{width:'240px'}}>{options}</Select>);   
            }else if(obj.type === "DatePicker"){
                temp = getFieldDecorator(obj.id)(<DatePicker id={obj.id} style={{width:'240px'}}></DatePicker>);
            }else if(obj.type === "RangePicker"){
                temp = getFieldDecorator(obj.id)(<RangePicker id={obj.id} placeholder={['开始时间','结束时间']} style={{width:'240px'}}></RangePicker>);
            }
            viewData.push(
                <Col span={8} key={i} style={{display:(isFull || i < 3) ? 'block':'none',marginTop: i > 2 ? "10px":"0px"}}>
                    <FormItem label={obj.name}>
                        {
                            temp
                        }
                    </FormItem>
                </Col>
            )
        }        
    }
    return viewData;
}


/**
 *  生成查看视图表单
 * @param {*} fieldsDta 
 */
export function getViewFiledsForm(fieldsDta){
    const viewData = [];
    for(let i = 0; typeof(fieldsDta) !== "undefined" && i< fieldsDta.length;i++){
        let obj = fieldsDta[i];
        if(obj.opType && obj.opType.some(op=>{return op === 'viewForm'})){
            viewData.push(
                    <Col key={i} span={obj.big ? 24 : 12} style={{marginBottom:'5px'}}>
                        <strong>{obj.name}:</strong> xxxxx
                    </Col>
            );
        }
    }
    return viewData;
}

/**
 *  生成修改，新增数据视图
 * @param {*} fieldsDta 
 */
export function getEditFiledsForm(fieldsDta,getFieldDecorator){
    const FormItem = Form.Item;
    const { TextArea } = Input;
    const CheckboxGroup = Checkbox.Group;
    const viewData = [];
    for(let i = 0; typeof(fieldsDta) !== "undefined" && i< fieldsDta.length;i++){
        let obj = fieldsDta[i];
        if(obj.opType && obj.opType.some(op=>{return op === 'editForm'})){
            let temp = "";
            if(obj.type === "Input"){
                
                temp = getFieldDecorator(obj.id,{rules:obj.rules})(obj.isTextArea ? <TextArea rows={4} od={obj.id} style={{width:'300px'}}></TextArea>:<Input placeholder={obj.placeholder} id={obj.id} style={{width:'300px'}}/>);
            }else if(obj.type === "Select"){
                const options = obj.selectData.map(m =>{
                    return <Select.Option key={m.key}>{m.val}</Select.Option>
                });
            temp = getFieldDecorator(obj.id,{initialValue:obj.defaultValue,rules:obj.rules})(<Select id={obj.id} style={{width:'300px'}}>{options}</Select>);   
            }else if(obj.type === "DatePicker"){
                temp = getFieldDecorator(obj.id,{rules:obj.rules})(<DatePicker id={obj.id} style={{width:'300px'}}></DatePicker>);
            }else if(obj.type === "RangePicker"){
                temp = getFieldDecorator(obj.id,{rules:obj.rules})(<RangePicker id={obj.id} placeholder={['开始时间','结束时间']} style={{width:'300px'}} ></RangePicker>);
            }else if(obj.type === "Checkbox"){
                temp = getFieldDecorator(obj.id,{rules:obj.rules})(<CheckboxGroup options={obj.checkboxOptions} id={obj.id} style={{width:'300px'}}></CheckboxGroup>);
            }
            viewData.push(
                <Col span={12} key={i}>
                    <FormItem label={obj.name}>
                        {
                            temp
                        }
                    </FormItem>
                </Col>
            )
        }
    }
    return viewData;

}


/**
 *  展示ListTable对应的列名
 * @param {*} fieldsDta 
 */
export function getListTableColumns(fieldsDta){
    const viewData = [];
    for(let i = 0; typeof(fieldsDta) !== "undefined" && i< fieldsDta.length;i++){
        let obj = fieldsDta[i];
        if(obj.opType && obj.opType.some(op=>{return op === 'listTable'})){
            viewData.push(
                {
                    title:obj.name,
                    align:"center",
                    dataIndex:obj.id,
                    key:obj.id,
                    render:obj.render ? obj.render : {}
                }
            )
        }
    }
    return viewData;
}