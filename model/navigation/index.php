<?php
     $root = $_SERVER['DOCUMENT_ROOT'];
     $navigation = [];
     $navString = file_get_contents($root."/configs/navigation.json");
     header("Content-Type: application/json; charset=utf-8");
     echo $navString;
    
?>