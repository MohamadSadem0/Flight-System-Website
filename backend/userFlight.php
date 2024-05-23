<?php

include "./connection.php";



$user_id = $_GET['id'];

if (!empty($user_id)) {
    $id = intval($user_id);
    $response = getflights($user_id);
    echo json_encode($response);
} else {
    echo json_encode($response);
}

function getflights($user_id)
{
    global $conn;
    $query = $conn->prepare("SELECT f.* FROM flights AS f
        JOIN bookings AS b ON f.flight_id = b.flight_id 
        JOIN users AS u ON b.user_id = u.user_id
        WHERE u.user_id = ? and b.payment_status = 1");

    $query->bind_param("i", $user_id);
    $query->execute();
    $result = $query->get_result();

    $flights = [];
    while ($row = $result->fetch_assoc()) {
        $flights[] = $row;
    }

    return ["status" => "Success", "flights" => $flights];
}
