<?php
    header("content-type:text/html;charset=utf-8");
    date_default_timezone_set('PRC'); //设置中国时区 
    $mysqli=new mysqli("localhost","root","root","yunbiao");
    $mysqli->set_charset("utf8");
    if($mysqli->connect_errno){
        die($mysqli->connect_error);
    }
    $quantity=$_GET["quantity"];
    $userId=$_GET["userId"];
    $goodsCode=$_GET["goodsCode"];

    $sql="update cart2 set goodsNum=$quantity where goodsCode=$goodsCode and cart2.userId = {$userId}";
    $result=$mysqli->query($sql);

    if($result===TRUE){
        $data["error"]=0;
    }else{
        $data["error"]=1;
    }
    echo json_encode($data);

?>