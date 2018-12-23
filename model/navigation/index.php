<?php
     $root = $_SERVER['DOCUMENT_ROOT'];
     require_once($root."/bin/functions.php");

     $navs = json_decode(file_get_contents($root."/configs/navigation.json"),JSON_UNESCAPED_UNICODE);
     header("Content-Type: application/json; charset=utf-8");

     if(isset($_POST["token"])){
          $token = sanitizeString($_POST["token"]);
          $tv = tokenValid($token);
          if($tv){
               unset($navs[1]); //remove admin view
          }else{
               unset($navs[2]); //remove logout button
          }
          echo json_encode($navs, JSON_UNESCAPED_UNICODE);
     }else
          echo json_encode([], JSON_UNESCAPED_UNICODE);
    
?>