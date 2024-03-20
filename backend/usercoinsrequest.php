<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['coins'])) {
        $coins = $_POST['coins'];

        $query = $mysqli->prepare('INSERT INTO coin_requests (user_id, amount) VALUES (?, ?)');
        $userId = 1; // we should replace this with actual userId
        $query->bind_param('ii', $userId, $coins);
        $query->execute();

        if ($query->affected_rows > 0) {
            $response['status'] = "success";
            $response['message'] = "Coins request submitted successfully";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to submit coins request";
        }
    } else {
        $response['status'] = "error";
        $response['message'] = "Incomplete data received";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid request method";
}

echo json_encode($response);
?>
