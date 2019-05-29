import React from 'react'
import { connect } from 'react-redux'
import { getUserList, getchooseCity } from '../../redux/chartuser.redux'
import UserCard from '../usercard/usercard';
import Banner from '../banner/banner'
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'

@connect(
    state => state.chatuser,
    { getUserList, getchooseCity }
)
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius')
        if(this.props.chooseCity === '' || this.props.chooseCity === '全国'){
            this.props.getUserList('genius')
        }else{
            this.props.getchooseCity('genius', this.props.chooseCity)
        }
    }
    render(){
        const { userList } = this.props
        return (
            <div>
                <Scroll click={true}>
                    <Banner />
                    {userList ? <UserCard userList={userList} /> : null}
                </Scroll>
            </div>
        )
    }
}

export default Boss