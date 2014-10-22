<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
	/*获取表单信息，查找有无同名用户和邮箱，若没有，则创建用户并自动登录 */
	require "mysql_connect.php";
	session_start();
	if(@$_GET["action"]=="register"){
		@$username=addslashes($_POST['username']); 
		@$password=md5(addslashes($_POST["password"]));
		@$email=addslashes($_POST['email']);
		@$gender=addslashes($_POST['gender']);
		@$birthday=$_POST["year"]."-".$_POST["month"]."-".$_POST["day"];
		@$register_time=date('Y-m-d H:i:s');
		$userquery="select * from user where username = '$username'";
		$emailquery="select * from user where email = '$email'";
		$uquery=$mysqli->query($userquery);
		$usernum=$uquery->num_rows;                          //相同用户名结果数
		$equery=$mysqli->query($emailquery);
		$emailnum=$equery->num_rows;                          //相同邮箱结果数
		if($username!="" && $password!="" && $email!=""){      //判断表单是否为空

			if($usernum>0){
				echo '<font color="red">用户已存在</font>';
			}
			elseif($emailnum>0){
				echo '<font color="red">邮箱已被注册</font>';
			}
			else 
			{
				$query="insert into user (username,gender,birthday,password,email,register_time) values ('$username','$gender','$birthday','$password','$email','$register_time')";
				$result=$mysqli->query($query) or die("注册失败：".$mysqli->error);
					if($result){
						$query="select * from user where username = '$username'and password ='$password'";
						$rel=$mysqli->query($query);
						$row=$rel->fetch_assoc();  //取回结果数组			
						$_SESSION["username"]=$username;
						$_SESSION["userid"]=$row["id"];
						$_SESSION["islogin"]=true;  //为了以后验证方便
						echo '<font color="green">注册成功</font>';
						echo "<script>self.location = 'index.php';</script>";//注册成功后自动跳转到index页面
					}
			}
		}
		else{
			echo "表单不能为空";
		}
	}
?>
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link type="text/css" rel="stylesheet" href="css/index.css">
  <title>注册</title>
 </head>

 <body>
	<h1 align="center">用户注册</h1>
	<table align="center">
		<form method="post" action="register.php?action=register">
			<tr>
				<td>用户名：</td>
				<td><input type="text" name="username"></td>
			</tr>
			<tr>
				<td>性别：</td>
				<td><input type="radio" name="gender" value="男" checked="checked">男</td>
				<td><input type="radio" name="gender" value="女">女</td>
			</tr>
			<tr>
				<td>生日：</td>
				<td class="birthday"><input type="text" name="year" size="2" maxlength="4">年</td>
				<td class="birthday"><input type="text" name="month" size="1" maxlength="2">月</td>
				<td class="birthday"><input type="text" name="day" size="1" maxlength="1">日</td>
			</tr>
			<tr>
				<td>密码：</td>
				<td><input type="password" name="password"></td>
			</tr>
			<tr>
				<td>邮箱：</td>
				<td><input type="text" name="email"></td>
			</tr>
			<tr>
				<td><input type="submit" value="确定"></td>
				<td><input type="reset" value="重置"></td>
				<td><a href="login.php">已有账号</a></td>
			</tr> 
		</form>
	</table>
 </body>
</html>