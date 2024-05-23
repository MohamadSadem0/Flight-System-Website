<?php
include "./connection.php";
$flight_id = $_POST['flight_id'];

$query = $conn->prepare('Delete from flights where flight_id =?');
$query->bind_param('i', $flight_id);
if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = "Successfully deleted";
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
echo json_encode($response);
