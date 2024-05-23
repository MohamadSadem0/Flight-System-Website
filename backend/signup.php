<?php

use Firebase\JWT\JWT;

include "./connection.php";
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$query = $conn->prepare('INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)');
$hashed_password =  password_hash($password, PASSWORD_DEFAULT);
$query->bind_param('ssss', $first_name, $last_name, $email, $hashed_password);

if ($query->execute()) {
    $user_query = $conn->prepare('select * from users where email =? and password = ?');
    $user_query->bind_param('ss', $email, $hashed_password);
    $user_query->execute();
    $user_result = $user_query->get_result();
    if ($user_result->num_rows > 0) {
        $row = $user_result->fetch_assoc();
        $user_type = $row['type'];
        $user_id = $row['user_id'];
        $token = array(
            'user_id' => $user_id,
            'user_type' => $user_type
        );
        $jwt = JWT::encode($token, $secret_key, $algorithm);
        $response['status'] = 'success';
        $response['message'] = "Successfully registered";
        $response['token'] = $jwt;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
echo json_encode($response);
