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
    foreach($idList as $key=>$value){
        $add=0;
        $sql1="select * from cartdm where Id=$key";
        $result1=$mysqli->query($sql1);
        if($result1->num_rows>0){
            $row=$result1->fetch_assoc();
            $add=intval($value["cnum"],10)+intval($row["cnum"],10);
            // print_r( $row) ;
            // echo $row['cnum'];
            // echo "dsfasfdf";
            $sql2="update cartdm set cnum=$add where Id=$key";
            $result2=$mysqli->query($sql2);
        }else{
            echo "aaaa";
            $sql3="insert into cartdm(Id,cnum) values($key , {$value['cnum']} )";
            $result3=$mysqli->query($sql3);
        }
    }

    $sql="select * from list,cartdm  where list.Id=cartdm.Id";
    $result=$mysqli->query($sql);

    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $list[$row["brand"]][$row["Id"]] = $row;
        }
        $data=array("error"=>0,"list"=>$list);
    }else{
        $data=array("error"=>1);
    }

    echo json_encode($data);
    // if($result->num_rows>0){
    //     while($row=$result->fetch_assoc()){
    //         $list[$row["dianpuid"]][$row["Id"]] = $row;
    //     }
    //     $data=array("error"=>0,"list"=>$list);
    // }else{
    //     $data=array("error"=>1);
    // }
    // echo json_encode($data);
        // $info=json_decode($_GET["unloginCartList"],true);
        // print_r($info["b"]) ;
?>