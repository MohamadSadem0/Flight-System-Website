<?php
include "./connection.php";
$booking_id = $_POST['booking_id'];

$query = $conn->prepare('Delete from bookings where booking_id =?');
$query->bind_param('i', $booking_id);
if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = "Successfully deleted";
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
echo json_encode($response);
