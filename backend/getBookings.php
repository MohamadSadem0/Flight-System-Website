<?php
include "./connection.php";

$query = $conn->prepare('SELECT b.*, u.first_name, u.last_name 
                         FROM bookings AS b 
                         JOIN users AS u ON b.user_id = u.user_id');

$query->execute();
$query->store_result();
$query->bind_result(
    $id,
    $user_id,
    $flight_id,
    $booking_date,
    $total_price,
    $payment_status,
    $first_name,
    $last_name
);
while ($query->fetch()) {
    $booking = [
        'id' => $id,
        'user_name' => $first_name . ' ' . $last_name,
        'flight_id' => $flight_id,
        'payment_status' => $payment_status,
        'booking_date' => $booking_date,
    ];
    $response['bookings'][] = $booking;
}

echo json_encode($response);
