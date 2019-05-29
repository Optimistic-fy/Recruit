import React from 'react'
import { connect } from 'react-redux'
import { NavBar, Icon, List, Button} from 'antd-mobile'
import { getCheckCity, getCheckRealCity} from '../../redux/chat.redux'
import { getCheckMainCity } from '../../redux/chartuser.redux'

@connect(
    state => state,
    { getCheckCity, getCheckRealCity, getCheckMainCity }
)

class CityCheck extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentIndex: '',
            currentCity: '全国',
            defaultCity: [
                {"name": "北京", code: '12321'},
                {"name": "上海", code: '12322'},
                {"name": "哈尔滨", code: '12323'}
            ]
        }
        
        this.handleGetSub = this.handleGetSub.bind(this)
        this.handleChangeAct = this.handleChangeAct.bind(this)
        this.handleCheckCity = this.handleCheckCity.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }
    componentDidMount(){
         this.props.getCheckCity()
    }
    handleGetSub(name, index){
        this.setState({
            currentIndex: index
        })
        this.props.getCheckRealCity(name)
    }
    handleChangeAct(){
        this.setState({
            currentIndex: ''
        })
    }
    handleCheckCity(name){
        let currpath = this.props.chat.currentpath
        this.props.getCheckMainCity(name)
        this.props.history.push(currpath)
        localStorage.setItem('currentCity', name)
    }
    handleBack(){
        let path = this.props.chat.currentpath
        this.props.history.push(path)
        const currentCity = localStorage.getItem('currentCity')
        this.props.getCheckMainCity(currentCity)
    }
    render(){
        const { cityList, hotCity, relCity } = this.props.chat
        return (
            <div className="cityCheck">
                <NavBar 
                    style={{background: '#fff'}}
                    mode="dark"
                    leftContent={
                        <Icon type="left" color={'#000'} />
                    }
                    onLeftClick = {this.handleBack}
                >
                    选择城市
                </NavBar>
                <div className="content">
                    <div className="left">
                        <ul>
                            <li className={this.state.currentIndex === '' ? 'active' : ''} onClick={this.handleChangeAct}>常用&热门</li>
                            {
                                cityList ? 
                                    cityList.map((v, index) => {
                                        return (
                                                 <li key={v.code} 
                                                     className={ this.state.currentIndex === index ? 'active' : ''}
                                                     onClick={() => this.handleGetSub(v.name, index)} 
                                                 >{v.name}</li>
                                            )
                                    }) : null
                            }
                        </ul>
                    </div>
                    <div className="right">
                    {
                        this.state.currentIndex === '' ?
                            <div>
                                <p>默认</p>
                                <ul>
                                    <li onClick={(e) => this.handleCheckCity(e.target.innerHTML)}>全国</li>
                                </ul>
                                <p>常用城市</p>
                                <ul>
                                {
                                    this.state.defaultCity.map(de => {
                                        return (
                                                <li key={de.code} onClick={() => this.handleCheckCity(de.name)}>{de.name}</li>
                                            )
                                    })
                                }
                                </ul>
                                <p style={{marginTop: 10}}>热门城市</p>
                                <ul>
                                    {
                                        hotCity ? 
                                            hotCity.map(v => {
                                                return (
                                                    <li key={v.code}  onClick={() => this.handleCheckCity(v.name)}>{v.name}</li>
                                                )
                                            }) : null
                                    }
                                </ul>
                            </div> : <div>
                                        <ul>
                                            {
                                                relCity ? 
                                                    relCity.map(val => {
                                                        return (
                                                            <li key={val.code}  onClick={() => this.handleCheckCity(val.name)}>{val.name}</li>
                                                        )
                                                    }) : null
                                            }
                                        </ul>
                                    </div>
                    }
                    </div>
                </div>
            </div>
            
        )
    }
}

export default CityCheck