import React from 'react'
import PropTypes from 'prop-types'
import { Card ,WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getClickCompany, getClickPerson } from '../../redux/chartuser.redux'

@withRouter
@connect(
    state => state,
    { getClickCompany, getClickPerson }
)
class UserCard extends React.Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleCompany = this.handleCompany.bind(this)
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)  //点击跳转到相应聊天界面
    }
    handleCompany(company, user, type){
        if(type === 'boss'){
            this.props.getClickCompany(company)
            this.props.history.push(`/companyInfo/${company}`)
        }else{
            this.props.getClickPerson(user)
            this.props.history.push(`/personInfo/${user}`)
        }
    }
    render(){
        return (
            <WingBlank className="usercard">
                {this.props.userList.map( v => (
                    // 用户有头像显示
                    v.avatar ? <Card key={v._id} className='header'>  
                        <Card.Header 
                            onClick={() => this.handleClick(v)}
                            title={v.user} 
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body  onClick={() => this.handleCompany(v.company, v.user, v.type)}>
                            {v.type === 'boss' ? <div>{v.company}</div> : null}
                            {v.type === 'boss' && v.workCity && v.expere &&  v.degree ? 
                                <div>
                                    <span style={{lineHeight: '25px',}} >{v.workCity}</span>
                                    <span style={{lineHeight: '25px',}} >{v.expere}</span>
                                    <span style={{lineHeight: '25px',}} >{v.degree}</span>
                                </div> : null
                            }
                            {v.wantarea ? <span>{v.wantarea}</span> : null}
                            {v.jobseek ? <span>{v.jobseek}</span> : null}
                            {v.type === 'genius' && v.degree ? <span style={{lineHeight: '25px',}} >{v.degree}</span> : null}
                        </Card.Body>
                    <Card.Footer content="薪资:" extra={<div style={{color:'#0aab99',fontWeight:'bold'}}>{v.wage}</div>} />
                    </Card> : null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard