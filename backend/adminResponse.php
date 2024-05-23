<?php
include "./connection.php";

$user_id = $_POST['user_id'];
$message_text = $_POST['message_text'];

$query = $conn->prepare('INSERT INTO response (user_id, response_content) VALUES (?,?)');

$query->bind_param('is', $user_id, $message_text);
if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = "Response sent successfully";
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
echo json_encode($response);
