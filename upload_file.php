<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	  <title> 上传成功 </title>
  <meta http-equiv="Content-Type" content="text/html;charset=utf8">
  <meta http-equiv="Content-Language" content="zh-cn">	
</head>	
<body>
	
	<div id="" style="margin-bottom:8px;text-align:center;font-size:12px;color:#339933;"><span>图片上传成功</span><a href="deletepicture.php?delete=true&target='upload_target'">删除</a></div>

	<div id="">
	    
	
	<?php
		if ((($_FILES["file"]["type"] == "image/gif")
		|| ($_FILES["file"]["type"] == "image/jpeg")
		|| ($_FILES["file"]["type"] == "image/pjpeg"))
		&& ($_FILES["file"]["size"] < 200000))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "<font color='red'>"."Return Code: " . $_FILES["file"]["error"] . "</font><br />";
    }
  else
    {
   // echo "Upload: " . $_FILES["file"]["name"] . "<br />";
	//echo "Type: " . $_FILES["file"]["type"] . "<br />";
   // echo "Size: " . ceil(($_FILES["file"]["size"] / 1024)) . " Kb<br />";
   // echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

    if (file_exists("upload/" . $_FILES["file"]["name"]))
      {
      echo "<font color='red'>".$_FILES["file"]["name"] . " already exists. ". "</font><br />";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      //echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
	  $path="upload/".$_FILES["file"]["name"];
	  echo "<div style='margin:0px;padding:0px;width:100%;text-align:center;'>"."<img src='$path'/>"."</div>";
	 // echo "<script>window.top.window.stopUpload('');</script>";
      }
    }
  }
else
  {
  echo "Invalid file";
  }
	?>
</div>
</body>
</html>
