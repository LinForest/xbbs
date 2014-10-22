
 <?php
include('mysql_connect.php');
include("functions.php");

if(isset($_POST['last_comment_time']))
{
$last_comment_time=$_POST['last_comment_time'];	//得到上一页最后一条消息的最后评论时间
$query="select * from posts where last_comment_time <'$last_comment_time' order by last_comment_time desc limit 10";	//通过比较最后评论时间，获取比上一页最后一条评论时间早的消息

$rel=$mysqli->query($query) or die("获取失败");

					$post_num=$rel->num_rows;
					$posts=array();
						while($row=$rel->fetch_assoc()){
							 //获取发布人信息
							$uid=$row["sender_id"];
							$postid=$row["id"];
							$last_comment_time=$row["last_comment_time"];
							$q=$mysqli->query("select * from user where id ='$uid'");
							$u=$q->fetch_assoc();
							$username=$u["username"];
							$post_timestamp=strtotime($row["send_time"]);?>
					<div class="postlist">
				    <table>
				    <tr>
						<td style="font-weight:bold;color:#003399"><?php echo $username;?></td>	<!-- 输出发布者 -->
						<td><?php echo TimeFormat($post_timestamp);?></td>	<!-- 输出发布时间 -->
						<td><?php if($row["comments_count"]>0){  //评论为0时不显示评论数
						echo "&nbsp;".$row["comments_count"]."条评论";}?></td>
				    </tr>
				    </table>
					<p id="postcontent"><?php echo $row["post_content"];?></p>   <!-- 输出消息内容 -->
					

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
										<p id="commentcontent"><?php echo $comm["comment_content"];?></p>	<!-- 输出评论内容 -->
									</div>
							<?php }}	?>				
						
									<!-- 评论文本输入框 -->
								<div id="sendcomment">
								  <form name="comment_form" method="post" action="sendcomment.php">
									<textarea name="comment_content" style="height:30px;width:330px;"></textarea>
									<input type="hidden" name="postid" value="<?php echo $postid;?>">
									<input type="submit" name="send" value="评论">
								  </form>
								</div>
								
				</div>
				<?php } ?>

<?php
}


?>

<?php
	
if($post_num==10){
   ?> 
 	   <div id="more"><a id="<?php echo $last_comment_time; ?>" class="load_more" href="#">more</a>  </div>
<?php
 }else {
    
    echo '<div id="more">
    <a id="end" class="load_more" href="#">No More Posts </a></div>';
    
 }

?>