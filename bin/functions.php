<?php 

$root = $_SERVER['DOCUMENT_ROOT'];

$settings = json_decode(file_get_contents($root."/configs/database.json"),true);
$dbcon = $settings["mysql"];
$mysqli = new mysqli($dbcon["host"], $dbcon["user"], $dbcon["password"], $dbcon["database"]);


function getTasks($accessToken = false){
    $tasks = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT']."/configs/sample.tasks.json"),JSON_UNESCAPED_UNICODE);
    if($accessToken){
        return json_encode($tasks,JSON_UNESCAPED_UNICODE);
    }
    $tasks = array_map(function($row){
        unset($row["_id"]);
        return $row;
    },$tasks);
    return json_encode($tasks,JSON_UNESCAPED_UNICODE);
}

function queryMysql($query){
	global $mysqli;
	$result = mysqli_query($mysqli,$query) or die(mysqli_error($mysqli));
	$r = $result;
	$l = $mysqli; 	
	return compact('r', 'l');
}
function sanitizeShow($text){
	$text=preg_replace('/&#039;/',"'",$text);
	$text=preg_replace('/&amp;quot;/','"',$text);
	//for <code></code>
	$text=preg_replace('/&lt;\/code&gt;/',"</code>",$text);
	$text=preg_replace('/&lt;code&gt;/',"<code>",$text);
	
	//for <br>
	$text=preg_replace('/&lt;br&gt;/',"<br>",$text);
		
	$text=preg_replace('/&amp;/',"&",$text);
	return $text;
	//return stripslashes(preg_replace('/\s\s+/',' ', $text));
}
function sanitizeString($var){
        global $mysqli;
        $var = strip_tags($var);
        $var = mb_convert_encoding($var, 'UTF-8', 'UTF-8');
        $var = htmlentities($var, ENT_QUOTES, 'UTF-8');
        $var = stripslashes($var);
        $var = mysqli_real_escape_string($mysqli,$var);
        return $var;
}
function makedirs($dirpath, $mode=0777) {
    return is_dir($dirpath) || mkdir($dirpath, $mode, true);
}
function saltise($var,$addsalt=""){
    $munyu1=$addsalt."4e5&*%$9dfc";
    $munyu2="dfc&*$#".$addsalt;
    return md5(sha1($munyu1.$var.$munyu2));
}
function shuffle_assoc($list) {
  if (!is_array($list)) return $list;

  $keys = array_keys($list);
  shuffle($keys);
  $random = array();
  foreach ($keys as $key) {
    $random[$key] = $list[$key];
  }
  return $random;
}
function getUserIP(){
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP)){
        $ip = $client;
    }elseif(filter_var($forward, FILTER_VALIDATE_IP)){
        $ip = $forward;
    }else{
        $ip = $remote;
    }
    return $ip;
}

function finishText($text){
    $text =preg_replace('/\s\s+/',' ', $text);
    return($text);
}
function getplaintextintrofromhtml($html, $numchars) {
    $html = strip_tags($html);
    $html = html_entity_decode($html, ENT_QUOTES, 'UTF-8');
    $html = mb_substr($html, 0, $numchars, 'UTF-8');
    $html .= "...";
    return $html;
}
?>