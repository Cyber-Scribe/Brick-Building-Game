<?php

//GET DATA FROM JSON

$nameJSON = file_get_contents('php://input');
$json = json_decode($nameJSON, true);
$name = $first = array_shift($json);
$score = $first = array_shift($json);

//SAVE STUFF TO DB

$conn = new mysqli('localhost', 'fakeUserName', 'fakePassword', 'fakeDatabase');
$query =  mysqli_query($conn, "INSERT INTO fakeTable (name,score) VALUES ('$name','$score');");

//GET DATA

$result = mysqli_query($conn, "SELECT * FROM fakeTable ORDER BY score");
$data = array();
while ($row = mysqli_fetch_object($result))
{
    array_unshift($data, $row);
};

//GET LAST 10 OBJECTS IN ARRAY

$new = array_slice($data, 0, 10, true);

//ECHO DATA

echo json_encode($new);

exit();

?>