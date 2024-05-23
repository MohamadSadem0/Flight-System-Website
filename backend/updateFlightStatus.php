<?php
include "./connection.php";

$flight_id = $_GET['flight_id'];
$query = $conn->prepare('UPDATE bookings set payment_status = 1 where flight_id = ?');

$query->bind_param('i', $flight_id);

if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = "Successfully booked";
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
