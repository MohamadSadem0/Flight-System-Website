<?php
include "./connection.php";
$user_type = 0;
$months = array(
    1 => 'January',
    2 => 'February',
    3 => 'March',
    4 => 'April',
    5 => 'May',
    6 => 'June',
    7 => 'July',
    8 => 'August',
    9 => 'September',
    10 => 'October',
    11 => 'November',
    12 => 'December'
);
$user_query = $conn->prepare('select count(*) as totalUsers from users where type = ?');

$user_query->bind_param('i', $user_type);
$user_query->execute();

$user_result = $user_query->get_result();

$row = $user_result->fetch_assoc();
$response['totalUsers'] = $row['totalUsers'];

$books_query = $conn->prepare('select count(*) as totalBooks from bookings');
$books_query->execute();

$books_result = $books_query->get_result();

$row = $books_result->fetch_assoc();

$response['totalBooks'] = $row['totalBooks'];

$revene_query = $conn->prepare('select sum(base_price) as totalRevenes from flights');


$revene_query->execute();

$revene_result = $revene_query->get_result();

$row = $revene_result->fetch_assoc();

$response['totalRevenes'] = $row['totalRevenes'];

$nb_of_flighst_query = $conn->prepare('SELECT MONTH(departure_date) AS month, COUNT(*) AS num_flights 
        FROM flights 
        GROUP BY MONTH(departure_date)');
$nb_of_flighst_query->execute();
$nb_of_flighst_result = $nb_of_flighst_query->get_result();

if ($nb_of_flighst_query->affected_rows > 0) {
    while ($row = $nb_of_flighst_result->fetch_assoc()) {
        $months_flights[$months[$row['month']]] = $row['num_flights'];
    }
}
$response['flights_per_month'] =  $months_flights;
echo json_encode($response);
