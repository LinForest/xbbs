<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php 
	session_start();
	require "mysql_connect.php";
	if(@$_GET["action"]=="login"){ //加@后不会提示notice错误
		$username=$_POST["username"];
		$password=md5($_POST["password"]);
		$query="select * from user where username = '$username'and password ='$password'";//变量一定要加引号，否则出错
		@$autologin=$_POST["autologin"];//自动登录变量
		
		$rel=$mysqli->query($query);
		if(@$rel->num_rows>0){   //判断结果数是否大于0
			$row=$rel->fetch_assoc();  //取回结果数组			
			$_SESSION["username"]=$username;
			$_SESSION["userid"]=$row["id"];
			$_SESSION["islogin"]=true;  //为了以后验证方便
			//if($autologin){              //判断是否选择了下次自动登录
				setcookie("username",$username,time()+60*60*24*7);
				setcookie("password",$password,time()+3600);
				setcookie("islogin","1",time()+60*60*24*7);
				setcookie("userid",$row["id"],time()+60*60*24*7);
			//}
			header("Location:index.php"); //重定向
		}
		else{
			echo '<font color="red">用户名或密码错误</font>';
		}
	}
?>


<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>登录</title>
  <link rel="stylesheet" href="css/login.css" type="text/css">
 </head>

 <body>
   <div id="container">
	<div id="">
	    <center><h1>欢迎光临我做的分享社区</h1><center>
	</div>
	<p>
	    <?php //echo "sessionID为：".session_id();?>
	</p>
	<div id="form">
	    <table>
			<form method="post" action="login.php?action=login">
				<tr>
					<td>用户名：</td>
					<td><input type="text" name="username" value="<?php if(isset($_COOKIE['username']))
					echo $_COOKIE['username']?>"></td>
				</tr>
				<tr>
					<td>密码：</td>
					<td><input type="password" name="password" value=""></td>
				</tr>
				<tr>
					<td><input type="submit" value="登录"></td>
					<!-- <td><input type="checkbox" name="autologin" value="1">自动登录</td> -->  
					<td><input type="reset" value="重置"></td>
					<td><a href="register.php">注册</a></td>
			    </tr>
			</form>
		</table>
	</div>
	</div>
 </body>
</html>