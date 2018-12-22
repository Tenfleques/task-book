<?php
    $root = $_SERVER['DOCUMENT_ROOT'];
    $appDetails = [];
    $detailsString = file_get_contents($root."/configs/sample.tasks.json");
    header("Content-Type: application/json; charset=utf-8");
    echo $detailsString;
    //echo json_encode($detailsString,JSON_UNESCAPED_UNICODE);
?>