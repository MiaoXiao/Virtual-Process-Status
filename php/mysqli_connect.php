<?php
	// Opens a connection to the database
	// Since it is a php file it won't open in a browser
	// It should be saved outside of the main web documents folder
	// and imported when needed

	DEFINE ('DB_USER', 'root');
	DEFINE ('DB_PASSWORD', 'Oroi?sh2');
	DEFINE ('DB_HOST', '127.0.0.1');
	DEFINE ('DB_NAME', 'cs183');
	 
	// $dbc will contain a resource link to the database
	// @ keeps the error from showing in the browser
	 
	$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
	OR die('Could not connect to MySQL bruh: ' .
	mysqli_connect_error());
?>