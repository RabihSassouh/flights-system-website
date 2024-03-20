<?php
session_start();
include('connection.php');

// Debugging
// var_dump($_POST);

if (isset($_POST['email'], $_POST['password'])) {
    $loginEmail = $_POST['email'];
    $password = $_POST['password'];

    $query = $mysqli->prepare('SELECT * FROM users WHERE email=?');
    $query->bind_param('s', $loginEmail);
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows();
    
    if ($num_rows == 0) {
        $response['status'] = "user not found";
        $response['isLogged'] = false;
    } else {
        $query->bind_result($id, $name, $email, $hashed_password, $phone_number, $gender, $birth_date, $balance, $preferences);
        $query->fetch();
        
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            $response['status'] = "logged in";
            $response['name'] = $name;
            $response['email'] = $email;
            $response['phone-number'] = $phone_number;
            $response['gender'] = $gender;
            $response['birth-date'] = $birth_date;
            $response['balance'] = $balance;
            $response['preferences'] = $preferences;
            $response['isLogged'] = true;
        } else {
            $response['status'] = "incorrect credentials";
            $response['isLogged'] = false;
        }
    }
} else {
    $response['status'] = "error";
    $response['isLogged'] = false;
}
echo json_encode($response);
?>
