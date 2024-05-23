<?php
include "./connection.php";
$flight_id = $_POST['flight_id'];
$air_plane = $_POST['air_plane'];
$air_line = $_POST['air_line'];
$departure_airport = $_POST['departure_airport'];
$arrival_airport = $_POST['arrival_airport'];
$departure_date = $_POST['departure_date'];
$arrival_date = $_POST['arrival_date'];
$departure_time = $_POST['departure_time'];
$arrival_time = $_POST['arrival_time'];
$flight_status = $_POST['flight_status'];
$base_price = $_POST['base_price'];
$query = $conn->prepare('update flights set airplane_id = ?,airline_id = ?,departure_airport = ?,arrival_airport = ?,   departure_date = ?, arrival_date = ?, departure_time = ?, arrival_time = ?, base_price= ?,  flights_status= ? where flight_id = ?');
$query->bind_param('iissssssiii', $air_plane, $air_line, $departure_airport, $arrival_airport, $departure_date, $arrival_date, $departure_time, $arrival_time, $base_price, $flight_status, $flight_id);

if ($query->execute()) {
    $response['status'] = 'success';
    $response['message'] = "Flight updated successfully";
} else {
    $response['status'] = 'error';
    $response['message'] = "Something went wrong";
}
echo json_encode($response);
