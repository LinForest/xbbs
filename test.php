<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<?php
	session_start();
	header("Content-Type:text/html;charset=utf8");
	require "mysql_connect.php";
	include("functions.php");
	if(!@$_SESSION["islogin"]){
		echo "<script>window.location.href='login.php';</script>";
		exit();
	}
?>
<html>
 <head>
  <title> 欢迎光临爱琳舍 </title>
  <meta http-equiv="Content-Type" content="text/html;charset=utf8">
  <meta http-equiv="Content-Language" content="zh-cn">
  <meta name="Generator" content="">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <meta name="Coypright" content="">
  <link rel="stylesheet" href="css/index.css" type="text/css">
  <script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
  <script type="text/javascript" src="js/ajax-require-more.js"></script>	<!-- ajax无刷新获取更多数据 -->
  <script type="text/javascript" src="js/add-textareaheight.js"></script>	<!-- 自动改变输入框高度以适应文字 -->
  <script type="text/javascript">	//无刷新上传图片
	/*function startUpload(){
		var spanObj=document.getElementById("info");
		spanObj.innerHTML="开始上传";
	}
	function stopUpload(responseText){
		var spanObj=document.getElementById("info");
		spanObj.innerHTML="上传成功";
		spanObj.innerHTML+=responseText;
		document.getElementById("target_upload").height=document.getElementById("target_upload").document.body.scrollHeight;
	}*/
	function SetIframeHeight(iframe) {	//upload_target iframe自适应高度脚本
          var iframeid = document.getElementById(iframe); //iframe id
          iframeid.height = "10px";	//先给一个初值,然后再长高。
          if (document.getElementById) {
             if (iframeid && !window.opera) {
                 if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight) {
                     iframeid.height = iframeid.contentDocument.body.offsetHeight;
                 } else if (iframeid.Document && iframeid.Document.body.scrollHeight) {
                     iframeid.height = iframeid.Document.body.scrollHeight;
                 }
              }
          }
     }
  </script>
  <script type="text/javascript">
	function click(){
		alert("ajkshg kjh");
	}
  </script>	<!-- 无刷新发布 -->
 </head>
 <body>
	<div id="container">
		<div id="header">
			<a href="logout.php">退出</a>
			<span class=""><?php echo $_SESSION["username"];?></span>
			<button type="button" id="button" onClick="click">点我有惊喜</button>
		</div>

		<div id="main">
		    <div id="sort"> <!-- 左边栏 -->
			
		    </div>
			<div id="mainbody">	<!-- 中间主体区 -->
			    <div id="sendpost">		<!-- 发布内容输入框 -->
			        <form method="post" action="sendpost.php" onSubmit="sendPost">
						<textarea id="posttext" name="post_content"></textarea>
						<textarea id="shadow"></textarea>
						<input type="hidden" name="senderid" value="$_SESSION['userid']">
						<!-- <input type="submit" name="send" value="发布" > -->
			        </form>
					<button type="button" onClick="sendPost()" name="发布">发布<button/>
					<p><span id="hint">提示：</span></p>	<!-- 对评论框的提示 -->
					<form action="upload_file.php" method="post" enctype="multipart/form-data" target="upload_target">
					<input type="file" name="file" id="file"/> 
					<input type="submit" name="submit" value="Submit" />
					</form>
					<iframe id="upload_target" name="upload_target" frameborder="0" scrolling="no"  onload="javascript:{SetIframeHeight('upload_target');}" src=""></iframe><br />
					
				</div>
			    

				<!-- onload="this.height=upload_target.document.body.scrollHeight" -->
				<!-- 获取消息列表 -->
				
				<?php 
					$query="select * from posts order by last_comment_time desc limit 20";	//获取前20条消息
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
							$postid=$row["id"];
							$last_comment_time=$row["last_comment_time"];
							$q=$mysqli->query("select * from user where id ='$uid'");
							$u=$q->fetch_assoc();
							$username=$u["username"];
							$post_timestamp=strtotime($row["send_time"]);	//返回发布时间时间戳
							?>
							

					<div class="postlist">
				    <table>
				    <tr>
						<td style="font-weight:bold;color:#003399"><?php echo $username;?></td>	<!-- 输出发布者 -->
						<td><?php echo TimeFormat($post_timestamp);?></td>	<!-- 输出发布时间 -->
						<td><?php if($row["comments_count"]>0){  //评论为0时不显示评论数
						echo "&nbsp;".$row["comments_count"]."条评论";}?></td>
				    </tr>
				    </table>
					<div id="postcontent"><?php echo $row["post_content"];?></div>   <!-- 输出消息内容 -->
					

					<?php   //获取评论列表
							$postid=$row["id"];
							$qc=$mysqli->query("select * from comments where post_id = '$postid' order by comment_time");
							if($qc->num_rows>0){
								while($comm=$qc->fetch_assoc()){
									$commenterid=$comm["commenter_id"];
									$qco=$mysqli->query("select * from user where id = '$commenterid'");
									$qar=$qco->fetch_assoc();  //赋值后$qar为一维数组
									$commname=$qar["username"];
									$comment_timestamp=strtotime($comm["comment_time"]);
									?>
									<div id="commentlist">
									    <table style="font-size:13px">
									    <tr>
											<td style="font-weight:bold;color:#003399;font-size:13px"><?php echo $commname;?></td>	<!-- 输出评论者 -->
											<td><?php echo TimeFormat($comment_timestamp);?></td>	<!-- 输出评论时间 -->
									    </tr>
									    </table>
										<div id="commentcontent"><?php echo $comm["comment_content"];?></div>	<!-- 输出评论内容 -->
									</div>
							<?php	}
							}	?>				
						
									<!-- 评论文本输入框 -->
								<div id="sendcomment">
								  <form name="comment_form" method="post" action="sendcomment.php">
									<textarea name="comment_content" style="height:30px;width:330px;"></textarea>
									<input type="hidden" name="postid" value="<?php echo $postid;?>">	<!-- 传递参数给sendcomment.php -->
									<input type="submit" name="send" value="评论">
								  </form>
								</div>
								
				</div>
				<?php }}?>
					<!-- 显示more -->
				<?php
				if($post_num==20){
				 ?> 
 				  <div id="more"><a id="<?php echo $last_comment_time; ?>" class="load_more" href="#">more</a>  </div>
				<?php
				 }else {
    
				  echo '<div id="more"><a id="end" class="load_more" href="#">No More Posts </a></div>';
    
					}?>

			</div>

			<div id="sidebar">
			    
			</div>
		</div>
		<div id="clear"></div>
		<div id="footer">
		    
		</div>
	</div>
 </body>
</html>
