<?php
    header('content-type:text/html;charset:="utf-8');
    
    //  var_dump($_POST);
   //定义一个统一的返回格式
   $responseData = array("code" => 0,"message" => "");
   
   //先将通过post提交的数据全部取出来
   $username = $_POST["username"];
   $password = $_POST["password"];
   $repassword = $_POST["repassword"];
   $createtime = $_POST["createtime"];
   
   //对后台接收到的数据，进行一个简单的判断
   if(!$username){
   	$responseData["code"] = 1;
   	$responseData["message"] = "用户名不能为空";
   	//将数据按照统一的返回格式返回
   	echo json_encode($responseData);
   	exit;
   }
   if(!$password){
   	$responseData["code"] = 2;
   	$responseData["message"] = "密码不能为空";
   	//将数据按照统一的返回格式返回
   	echo json_encode($responseData);
   	exit;
   }
   if($password != $repassword){
   	$responseData["code"] = 3;
   	$responseData["message"] = "两次输入密码不一致";
   	//将数据按照统一的返回格式返回
   	echo json_encode($responseData);
   	exit;
   }
   
   //链接数据库   判断用户名之前是否注册过
   //八个步骤   PHP7语法
   //链接数据库
   $link = mysql_connect("127.0.0.1","root","123456");
   
   //判断是否链接成功
      if(!$link){
      	echo "链接失败";
      	$responseData["code"] = 4;
    	$responseData["message"] = "服务器忙";
    	echo json_encode($responseData);
   	    exit;//终止后续所有的代码
     }
     
     //3.设置字符集
      mysql_set_charset("utf8");
   
    //4.选择数据库
      mysql_select_db("yyy");
      
      //5.准备sql   验证用户名是否重名
      $sql = "SELECT * FROM xiaomi WHERE username='{$username}'";
      //6.发送sql语句
      $res = mysql_query($sql);
      
      //7.取出一行数据
      $row = mysql_fetch_assoc($res);
      if($row){
      //用户名重名
      $responseData["code"] = 5;
      $responseData["message"] = "用户名重名";
      echo json_encode($responseData);
      exit;
      }
      
      //md5加密
      $str = md5(md5(md5($password)."zzz")."xxx");
      //准备sql  将数据插入到数据库中
      $sql1 = "INSERT INTO xiaomi(username,password,creatTime) VALUES('{$username}','{$str}',{$createtime})";
       //返回布尔值
      $res = mysql_query($sql1);
      if(!$res){
      	$responseData["code"] = 6;
    	$responseData["message"] = "注册失败";
    	echo json_encode($responseData);
      }else{
      	$responseData["message"] = "注册成功";
    	echo json_encode($responseData);
      }
      
      //关闭数据库
      mysql_close($link);
?>