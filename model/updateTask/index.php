<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    
    if(isset($_POST["token"])){
        $token = sanitizeString($_POST["token"]);
        $finished = sanitizeString($_POST["finished"]);
        $hash = sanitizeString($_POST["target"]);

        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["update" => updateTask($token, $finished, $hash)], JSON_UNESCAPED_UNICODE);
    }
?>