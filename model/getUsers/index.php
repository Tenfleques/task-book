<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    $users = getUsers();

    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($users,JSON_UNESCAPED_UNICODE);
?>