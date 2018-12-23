<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    
    if(isset($_POST["email"])){
        $email = sanitizeString($_POST["email"]);
        $username = sanitizeString($_POST["username"]);
        $text = sanitizeString($_POST["text"]);
        $id = sanitizeString($_POST["_id"]);
        if(!$id){
            $id = hash('md5', $email.$username.$text);
        }

        $query = "INSERT INTO tendai_task_book.tasks
        (username, details, email, finished, hashcode)
        VALUES('$username', '$text', '$email', '0', '$id') ON DUPLICATE KEY UPDATE details ='$text' ;";

        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["pass" => queryMysql($query)["r"]], JSON_UNESCAPED_UNICODE);
    }
    
?>