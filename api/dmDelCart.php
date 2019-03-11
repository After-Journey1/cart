<?php
    header("content-type:text/html;charset=utf-8");
    date_default_timezone_set('PRC'); //设置中国时区 
    $mysqli=new mysqli("localhost","root","root","yunbiao");
    $mysqli->set_charset("utf8");
    if($mysqli->connect_errno){
        die($mysqli->connect_error);
    }
    $goodsCode=$_GET["goodsCode"];
    $userId=$_GET["userId"];

    $sql="delete from cart2 where goodsCode =$goodsCode and  cart2.userId = {$userId}";
    $result=$mysqli->query($sql);
    if($result===TRUE){
        $sql2="select * from cart2 where cart2.userId = {$userId}";
        $result2=$mysqli->query($sql2);
        $all=0;
        while($row=$result2->fetch_assoc()){
            $all+=$row["goodsNum"];
        }
        $data=array("error"=>0,"length"=>$all);
    }else{
        $data["error"]=1;
    }
    echo json_encode($data);

    // header("content-type:text/html;charset=utf-8");
    // date_default_timezone_set('PRC'); //设置中国时区 
    // $mysqli=new mysqli("localhost","root","root","yunbiao");
    // // $id="3,4,7";
    // $id=$_GET["id"];
    // $mysqli->set_charset("utf8");
    // if($mysqli->connect_errno){
    //     die($mysqli->connect_error);
    // }
    // $sql="select * from car where Id in ($id)";
    // $result=$mysqli->query($sql);
    // if($result->num_rows>0){
    //     while($row=$result->fetch_assoc()){
    //         $list[]=$row;
    //     }
    //     $data=array("error"=>0,"list"=>$list);
    // }else{
    //     $data=array("error"=>1);
    // }
    // echo json_encode($data);
?>