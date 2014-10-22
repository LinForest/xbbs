<?php
	require "mysql_connect.php";
	session_start();
	$postcontent=trim($_POST['post_content']);	//删除收尾空白字符
	$search=array("<",">","\n");	//需要被替换的字符
	$replace=array("〈","〉","<br />");	//替换为字符
	//$postcontents=htmlentities($postcontent);	//将html原格式输出，在这地方保存数据到数据库时容易出错，显示也不友好
	$postcontents=str_replace($search,$replace,$postcontent);

	$postcontents=addslashes($postcontents); //在单引号（'）、双引号（"）、反斜线（\）与 NUL（NULL 字符）等字符前加反斜线\
	$senderid=$_SESSION["userid"];  //获取发布者id
	$sendtime=date("Y-m-d H:i:s");          //获取发布时间，将当前时间格式化
	     if($postcontents==''||$senderid==''){  
			 echo "<script>alert('内容不能为空');history.back();</script>";
			 }
		elseif(strlen("$postcontents")>5000){
			echo "<script>alert('字数不得大于5000');history.back();</script>";
		}
		else{$query="insert into posts(post_content,sender_id,send_time,last_comment_time) values ('$postcontents','$senderid','$sendtime','$sendtime')";
		$result=$mysqli->query($query) or die("发布失败：".$mysqli->error);
		 }
	
	if(@$result){

		$qr=$mysqli->query("select * from user where id = '$senderid'");
		$re=$qr->fetch_assoc();
		$posts_count=$re["posts_count"]+1;
		$mysqli->query("update user set posts_count='$posts_count' where id = '$senderid'");
		echo "<script>location.href='index.php';</script>";
	}
	exit();
	$mysqli->close();
?>