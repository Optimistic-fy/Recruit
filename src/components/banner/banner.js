import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile'

class Banner extends React.Component{
    state = {
        data: ['1', '2'],
        imgHeight: 110,
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['1', '2'],
            });
        }, 100);
    }
    render(){
        return (
            <WingBlank>
                <Carousel
                    autoplay= {true}
                    infinite= {true}
                    slideWidth = {1}
                    dots= {true}
                >
                    {this.state.data.map((val,  index) => (
                        <img
                            src={require(`./img/${val}.png.jpg`)}
                            alt=""
                            key="index"
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    ))}
                </Carousel>
            </WingBlank>
        )
    }
}
export default Banner