//操作数据库看成数据模型的概念
const mongoose = require('mongoose')

//链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'   //给出链接
mongoose.connect(DB_URL ,{ useNewUrlParser: true })                           //连接
mongoose.connection.on('connected',function(){     //判断是否连接成功
    console.log('mongo connect success')
}) 

const models = {
    user: {
        'user': {'type': String ,'require': true},
        'pwd': {'type': String ,'require': true},
        'type': {'type': String ,'require': true},
        //头像
        'avatar': {'type': String ,'require': true},
        //个人技能/公司要求职位技能
        'desc': {'type': String ,'require': true},
        // 职位名
        'title':{'type':String ,'require': true},
        //学历
        'degree':{'type': String ,'require': true},
        //公司薪资  /  期望薪资
        'wage': {'type': String ,'require': true},
    

        //如果是boss
        'company': {'type': String ,'require': true},
        //基本要求  如(公司位于的城市、经验要求、学历要求)
        'workCity': {'type': String ,'require': true},
        'expere': {'type': String ,'require': true},
        //担任的职位
        'postHeld': {'type': String ,'require': true},
        //技能要求  如：javascript、node
        'skill':{'type': String ,'require': true} ,
        //具体工作地点
        'area':{'type': String ,'require': true},

         //个人
        //期望工作地点
        'wantarea': {'type': String ,'require': true},
        //求职状态
        'jobseek': {'type': String ,'require': true},
    },
    chat: {
        //谁发给谁
        'chatid':{'type': String ,'require': true},
        //聊天信息从哪里来
        'from': {'type': String ,'require':true },
        //发给谁
        'to': {'type': String ,'require':true },
        //是否读过
        'read': {'type': Boolean ,'default': false},
        //发送的内容
        'content': {'type': String ,'require':true ,'default': ''},
        //时间排序
        'create_time': {'type': Number }
    }
}
//创建相应表
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
} 