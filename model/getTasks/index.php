<?php
    require_once($_SERVER['DOCUMENT_ROOT']."/bin/functions.php");
    
    if(isset($_POST["token"])){
        
    }

    header("Content-Type: application/json; charset=utf-8");
    echo getTasks();
?>