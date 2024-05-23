<?php
include('connection.php');

if (isset($_GET['departure_airport']) && isset($_GET['departure_date']) && isset($_GET['arrival_date'])) {
    $departure_airport = $_GET['departure_airport'];
    $departure_date = $_GET['departure_date'];
    $arrival_date = $_GET['arrival_date'];

    $query = $conn->prepare("SELECT * FROM flights WHERE departure_airport = ? AND departure_date = ? AND arrival_date = ?");
    $query->bind_param('sss', $departure_airport, $departure_date, $arrival_date);
    $query->execute();
    $result = $query->get_result();

    $flights = array();
    while ($row = $result->fetch_assoc()) {
        $flights[] = $row;
    }

    echo json_encode($flights);
} else {
    $response = array("error" => "Missing parameters");

    echo json_encode($response);
}

$conn->close();
