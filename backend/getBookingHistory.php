<?php

include "./connection.php";

$user_id = $_GET['user'];

if (!empty($user_id)) {
    $id = intval($user_id);
    $response = getBookingHistory($user_id);
    echo json_encode($response);
} else {
    echo json_encode($response);
}

function getBookingHistory($user_id) {
    global $conn; 
    $query = $conn->prepare("select b.* from bookings as b
join users as u on b.user_id = u.user_id
where b.payment_status=?");

    $query->bind_param("i", $user_id);
    $query->execute();
    $result = $query->get_result();

    $BookingHistory = [];
    while ($row = $result->fetch_assoc()) {
        $BookingHistory[] = $row;
    }

    return ["status" => "Success", "BookingHistory" => $BookingHistory];
}
?>