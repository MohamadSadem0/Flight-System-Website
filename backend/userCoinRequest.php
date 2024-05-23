<?php
include "./connection.php";
$user_id = $_GET['user_id'];
$new_amount = $_GET['new_amount'];
$query = $conn->prepare('UPDATE coinrequests set SUM(amount) = SUM(amount) -  ? where user_id = ?');
$query->bind_param('ii',$new_amount,$user_id);

if ($query->execute()) {
    $response['status'] = 'Success';
    $response['message'] = "Updated successfully";
}else{
    $response['status'] = 'Error';
    $response['message'] = "Something went wrong";
}