<?php
include('connection.php');


$messageID=$_POST['message_id'];
$adminResponse=$_POST['adminResponse'];


$query = $mysqli->prepare("UPDATE messages SET response = ? where id=?");
$query->bind_param("si", $adminResponse, $messageID);


if($query->execute()){
    $response["status"] = "Deleted Successfully";
}else{
    $response["status"] = "Failed";
}

echo json_encode($response);