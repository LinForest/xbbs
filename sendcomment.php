<?php
	require "mysql_connect.php";
	session_start();
	$commentcontent=$_POST["comment_content"];
	//$commentcontents=str_replace("\n","<br />",$commentcontent); //将textarea中的\n换行符替换成<br />
	$search=array("<",">","\n");
	$replace=array("〈","〉","<br />");
	$commentcontents=str_replace($search,$replace,$commentcontent);
	$commentcontents=addslashes($commentcontents);
	$postid=$_POST["postid"];
	$senderid=$_SESSION["userid"];  //获取发布者id
	$sendtime=date("Y-m-d H:i:s");          //获取发布时间
	     if($commentcontent==''||$senderid==''){  
			 echo "<script>alert('内容不能为空');history.back();</script>";
			 }
		else{$query="insert into comments(comment_content,commenter_id,comment_time,post_id) values ('$commentcontents','$senderid','$sendtime','$postid')";
			
		$result=$mysqli->query($query) or die("评论失败：".$mysqli->error);
			
		 }
	
	if(@$result){
		$qr=$mysqli->query("select * from posts where id = '$postid'");
		$re=$qr->fetch_assoc();
		$comments_count=$re["comments_count"]+1;
		$mysqli->query("update posts set comments_count='$comments_count',last_comment_time='$sendtime' where id = '$postid'");
		echo "<script>location.href='index.php';</script>";
	}
	exit();
	$mysqli->close();
?>