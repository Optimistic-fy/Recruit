import React from 'react'
import { 
    WhiteSpace,
    Icon,
    NavBar,
    Drawer,
    List,
    Modal
} from 'antd-mobile'
import { connect } from 'react-redux'
import { getCityList, updateCity } from '../../../redux/user.redux'
import CityList from './cityList'

@connect(
    state => state.user,
    { getCityList, updateCity }
)

class WantArea extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleClick(){
        this.setState({ 
            open: !this.state.open
        })
        this.props.getCityList()
    }
    closeOpen(){
        this.setState({ 
            open: !this.state.open
        })
    }
    handleSubmit(){
        const { clickCity } = this.props
        const alert = Modal.alert
        
        if(clickCity === ''){
            alert('还没想好?', '你要放弃修改城市吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        window.location.href = window.location.href
                    }
                },
            ])
        }else{
             alert('保存', '你确定修改期望工作的城市吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => {
                        this.props.updateCity(clickCity)
                        window.location.href = window.location.href
                    }
                },
            ])
        }
    }
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const { wantarea, letter, hotCity, subLevelModelList } = this.props

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
                <CityList closeDre={this.closeOpen.bind(this)} wantarea={ wantarea } letter={letter} hotCity={hotCity} subLevelModelList={subLevelModelList} ></CityList>
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
                <div className="wantarea">
                    <NavBar 
                            style={{background: '#fff'}}
                            mode="dark"
                            rightContent = {
                                <span style={{ marginRight: '16px', color:'#000'}} onClick={() => this.handleSubmit()}>保存</span>
                            }
                        ></NavBar>
                    <div style={{position:'fixed', left:0, right:0, padding: 10}}>
                        <p style={{fontSize:'20px'}}>工作城市</p>
                        <p style={{fontSize: 15, color:'#bbb7b7', margin: '10px 0', }}>选择你想工作的城市</p>
                        <WhiteSpace />
                        <WhiteSpace />
                        <Item arrow="horizontal" multipleLine onClick={(e) => this.handleClick(e)}>
                            城市{this.props.clickCity ? <Brief  style={{fontSize:'16px'}}>{this.props.clickCity}</Brief> : <Brief style={{color:'#ccc', fontSize:'16px'}}>请选择</Brief>}
                        </Item>
                        <WhiteSpace />
                    </div>
                </div>
            </Drawer>
        )
    }
}

export default WantArea