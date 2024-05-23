<?php

use Firebase\JWT\JWT;

include "./connection.php";
$email = $_POST['email'];
$password = $_POST['password'];

$query = $conn->prepare('select * from users where email =?');

$query->bind_param('s', $email);

$query->execute();

$result = $query->get_result();

$row = $result->fetch_assoc();

if ($result->num_rows > 0) {
    if (password_verify($password, $row['password'])) {
        $token = JWT::encode(
            array(
                "email" => $row['email'],
                "user_type" => $row['type'],
                "id" => $row['user_id']
            ),
            $secret_key,
            $algorithm
        );
        $response['status'] = "success";
        $response['message'] = "Login successful";
        $response['token'] = $token;
    } else {
        $response['status'] = "error";
        $response['message'] = "Invalid password";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid email";
}
echo json_encode($response);
