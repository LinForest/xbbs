<?php
	/*返回某一时间点距现在的时间间隔，友好显示，参数为时间戳，返回值如"3分钟前"*/
	function TimeFormat($timestamp){
		$curTime = time();
		$space = $curTime - $timestamp;
		//1分钟
		if($space < 30){
			$string = "刚刚";
			return $string;
		}
		elseif($space < 60)
		{
			$string = $space."秒前";
			return $string;
		}
		elseif($space < 3600) //一小时前
		{
			$string = floor($space / 60) . "分钟前";
			return $string;
		}
		$curtimeArray = getdate($curTime);
		$timeArray = getDate($timestamp);
		if($curtimeArray['year'] == $timeArray['year'])
		{
			if($curtimeArray['yday'] == $timeArray['yday'])
			{
				$format = "%H:%M";
				$string = strftime($format, $timestamp);
				return "今天 {$string}";
			}
			elseif(($curtimeArray['yday'] - 1) == $timeArray['yday'])
			{
				$format = "%H:%M";
				$string = strftime($format, $timestamp);
				return "昨天 {$string}";
			}
			else
			{
				$string = sprintf("%d.%d %02d:%02d", $timeArray['mon'], $timeArray['mday'], $timeArray['hours'], 
				$timeArray['minutes']);
			return $string;
			}
		}
		$string = sprintf("%d.%d.%d %02d:%02d", $timeArray['year'], $timeArray['mon'], $timeArray['mday'], 
		$timeArray['hours'], $timeArray['minutes']);
		return $string;
	}
?>