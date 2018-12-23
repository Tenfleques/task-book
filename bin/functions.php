<?php 
session_start();
$root = $_SERVER['DOCUMENT_ROOT'];

$settings = json_decode(file_get_contents($root."/configs/database.json"),true);
$dbcon = $settings["mysql"];

$mysqli = new mysqli($dbcon["host"], $dbcon["user"], $dbcon["password"], $dbcon["database"], $dbcon["port"]);


function getTasks($accessToken = false){
    $sampleTasks = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT']."/configs/sample.tasks.json"),JSON_UNESCAPED_UNICODE);

    if(tokenValid($accessToken)){
        $query = queryMysql("SELECT username, email, details as `text`, finished, hashcode as `_id` FROM tendai_task_book.tasks ORDER BY taskid");
    }else{
        $query = queryMysql("SELECT username, email, details as `text`, finished FROM tendai_task_book.tasks ORDER BY taskid");
    }   
    $tasks = [];
    while($row = mysqli_fetch_assoc($query['r'])){
        $row["finished"] = ($row["finished"])? true : false;
        $tasks[] = $row;
    }       

    return $tasks;   
}
function updateTask($token, $finished, $hash){
    if(tokenValid($token)){
        $sql = "UPDATE tendai_task_book.tasks
        SET finished='$finished'
        WHERE hashcode='$hash';";
        return queryMysql($sql)["r"];
    }
    return false;
}

function tokenValid($token){
    if(strlen($token) < 10)
        return false;

    $query = queryMysql("SELECT `username`
        FROM tendai_task_book.users WHERE `hash` = '$token';");

    $i = 0;
    while($row = mysqli_fetch_assoc($query["r"])){
        if($row["username"])
            return true;
    };
    return false;
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
        //$var = mysqli_real_escape_string($mysqli,$var);
        return $var;
}
function hashPassword($pass){
    $options = [
        'cost' => 12,
    ];
    return password_hash($pass, PASSWORD_BCRYPT, $options);
}
function initUser(){
    $pass = hashPassword("123");
    $sql = "INSERT INTO tendai_task_book.users
    (username, password)
    VALUES('admin', '$pass') ON DUPLICATE KEY UPDATE hash=hash;";
    queryMysql($sql);
}
function getUsers(){
    $query = queryMysql("SELECT `username`
    FROM tendai_task_book.users WHERE 1;");
    $users = [];
    while($row = mysqli_fetch_assoc($query["r"])){
        $users[] = $row;
    }
    return $users;
}
?>