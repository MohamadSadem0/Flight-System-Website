<?php
include "./connection.php";
$response = [];
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = $conn->prepare('SELECT reviews.*, users.first_name, users.last_name 
                         FROM reviews 
                         INNER JOIN users ON reviews.user_id = users.user_id');
    $query->execute();
    $query->store_result();
    $query->bind_result(
        $review_id,
        $user_id,
        $flight_id,
        $rating,
        $review_text,
        $first_name,
        $last_name,
    );
    while ($query->fetch()) {
        $review = array(
            'review_id' => $review_id,
            'user_id' => $user_id,
            'flight_id' => $flight_id,
            'rating' => $rating,
            'review_text' => $review_text,
            'first_name' => $first_name,
            'last_name' => $last_name,
        );
        $response['reviews'][] = $review;
    }
    echo json_encode($response);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $flight_id = $_POST['flight_id'];
    $rating = $_POST['rating'];
    $review_text = $_POST['review_text'];
    $query = $conn->prepare('insert into reviews (user_id, flight_id, rating, review_text) values (?,?,?,?)');
    $query->bind_param('iiis', $user_id, $flight_id, $rating, $review_text);
    if ($query->execute()) {
        $response['status'] = 'success';
        $response['message'] = "Successfully added";
    } else {
        $response['status'] = 'error';
        $response['message'] = "Something went wrong";
    }
    echo json_encode($response);
}
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $review_id = $_GET['review_id'];
    $query = $conn->prepare('DELETE FROM reviews where review_id =?');
    $query->bind_param('i', $review_id);
    if ($query->execute()) {
        $response['status'] = 'success';
        $response['message'] = "Successfully deleted";
    } else {
        $response['status'] = 'error';
        $response['message'] = "Something went wrong";
    }
    echo json_encode($response);
}
