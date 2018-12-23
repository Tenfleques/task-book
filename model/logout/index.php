<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    $success = false;
    if(isset($_POST["token"])){
        $token = sanitizeString($_POST["token"]);

        $success = queryMysql("UPDATE tendai_task_book.users
            SET hash=''
            WHERE hash='$token';")["r"];

    }
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["success" => $success],JSON_UNESCAPED_UNICODE);
    
?>