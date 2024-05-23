<?php
include "./connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['user_id'])) {
        $id = intval($_GET['user_id']);
        $response = getMessages($id);
        echo json_encode($response);
    } else {
        $response = getMessages();
        echo json_encode($response);
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $message_text = $_POST['message_text'];
    $user_type = $_POST['user_type'];
    if ($user_id !== null && $message_text !== null) {
        createMessage($user_id, $message_text, $user_type);
    } else {
        $response['status'] = 'error';
        $response['message'] = 'User ID and message text are required';
        echo json_encode($response);
    }
}
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $message_id = $_GET['message_id'];
    $query = $conn->prepare('DELETE FROM messages where message_id = ?');
    $query->bind_param('i', $message_id);
    if ($query->execute()) {
        $response['status'] = 'success';
        $response['message'] = "Deleted successfully";
    } else {
        $response['status'] = 'error';
        $response['message'] = "Something went wrong";
    }
    echo json_encode($response);
}
function getMessages($userId = null)
{
    global $conn;

    $query = 'SELECT m.*, u.first_name, u.last_name FROM messages AS m JOIN users AS u ON m.user_id = u.user_id';


    if ($userId !== null) {
        $query .= ' WHERE m.user_id = ? and user_type = 0';
    } else {
        $query .= ' WHERE user_type = 0';
    }


    $stmt = $conn->prepare($query);

    if ($userId !== null) {
        $stmt->bind_param('i', $userId);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $messages = [];

    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    return $messages;
}
function createMessage($userId, $messageText, $userType = 0)
{
    global $conn;
    $insertMessage = $conn->prepare('INSERT INTO messages (message_text, user_id, user_type) VALUES (?, ?, ?)');
    $insertMessage->bind_param('sii', $messageText, $userId, $userType);
    $insertMessage->execute();

    if ($insertMessage->affected_rows > 0) {
        $response['status'] = 'success';
        $response['message'] = 'Message sent successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Something went wrong';
    }

    echo json_encode($response);
}
