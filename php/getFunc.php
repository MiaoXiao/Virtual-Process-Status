<?php

//column to pull from
$column=$_GET["column"];
// if no user, enter $userquery = 'nouser';
$userquery="nouser";

// sets up database, emits error and stops script if no database
require_once('../php/mysqli_connect.php');

// enter your own info here!!!
//$con=mysqli_connect("localhost","root","4utoHeart","cs183");

$table = 'info';
$output = "";
$query = "";

if ($userquery == 'nouser')
{
	$query = "SELECT * FROM $table
			  ORDER BY timestamp DESC";
}
else 
{
	$query = "SELECT * FROM $table
		 WHERE user='$userquery'
		 ORDER BY timestamp DESC";

}


// run the query
$result = mysqli_query($dbc, $query);

// concatenate result
while ($row = $result->fetch_assoc()) {
    $output = $output . $row[$column] . " ";
    //echo $row['pid']."<br>";
}

//echoz "1 2 3 4";
echo $output;

?>