<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    $res = ["success" => false, "token" => ""];

    if(isset($_POST["password"])){
        $password = sanitizeString($_POST["password"]);
        $username = sanitizeString($_POST["username"]);

        $query = queryMysql("SELECT `userid`, `username`, `password`, `hash`
        FROM tendai_task_book.users WHERE `username` = '$username';");

        $user = mysqli_fetch_assoc($query["r"]);
         
        if(password_verify($password, $user["password"])){
            $res["success"] = true;
            $token = hashPassword($username."-".time());

            queryMysql("UPDATE tendai_task_book.users
            SET hash='$token'
            WHERE username='$username';");

            $res["token"] = $token;
        }
    }
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>