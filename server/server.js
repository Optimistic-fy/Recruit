const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

//绑定server和socket.io(用于聊天时数据传递)
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')   //聊天

io.on('connection' ,function(socket){
    socket.on('sendmsg' ,function(data){  //用当前这次来传递
        //发送给全局
        // io.emit('recvmsg' ,data)
        //使聊天id唯一  不会因为发送方互换之后出错
        // console.log('data',data)
        console.log('data', data)
        const {from ,to ,msg} = data
        const create_time = Date.now()
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, create_time, content: msg} ,function(err ,doc){
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})

///////////////////////////////////////
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user' , userRouter)  //开启一个中间件


server.listen(3030 , function(){
    console.log('Node app start at port 3030')
})