<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<?php
	session_start();
	require "mysql_connect.php";
	if(!@$_SESSION["islogin"]){
		echo "<script>window.location.href='login.php';</script>";
		exit();
	}
?>
<html>
 <head>
  <title> 欢迎光临爱琳舍 </title>
  <meta http-equiv="Content-Type" content="text/html;charset=uft8">
  <meta http-equiv="Content-Language" content="zh-cn">
  <meta name="Generator" content="">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <meta name="Coypright" content="">
  <link rel="stylesheet" href="css/index.css" type="text/css">
 </head>
 <body>
	<div id="container">
		<div id="header">
			<a href="logout.php">退出</a>
			<span class=""><?php echo $_SESSION["username"];?></span>
		</div>

		<div id="main">
		    <div id="sort">
		        
		    </div>
			<div id="mainbody">
			    <div id="sendpost">
			        <form method="post" action="sendpost.php">
						<textarea name="post_content" rows="5" cols="100"></textarea>
						<input type="hidden" name="senderid" value="$_SESSION['userid']">
						<input type="submit" name="send" value="发布">
			        </form>
			    </div>
				<!-- 获取消息列表 -->
				<?php 
					$query="select * from posts order by last_comment_time desc";
					$rel=$mysqli->query($query);
					$post_num=$rel->num_rows;
					$posts=array();
					if($post_num==0){
						echo "<p>没有内容</p>";
					}
					else{
						while($row=$rel->fetch_assoc()){
							 //获取发布人信息
							$uid=$row["sender_id"];
							$q=$mysqli->query("select * from user where id ='$uid'");
							$u=$q->fetch_assoc();
							$username=$u["username"];?>
				<div id="postlist">
				    <table>
				    <tr>
						<td style="font-weight:bold;color:#003399"><?php echo $username;?></td>	<!-- 输出发布者 -->
						<td><?php echo $row["send_time"];?></td>	<!-- 输出发布时间 -->
						<td><?php if($row["comments_count"]>0){  //评论为0时不显示评论数
						echo "&nbsp;".$row["comments_count"]."条评论";}?></td>
				    </tr>
				    </table>
					<p id="postcontent"><?php echo $row["post_content"];?></p>   <!-- 输出消息内容 -->
					

					<?php   //获取评论列表
							$postid=$row["id"];
							$qc=$mysqli->query("select * from comments where post_id = '$postid' order by comment_time desc");
							if($qc->num_rows>0){
								while($comm=$qc->fetch_assoc()){
									$commenterid=$comm["commenter_id"];
									$qco=$mysqli->query("select * from user where id = '$commenterid'");
									$qar=$qco->fetch_assoc();  //赋值后$qar为一维数组
									$commname=$qar["username"];
									?>
									<div id="commentlist">
									    <table style="font-size:13px">
									    <tr>
											<td style="font-weight:bold;color:#003399;font-size:13px"><?php echo $commname;?></td>	<!-- 输出评论者 -->
											<td><?php echo $comm["comment_time"];?></td>	<!-- 输出评论时间 -->
									    </tr>
									    </table>
										<p id="commentcontent"><?php echo $comm["comment_content"];?></p>	<!-- 输出评论内容 -->
									</div>
							<?php	}
							}	?>				
						
						
								<div id="sendcomment">
								  <form name="comment_form" method="post" action="sendcomment.php">
									<textarea name="comment_content" rows="2" cols="80"></textarea>
									<input type="hidden" name="postid" value="<?php echo $postid;?>">
									<input type="submit" name="send" value="评论">
								  </form>
								</div>
								
				</div>
				<?php }}?>
			</div>

			<div id="sidebar">
			    
			</div>
		</div>
		<div id="clear">		    
		</div>
		<div id="footer">
		    
		</div>
	</div>
 </body>
</html>
