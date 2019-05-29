import React from 'react'

class Alpha extends React.Component{
    constructor(props){
        super(props)

        this.handleClickLetter = this.handleClickLetter.bind(this)
    }
    handleClickLetter(letter){
        this.props.move(letter)
    }
    render(){
        const { letter } = this.props
        return (
            <div className="alpha">
                <ul>
                    {
                        letter ? 
                            letter.map(v => (
                                <li className="item" key={v.name} onClick={() => this.handleClickLetter(v.name)}>{v.name}</li>
                            )) : null
                    }
                </ul>
            </div>
        )
    }
}

export default Alpha