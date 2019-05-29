const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')   //用于md5加密
const _filter = {'pwd': 0 ,'__v': 0}  //{'pwd': 0}   用于使pwd在请求后不显示在Network上

const Chat = model.getModel('chat')   //聊天
//清楚聊天数据
// Chat.remove({} ,function(e ,d){
// })

Router.get('/list' ,function(req ,res){
    // User.remove({} ,function(err ,doc){})   //删除所有信息
    const { type } = req.query
    User.find({type} ,function(err ,doc){
        return res.json({code: 0 ,data: doc})
    })
    // User.find({} ,function(err ,doc){
    //     return res.json(doc)
    // })
})

Router.post('/login' ,function(req ,res){
    const {user ,pwd} = req.body;    
    User.findOne({user ,pwd: md5Pwd(pwd)} ,_filter ,function(err ,doc){
        if(!doc){
            return res.json({code: 1 ,msg: '用户名或密码错误'})
        }
        res.cookie('userid', doc._id,  {maxAge: 1000*60*60*24})   //存入cookie
        return res.json({code: 0 ,data: doc})
    })
})

Router.post('/register' ,function(req ,res){
    const {user ,pwd ,type} = req.body
    User.findOne({user} ,function(err ,doc){
        if(doc){
            return res.json({code: 1 ,msg: '用户名已存在!'})
        }
        const userModel = new User({user ,type ,pwd: md5Pwd(pwd)})
        userModel.save(function(err ,doc){     //用于创建数据
            if(err){
                return res.json({code: 1, msg: '服务器错误'})
            }
            const {user ,type ,_id} = doc;
            res.cookie('userid', _id, {maxAge: 1000*60*60*24})    //存入cookie
            return res.json({code: 0 ,data: {user ,type ,_id}})
        })
    })
})

Router.get('/info' ,function(req , res){
    //用户有没有cookie
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code: 1})
    }
    User.findOne({_id: userid} , _filter, function(err ,doc){
        if(err){
            return res.json({code: 1 ,msg: '服务器错误'})     //失败
        }
        if(doc){
            return res.json({code: 0 ,data: doc})
        }
    })
})

Router.post('/update' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid ,body ,function(err ,doc){
        const data = Object.assign({} ,{   //将写入的信息和注册登录时的id 类型连接(assign)上
            user: doc.user,
            type: doc.type
        },body)
        return res.json({code: 0 ,data})
    })
})

Router.get('/getmsglist' ,function(req ,res){
    //获取用户所有信息
    const user = req.cookies.userid
    User.find({} ,function(err ,userdoc){   //获取id对应的用户名和头像
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or':[{from: user} ,{to: user}]} ,function(err ,doc){
            if(!err){
                return res.json({code: 0 ,msgs: doc ,users: users})
            }
        })
    })
})

//删除个别
Router.get('/deleteItem' ,function(req ,res){
    //获取用户所有信息
    const user = req.cookies.userid
    const { id } = req.query
    User.find({} ,function(err ,userdoc){   //获取id对应的用户名和头像
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user ,avatar: v.avatar}
        })
        Chat.deleteMany({'$or':[{from: id} ,{to: id}]} ,function(err ,dedoc){
            if(!err){
                Chat.find({'$or':[{from: user} ,{to: user}]} ,function(err ,doc){
                    if(!err){
                        return res.json({code: 0 ,msgs: doc ,users: users})
                    }
                })
            }
        })
    })
})

//修改信息的条数   点击进去之后去除消息未读的数量
Router.post('/readmsg' ,function(req ,res){
    const userid = req.cookies.userid
    const { from } = req.body
    Chat.updateMany({from, to: userid} ,{'$set': {read: true}} ,{'multi': true}, function(err ,doc){
        if(!err){   //nModified修改的行数(信息从 未读--》已读的消息数)
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})

//获取公司信息
Router.get('/companyInfo' ,function(req ,res){
    const { company } = req.query
    //获取用户所有信息
    User.find({company},function(err,doc){
        return res.json({code:0, data: doc})
    })
})

//获取个人信息
Router.get('/personInfo' ,function(req ,res){
    const { user } = req.query
    //获取用户所有信息
    User.find({user},function(err,doc){
        return res.json({code:0, data: doc})
    })
})

//搜索获得的userCard
Router.get('/search' ,function(req ,res){
    const { type } = req.query
    User.find({type} ,function(err ,doc){
        return res.json({code: 0 ,data: doc})
    })
})

//修改信息
//修改职位
Router.post('/updatecarrer' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    User.updateOne({_id: userid}, {"$set": {"title": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改学历
Router.post('/updatedegree' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    User.updateOne({_id: userid}, {"$set": {"degree": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改求职状态
Router.post('/updatejobseek' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    User.updateOne({_id: userid}, {"$set": {"jobseek": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改技能
Router.post('/updatedescription' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    User.updateOne({_id: userid}, {"$set": {"desc": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改工资
Router.post('/updatewage' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    let val
    if(body.length === 1){
        val = body[0]
    }else if(body.length === 2){
        val = `${body[0]} - ${body[1]}`
    }
    User.updateOne({_id: userid}, {"$set": {"wage": val}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改期望工作城市
Router.post('/updatecity' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    console.log('body', body)
    User.updateOne({_id: userid}, {"$set": {"wantarea": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改公司名称
Router.post('/updatecompany' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    console.log('body', body)
    User.updateOne({_id: userid}, {"$set": {"company": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改职位
Router.post('/updateposthold' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    console.log('body', body)
    User.updateOne({_id: userid}, {"$set": {"postHeld": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改基本信息
Router.post('/updatebasereq' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body
    const workCity = body.workCity
    const expere = body.expere
    const degree = body.degree
    User.updateOne({_id: userid}, {"$set": {"workCity": workCity, 'expere': expere, 'degree': degree}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改技能要求
Router.post('/updateskill' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    console.log('body', body)
    User.updateOne({_id: userid}, {"$set": {"skill": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})
//修改工作地址
Router.post('/updatearea' ,function(req ,res){
    const userid = req.cookies.userid;   //是否有cookie
    if(!userid){
        return res.dumps({code: 1})
    }
    const body = req.body.data
    console.log('body', body)
    User.updateOne({_id: userid}, {"$set": {"area": body}} ,function(err ,doc){
        if(!err){
            return res.json({code: 0 ,data: doc})
        }
        return res.json({code: 1 ,msg: '修改失败'})
    })
})

//城市筛选
Router.get('/filterlist' ,function(req ,res){
    const { type, city } = req.query
    if(type === 'boss'){
        User.find({type, workCity: city} ,function(err ,doc){
            return res.json({code: 0 ,data: doc})
        })
    }
    if(type === 'genius'){
        User.find({type, wantarea: city} ,function(err ,doc){
            return res.json({code: 0 ,data: doc})
        })
    }
})

function md5Pwd(pwd){
    const salt = 'jihskhuwku270938HIUH_hu~~'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router