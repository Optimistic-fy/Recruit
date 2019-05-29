import React from 'react'
import { 
    WhiteSpace,
    List,
    Picker,
    NavBar,
    Modal, 
    Icon,
    Drawer,
} from 'antd-mobile'
import { connect } from 'react-redux'
import { updateBaseReq, getCityList } from '../../../redux/user.redux'
import CityList from './cityList'

const asyncValue = [
    {label: "初中及以下", value: "初中及以下"},
    {label: "中专/中技", value: "中专/中技"}, 
    {label: "高中", value: "高中"}, 
    {label: "大专", value: "大专"}, 
    {label: "本科", value: "本科"}, 
    {label: "研究", value: "研究"}, 
    {label: "硕士", value: "硕士"}, 
    {label: "博士", value: "博士"}
]
const asyncBase = [
    {label: "经验不限", value: "经验不限"}, 
    {label: "应届生", value: "应届生"},
    {label: "1年以内", value: "1年以内"}, 
    {label: "1-3年", value: "1-3年"}, 
    {label: "3-5年", value: "3-5年"}, 
    {label: "5-10年", value: "5-10年"}, 
    {label: "10年以上", value: "10年以上"}
]

@connect(
    state => state.user,
    { updateBaseReq, getCityList }
)

class BaseReq extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            cols: 1,
            open: false, 
            expere: '', 
            degree: ''
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleBasereq = this.handleBasereq.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleClick(){
        this.setState({ 
            open: !this.state.open
        })
        this.props.getCityList()
    }
    handleBasereq(key, val){
        this.setState({ 
            [key]: val
        })
    }
    closeOpen(){
        this.setState({ 
            open: !this.state.open
        })
    }
    handleSubmit(){
        const { expere, degree } = this.state
        const alert = Modal.alert
        let bcity, bexpre, bdegree
        
        if(this.props.clickCity === ''){
            bcity = this.props.workCity
        }else{
            bcity = this.props.clickCity
        }

        if( expere === ''){
            bexpre = this.props.expere
        }else{
            bexpre = expere
        }

        if( degree === ''){
            bdegree = this.props.degree
        }else{
            bdegree = degree
        }

        alert('修改', '你确定修改基本信息吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    this.props.updateBaseReq(bcity, bexpre, bdegree)
                    window.location.href = window.location.href
                }
            },
        ])
    }
    render(){
        const { workCity, expere, degree, letter, hotCity, subLevelModelList } = this.props
        const Item = List.Item
        const Brief = Item.Brief

        const sidebar = (
            <div style={{position:'relative', background:'#fff', height: '100%', top:6}}>
                <NavBar 
                    style={{background: '#fff', borderBottom: '1px solid #ccc', position:'fixed', width: '100%', zIndex:2}}
                    mode="dark"
                    leftContent="Back"
                    leftContent={
                        <Icon type="left" color={'#000'} style={{position:'relative', zIndex: 10}} />
                    }
                    onLeftClick = {() => {this.handleClick()}}
                >
                选择城市
                </NavBar>
                <CityList closeDre={this.closeOpen.bind(this)} workCity={workCity} letter={letter} hotCity={hotCity} subLevelModelList={subLevelModelList} ></CityList>
            </div>
        )
        return (
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight, position: 'absolute', overflow:'hidden'}}
                enableDragHandle
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={() => this.handleClick()}
                position={"bottom"}
            >
                <div className="base">
                    <NavBar 
                        style={{background: '#fff'}}
                        mode="dark"
                        rightContent = {
                            <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                        }
                    ></NavBar>
                    <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                        <p style={{fontSize:'20px'}}>基本信息</p>
                        <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>选择公司的基本要求</p>
                        <WhiteSpace />
                        <div className="baseItem">
                            <Item arrow="horizontal" multipleLine onClick={() => this.handleClick()} >
                                工作城市 {this.props.clickCity ? <Brief  style={{fontSize:'16px', textIndent:0}}>{this.props.clickCity}</Brief> : <Brief style={{color:'#ccc', fontSize:'16px', textIndent:0}}>{workCity}</Brief>}
                            </Item>
                        </div>
                        <WhiteSpace />
                        <div className="baseItem">
                            <p>经验</p>
                            <Picker
                                title={"经验要求"}
                                data={asyncBase}
                                cols={this.state.cols}
                                value={this.state.expere}
                                onChange={v => this.setState({ expere: v })}
                                onOk={v => this.handleBasereq('expere', v)}
                                extra={expere}
                            >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                        <WhiteSpace />
                        <div  className="baseItem">
                            <p>学历</p>
                            <Picker
                                title={"学历要求"}
                                data={asyncValue}
                                cols={this.state.cols}
                                value={this.state.degree}
                                onChange={v => this.setState({ degree: v })}
                                onOk={v => this.handleBasereq('degree', v)}
                                extra={degree}
                            >
                                <List.Item arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </div>
                </div>
            </Drawer>
        )
    }
}

export default BaseReq