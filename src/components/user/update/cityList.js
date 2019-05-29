import React from 'react'
import { getCityClick } from '../../../redux/user.redux'
import { connect } from 'react-redux'
import Alpha from './alpha'
import Scroll from 'react-bscroll'
import Swiper from 'swiper/dist/js/swiper.js'

@connect(
    state => state,
    { getCityClick }
)

class CityList extends React.Component{
    constructor(props){
        super(props)
        
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    handleClick(city){
        this.props.getCityClick(city)
        this.props.closeDre()
    }
    scrollToAnchor(e){
        // 找到锚点
        if(e === 'Z'){
            var anchorElement = document.getElementById(e)
            // 如果对应id的锚点存在，就跳转到锚点
            anchorElement.scrollIntoView(false)
        }else if(e === '*'){
            var anchorElement = document.getElementById('all')
            // 如果对应id的锚点存在，就跳转到锚点
            anchorElement.scrollIntoView()
        }else{
            var anchorElement = document.getElementById(e)
            // 如果对应id的锚点存在，就跳转到锚点
            anchorElement.scrollIntoView()
        }
    }
    render(){
        const { letter, hotCity, subLevelModelList, wantarea, workCity } = this.props
        return (
            <div className="city">
                <div className="cityHeight">
                    <div className="cityList" >
                        <div style={{overflow:'hidden'}} id="all">
                            <p style={{color: '#000', padding:'10px 0'}}>当前所选城市</p>
                            {wantarea ? <span>{wantarea}</span> : <span>{workCity}</span>}
                        </div>
                        <div  style={{overflow:'hidden'}}>
                            <p  style={{color: '#000', padding:'10px 0'}}>热门城市</p>
                            {
                                hotCity ? 
                                    hotCity.map(v => (
                                        <span key={v.name}  onClick={() => this.handleClick(v.name)}>{v.name}</span>
                                    )) : null
                            }
                        </div>
                        <div style={{overflow:'hidden', margin:'5px 0'}}>
                            {
                                letter ? 
                                    letter.map(v => (
                                        <div key={v.name} style={{overflow:'hidden'}} id={v.name}>
                                            <div style={{overflow:'hidden'}}>
                                                { v.name === "*" || v.name === "I" || v.name === "O" || v.name === "U" || v.name === "V" ? null : <span className="letter">{v.name}</span>}
                                            </div>
                                            <div>
                                                {
                                                    subLevelModelList ? 
                                                        subLevelModelList.map(obj => (
                                                            obj.map(sub => (
                                                                sub.firstChar.toUpperCase() === v.name ?
                                                                    <span key={sub.code} onClick={() => this.handleClick(sub.name)}>{sub.name}</span>
                                                                    : null
                                                            ))
                                                        )) : null
                                                }
                                            </div>
                                        </div>
                                    )) : null
                            }
                        </div>
                    </div>
                </div>
                <Alpha move={this.scrollToAnchor.bind(this)} letter={letter}></Alpha>
            </div>
            
        )
    }
}

export default CityList