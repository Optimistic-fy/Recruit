import React from 'react'
import { 
    InputItem,
    WhiteSpace,
    List,
    Drawer
} from 'antd-mobile'
import Scroll from 'react-bscroll'
import { connect } from 'react-redux'
import { handleGetIem, handleGetSubItem, handleGetCheck } from '../../../redux/user.redux'
import Water from 'water-wave'

@connect(
    state => state.user,
    { handleGetIem, handleGetSubItem, handleGetCheck }
)
class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            active: '',
            subactive: 0,
            open: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.onOpenChange = this.onOpenChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange(key ,val){
        this.setState({
            [key]: val
        })
    }
    onOpenChange = (index, name) => {
        this.setState({ 
            open: !this.state.open ,
            active: index,
            subactive: 0
        });
        this.props.handleGetIem(name)
    }
    handleClick(cname, index){
        this.setState({
            subactive: index
        })
        this.props.handleGetSubItem(cname)
    }
    handleClickItem(item){
        this.setState({
           title: item,
        })
        setTimeout(() => {
            this.setState({
                open: !this.state.open,
                subactive: 0
            })
        }, 500)
        this.props.handleGetCheck(item)
    }
    render(){
        const { job, subItem, ThrItem, defaultItem } = this.props
        const Item = List.Item;
        const sidebar = (
            <div className="item">
                <div className="leftItem" style={{float: 'left', width: '50%'}}>
                    <Scroll click={true}>
                        { subItem ? 
                                subItem.map((v, index) => (
                                    <List key={v.code} className="my-list">
                                        <Item className={this.state.subactive === index ? 'active' : '' } onClick={() => this.handleClick(v.name, index)}>{v.name}</Item>
                                        <Water color="#000" />
                                    </List>
                                )) : null
                        }
                    </Scroll>
                </div>
               <div className="rightItem" style={{float: 'right', width: '50%'}}>
                    <Scroll click={true}>
                        {ThrItem ? 
                            ThrItem.map(v => (
                                <List key={v.code} className="my-list">
                                    <Item onClick={() => this.handleClickItem(v.name)}>{v.name}</Item>
                                    <Water color="#000" />
                                </List>
                            )) : 
                            <div>
                                { defaultItem ? defaultItem.map(v => (
                                    <List key={v.code} className="my-list">
                                        <Item onClick={() => this.handleClickItem(v.name)}>{v.name}</Item>
                                        <Water color="#000" />
                                    </List> 
                                )) : null}
                            </div>
                        }
                    </Scroll>
                </div>
            </div>
        )
        return (
            <div style={{padding: 10, height:'calc(100% - 45px)'}}>
                <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                    <p style={{fontSize:'20px'}}>选择职位类型</p>
                    <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>选择职位名称所对应的类型</p>
                    <WhiteSpace />
                    <InputItem value={this.state.title} onChange={v => this.handleChange('title' ,v)} placeholder='输入职位名称'> 
                    </InputItem>
                </div>
                <Drawer
                    className="drawer"
                    style={{ top:125 }}
                    enableDragHandle
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <Scroll click={true}>
                        <List className="my-list">
                            {job ? job.map((v, index) => (
                                <Item className={this.state.active === index ? 'active' : '' } key={v.code} arrow="horizontal" onClick={() => this.onOpenChange(index, v.name)} >{v.name}</Item>
                            )) : null }
                        </List>
                    </Scroll>
                </Drawer>
            </div>
        )
    }
}

export default Post