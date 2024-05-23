<?php
include "./connection.php";

$query = $conn->prepare('select * from flights');

$query->execute();
$query->store_result();
$query->bind_result(
    $id,
    $airplane_id,
    $airline_id,
    $departure_airport,
    $arrival_airport,
    $departure_date,
    $arrival_date,
    $departure_time,
    $arrival_time,
    $base_price,
    $flight_status
);
while ($query->fetch()) {
    $flight = [
        'id' => $id,
        'airplane_id' => $airplane_id,
        'airline_id' => $airline_id,
        'departure_airport' => $departure_airport,
        'arrival_airport' => $arrival_airport,
        'departure_date' => $departure_date,
        'arrival_date' => $arrival_date,
        'departure_time' => $departure_time,
        'arrival_time' => $arrival_time,
        'flight_status' => $flight_status,
        'base_price' => $base_price
    ];
    $response['flights'][] = $flight;
}
$query_airplane = $conn->prepare('select * from airplanes');
$query_airplane->execute();
$query_airplane->store_result();
$query_airplane->bind_result($id, $name, $capacity);
while ($query_airplane->fetch()) {
    $airplane = [
        'id' => $id,
        'name' => $name,
        'capacity' => $capacity
    ];
    $response['airplanes'][] = $airplane;
}
$query_airline = $conn->prepare('select * from airlines');
$query_airline->execute();
$query_airline->store_result();
$query_airline->bind_result($id, $name);

while ($query_airline->fetch()) {
    $airline = [
        'id' => $id,
        'name' => $name
    ];
    $response['airlines'][] = $airline;
}
echo json_encode($response);
