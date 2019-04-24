# NodeForm
Node写的表单提交到MongoDB数据库中    
## index.html
 ```
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>表单提交</title>
    <style>
        
        form{
            width: 200px;
            padding: 50px;
            margin-top: 20px;
            margin: 0 auto;
            border:1px #000 solid;
        }
    </style>
</head>
<body>
    <form action="http://127.0.0.1:8085" method="get">
    // 使用get方法 提交到本地
        <p>姓名：<input type="text" name=name></p>
        <p>年龄：<input type="text" name="age" id=""></p>
        <p>
            男 <input type="radio" name="sex" value="男">
            女 <input type="radio" name="sex" value="女">
        </p>
        <input type="submit" value="提交" id="">
    </form>
</body>
</html>
 ```
 
 ## form.js
 ```
let http= require('http');
//引入http模块
let url= require('url');
// 引入url 模块
let mongoose= require('mongoose');
// 使用npm 下载Mongoose 模块 然后引用

mongoose.connect('mongodb://localhost/m_data');
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
    age: Number
});
//3. 创建model（集合）
let personModel= mongoose.model('person', personSchema);
console.log('2')

let server= http.createServer((request, response)=>{
   response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
   response.end("<script>alert('提交成功！'); </script>")
   //拿到提交的数据
   let myURl= url.parse(request.url, true);//解析url
   let queryObj= myURl.query;//拿到解析后的url对象里的query  他里面是提交的数据
   //4. 创建一个Document(文档)
   let person= new personModel(queryObj)
   console.log(person)
  //5. 把创建的文档对象 塞进这个personModel集合当中  Document.prototype.save();
  person.save((err,data)=>{
    if(!err){
        console.log('保存成功！');
    }else{
        console.log('保存失败！')
    }
  })
});
server.listen(8085, '127.0.0.1')


 ```
 **start**
` node ./form.js`

[Mongoose 使用](http://www.cnblogs.com/zhongweiv/p/mongoose.html)
