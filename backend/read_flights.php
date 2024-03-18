<?php
include('connection.php');

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        $response = getAllFlights();
        echo json_encode($response);
        break;
    default:
        echo json_encode(["status"=>"something went wrong",]);
        break;
}


function getAllFlights(){
    global $mysqli;

    $query = $mysqli->prepare("SELECT f.id, f.departure_date, f.return_date, f.departure_time, 
    f.arrival_time, f.number_of_passengers, f.price, da.country AS departure_country, aa.country AS arrival_country
    FROM flights f
    INNER JOIN airports da ON f.departure_airport_id = da.id
    INNER JOIN airports aa ON f.arrival_airport_id = aa.id
    WHERE departure_airport_id = da.id AND f.arrival_airport_id = aa.id");
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();

    if($num_rows == 0) {
        $response["status"] = "No flights";
    } else {
        $flights = [];
        $query->bind_result($id, $departure_date, $return_date, $departure_time, $arrival_time, $num_passengers, $price, $departure_country, $arrival_country);
        while($query->fetch()){
            $flight = [
                'id' => $id,
                'departure_date' => $departure_date,
                'return_date' => $return_date,
                'departure_time' => $departure_time,
                'arrival_time' => $arrival_time,
                'num_passengers' => $num_passengers,
                'price' => $price,
                'departure_country' => $departure_country,
                'arrival_country' => $arrival_country
            ];

            $flights[] = $flight;
        }

        $response["status"] = "Success";
        $response["flights"] = $flights;
    }
    return $response;
}
