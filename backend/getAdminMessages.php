<?php
include "./connection.php";

$user_id = $_GET['user_id'];
$user_type = 1;

$query = $conn->prepare('select * from messages where user_id = ? and user_type = ?');

$query->bind_param('ii', $user_id, $user_type);

$query->execute();

$result = $query->get_result();

$messages = [];

while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}

echo json_encode($messages);
