<?php

include('connection.php');

use \Firebase\JWT\JWT;

$jwt_secret_key = "secret_key";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['name'], $_POST['email'], $_POST['password'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $check_email = $mysqli->prepare('select email from users where email=?');
        $check_email->bind_param('s', $email);
        $check_email->execute();
        $check_email->store_result();
        $email_exists = $check_email->num_rows();


        if ($email_exists == 0) {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);
            $query = $mysqli->prepare('insert into users(name,email,password,phonenumber,gender,birthdate,preferences) values(?,?,?,?,?,?,?);');
            $query->bind_param('sssssss', $name, $email, $hashed_password,$phonenumber,$gender,$birthdate,$preferences);
            $query->execute();

            // Generate JWT token
            $tokenId = base64_encode(random_bytes(32));
            $issueAt = time();
            $notBefore = $issueAt;
            // expire after one hour
            $expire = $notBefore + 3600;
            $serverName = "localhost";

            //token payload
            $data = [
                'iat' => $issueAt,
                'jti' => $tokenId,
                'iss' => $serverName,
                'nbf' => $notBefore,
                'exp' => $expire,
                'data' => [
                    'userName' => $name,
                    'userEmail' => $email,
                    'phone-number' => $phonenumber,
                    'gender' => $gender,
                    'birth-date' => $birthdate,
                    'preferences' => $preferences
                ]
            ];

            //encode payload
            $token = JWT::encode($data, $jwt_secret_key, 'HS256');

            $response['status'] = "success";
            $response['message'] = "user $name was created successfully";
            $response['token'] = $token;
        } else {
            $response["status"] = "user already exists";
            $response["message"] = "user $name wasn't created";
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