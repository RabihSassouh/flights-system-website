<?php 

include ("connection.php");

$query=$mysqli->prepare(
    "SELECT airports.name
    FROM airports
    ");

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$query->bind_result($name);

if($num_rows==0){
    $response["status"] = "No Air-portsd Found";
}else{
    $response["status"] = "Success";
    $airports=[];
    while($query->fetch()){
        $airport= [
        "name" => $name,   
    ];
    $airports[]=$airport;
    }
    $response["airports"] = $airports;

}

echo json_encode($response);