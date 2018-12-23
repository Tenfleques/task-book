<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    $token  = false;
    if(isset($_POST["token"])){
        $token = sanitizeString($_POST["token"]);
    }
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(getTasks($token),JSON_UNESCAPED_UNICODE);
?>