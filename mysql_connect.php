<?php
	$host="localhost";
	$dbuser="root";
	$dbpass="000000";
	$dbname="mydesign";
	$mysqli=new mysqli($host,$dbuser,$dbpass,$dbname);
	if(mysqli_connect_errno()){
		printf("数据库连接失败：".mysqli_connect_errno());
		exit();
	}
?>