import React from 'react'
import { connect } from 'react-redux'
import { getUserList, getchooseCity } from '../../redux/chartuser.redux'
import UserCard from '../usercard/usercard'
import Banner from '../banner/banner'
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'

@connect(
    state => state.chatuser,
    { getUserList, getchooseCity }
)
class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data: []
        }
    }
    componentDidMount(){
        this.props.getUserList('boss')
        console.log('usercard', this.props.chooseCity)
        if(this.props.chooseCity === '' || this.props.chooseCity === '全国'){
            this.props.getUserList('boss')
        }else{
            this.props.getchooseCity('boss', this.props.chooseCity)
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

export default Genius