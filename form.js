let http= require('http');
//引入http模块
let url= require('url');
// 引入url 模块
let mongoose= require('mongoose');
// 使用npm 下载Mongoose 模块 然后引用

mongoose.connect('mongodb://39.106.203.127/test');
let db= mongoose.connection;
db.on('open', ()=>{
   console.log('连接成功！')
})
//2. 新建Schema （表）
let Schema= mongoose.Schema;
//定义personSchema的字段（规则） 有点像构造函数的样子
let personSchema= new Schema({
   name: String,
   sex: String,
   age: Number,
   remarks: String
});
//3. 创建model（集合)
let personModel= mongoose.model('person', personSchema);

let server= http.createServer((request, response)=>{
  response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
  response.writeHead(200, {'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'});
 
  //拿到提交的数据
  let myURl= url.parse(request.url, true);//解析url
  let queryObj= myURl.query;//拿到解析后的url对象里的query  他里面是提交的数据
  //4. 创建一个Document(文档)
  let person= new personModel(queryObj)
  console.log(person)
 //5. 把创建的文档对象 塞进这个personModel集合当中  Document.prototype.save();

 person.save((err, data)=>{
   if(!err){
       console.log('保存成功！');
       response.end("success")
   }else{
       console.log('保存失败！')
   }
 })
});
server.listen(3000)

/*
推荐使用express来写后端操作数据库的
使用callback方法来写执行操作数据库增删改查的代码；
应该把所有的操作都解耦，把这些增加、查询、删除的方法拿出来分开放在外面：

  function addUser(data, callback){
  person.save((err,data)=>{
    if(!err){
        console.log('保存成功！');
        callback('保存成功！')
    }else{
        console.log('保存失败！')
    }
  })
 }

在server.js或者app.js中引入外部的功能文件 在app.js中只调用其方法：

 addUser(queryObj, function(d){
  response.end(d)
 })
 e.get('/addUser', function(data){})

*/ 