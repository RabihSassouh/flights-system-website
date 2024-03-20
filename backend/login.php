<?php
session_start();
include('connection.php');

use \Firebase\JWT\JWT;

$jwt_secret_key = "secret_key";

// debugging
var_dump($_POST);
if (isset($_POST['email'], $_POST['password'])) {
    $loginEmail = $_POST['email'];
    $password = $_POST['password'];

    $query = $mysqli->prepare('select *
from users
where email=?');
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
            $tokenId = base64_encode(random_bytes(32));
            $issuedAt = time();
            $notBefore = $issuedAt;
            $expire = $notBefore + 3600;
            $serverName = "localhost";

            $data = [
                'iat' => $issuedAt,
                'jti' => $tokenId,
                'iss' => $serverName,
                'nbf' => $notBefore,
                'exp' => $expire,
                'data' => [
                    'user_id' => $id,
                    'name' => $name,
                    'email' => $email,
                    'phone_number' => $phone_number,
                    'gender' => $gender,
                    'birth_date' => $birth_date,
                    'balance' => $balance,
                    'preferences' => $preferences
                ]
            ];

            $token = JWT::encode($data, $jwt_secret_key, 'HS256');

            $response['status'] = "logged in";
            $response['token'] = $token;
            $_SESSION['user_id'] = $id;
            $response['name'] = $name;
            $response['email'] = $email;
            $response['password'] = $hashed_password;
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