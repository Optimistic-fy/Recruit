import React from 'react'
import { Grid ,List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
    static propTypes = {   //属性检测
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        // 存储并得到图片
        const avatarList = '头像1,头像2,头像3,头像4,头像5,头像6,头像7,头像8,头像9,头像10,头像11,头像12,头像13,头像14,头像15,头像16,头像17,头像18,头像19,头像20'
                            .split(',')
                            .map(v => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))
        //得到已经选择的头像
        const gridHeaedr = this.state.icon ? 
                            (<div>
                                <span>已选择头像:</span>&nbsp;&nbsp;&nbsp;
                                <img style={{width:30}} src={this.state.icon} alt={this.state.text} />
                            </div>)
                            : '请选择头像'
        return (
            <div>
                {/* 将已选择的头像渲染到顶端renderHeader */}
                <List renderHeader={ () => gridHeaedr}>   
                    <Grid data={avatarList} 
                        columnNum={5} 
                        onClick={e => {
                            this.setState(e)
                            this.props.selectAvatar(e.text)
                        }}/>
                </List>
            </div>
        )
    }
}

export default AvatarSelector