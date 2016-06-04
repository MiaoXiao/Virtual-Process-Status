<?php

//column to pull from: can be all unique users or all unique timestamps
$column=$_GET["column"];

// sets up database, emits error and stops script if no database
require_once('../php/mysqli_connect.php');

$table = 'info';
$output = "";
$query = "";

$query = "SELECT DISTINCT $column 
		  FROM $table
		  ORDER BY $column";


// run the query
$result = mysqli_query($dbc, $query);

// concatenate result
while ($row = $result->fetch_assoc()) {
    $output = $output . $row[$column] . ";";
    //echo $row['pid']."<br>";
}

echo $output;

?>