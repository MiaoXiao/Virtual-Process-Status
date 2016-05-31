<?php
// input: query
// output: string of numbers
// function: always get pid, control what column you want
// after: echo both strings
$column=$_GET["column"];
$userquery="nouser";
//echo $column;
//echo $userquery;
// parameters: column, user
// if no user, enter $userquery = 'nouser';

// sets up database, emits error and stops script if no database
require_once('../mysqli_connect.php');

// enter your own info here!!!
$con=mysqli_connect("localhost","root","4utoHeart","cs183");

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
$result = mysqli_query($con, $query);

// concatenate result
while ($row = $result->fetch_assoc()) {
    $output = $output . $row[$column] . " ";
    //echo $row['pid']."<br>";
}

//echoz "1 2 3 4";
echo $output;

?>