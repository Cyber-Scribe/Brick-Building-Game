<?php

//CONNECT TO DB

$conn = new mysqli('localhost', 'fakeUserName', 'fakePassword', 'fakeDatabase');
$result = mysqli_query($conn, "SELECT * FROM fakeTable ORDER BY score");

//GET DATA

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