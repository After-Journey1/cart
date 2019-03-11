<?php
    header("content-type:text/html;charset=utf-8");
    date_default_timezone_set('PRC'); //设置中国时区 
    $mysqli=new mysqli("localhost","root","root","yunbiao");

    $mysqli->set_charset("utf8");
    if($mysqli->connect_errno){
        die($mysqli->connect_error);
    }

// 将传过来的全部商品id转换成
    // $idList=json_decode($_GET["unloginCartList"],true);
    $idList=$_GET["unloginCartList"];
    $userId=$_GET["userId"];

    foreach($idList as $key=>$value){
        $add=0;
        $sql1="select * from cart2 where goodsCode=$key and cart2.userId = {$userId}";
        $result1=$mysqli->query($sql1);
        if($result1->num_rows>0){
            $row=$result1->fetch_assoc();
            $add=intval($value["goodsNum"],10)+intval($row["goodsNum"],10);
            $sql2="update cart2 set goodsNum=$add where goodsCode=$key and cart2.userId = {$userId}";
            $result2=$mysqli->query($sql2);
        }else{
            $sql3="insert into cart2(goodsCode,goodsNum,userId) values($key , {$value['goodsNum']} ,{$userId})";
            $result3=$mysqli->query($sql3);
        }
    }

    $sql="select * from list,cart2  where list.Id=cart2.goodsCode and cart2.userId = {$userId}";
    $result=$mysqli->query($sql);

    if($result->num_rows>0){
        $all=0;
        while($row=$result->fetch_assoc()){
            $all+=$row["goodsNum"];
            $list[$row["brand"]][$row["Id"]] = $row;
        }
        $data=array("error"=>0,"list"=>$list,"length"=>$all);
    }else{
        $data=array("error"=>1);
    }
    echo json_encode($data);
?>