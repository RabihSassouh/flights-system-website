<?php
include('connection.php');

$query=$mysqli->prepare("SELECT SUM(`amount-paid`) AS revenue FROM bookings");
$query->execute();
$query->bind_result($revenue);
$query->fetch();
$response["result"] =  $revenue;
echo json_encode($response);