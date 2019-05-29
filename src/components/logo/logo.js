import React from 'react'
import logoImg from '../../container/image/logo.png'
import './logo.less'

class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img className="logo-img" src={logoImg} alt="Logo" />
            </div>
        )
    }
}

export default Logo