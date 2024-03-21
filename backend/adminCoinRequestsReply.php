<?php
include('connection.php');


$coinRequestID=$_POST['coinRequest_id'];
$requestedValue=$_POST['requestedValue'];
$userID=$_POST['user_id'];
$status=$_POST['status'];
$done=1;



$query = $mysqli->prepare(
    "UPDATE `coin-requests` 
    SET   `status`=? 
    where id=?");
$query->bind_param("ii",  $done,$coinRequestID);



if($status==1){
$query2 = $mysqli->prepare(
    "UPDATE users 
    SET   balance=? 
    where id=?");
$query2->bind_param("ii", $requestedValue, $userID);

if($query2->execute() ){
    $response["status"] = "Balance Updated Successfully";
}else{
    $response["status"] = "Failed";
}

}else{

if($query->execute() ){
    $response["status"] = "Updated Successfully";
}else{
    $response["status"] = "Failed";
}
}
echo json_encode($response);
