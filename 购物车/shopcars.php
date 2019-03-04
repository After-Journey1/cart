<?php
    include('dbconn.php');
    $img = $_GET['img'];
    $name = $_GET['name'];
    $price = $_GET['price'];
    $sql = "insert into shopcars(img,name,price,count) values('{$img}','{$name}','{$price}',1)";
    $result = $conn->query($sql);
    if($conn->affected_rows){
        echo 'true';
    }else{
        echo 'false';
    }
?>
