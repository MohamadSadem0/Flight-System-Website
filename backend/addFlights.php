<?php
include "./connection.php";
$airplane_id = $_POST['airplane_id'];
$airline_id = $_POST['airline_id'];
$departure_airport = $_POST['departure_airport'];
$arrival_airport = $_POST['arrival_airport'];
$departure_date = $_POST['departure_date'];
$arrival_date = $_POST['arrival_date'];
$departure_time = $_POST['departure_time'];
$arrival_time = $_POST['arrival_time'];
$base_price = $_POST['base_price'];

$query = $conn->prepare('INSERT INTO flights 
(airplane_id, airline_id, departure_airport, arrival_airport, departure_date,
arrival_date, departure_time, arrival_time, base_price)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

$query->bind_param(
    'iisssssss',
    $airplane_id,
    $airline_id,
    $departure_airport,
    $arrival_airport,
    $departure_date,
    $arrival_date,
    $departure_time,
    $arrival_time,
    $base_price
);
if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = "Flight added successfully";
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
echo json_encode($response);