<html>
<head>
<title>Insert></title>
</head>
<body>


<?php
	require_once('./mysqli_connect.php');

	exec('/usr/bin/perl ./grabline.pl', $result);
	$size = sizeof($result);
	
	foreach($result as $res) {
	//for($i = 0; $i < $size; $i++){
		echo $res;
		$data_missing = array();
		$corrected = array();

		if(empty($res){
			$data_missing[] = 'ps info';
		}
		else{
			$row = trim($res);
			$pieces = explode(" ", $row);
			foreach ($pieces as $piece){
				$piece = preg_replace('/\s+/', '', $piece);
				if(empty($piece)){
					unset($piece);
				}
				else{
					$corrected[] = $piece;
				}
			}
		}

		if(empty($corrected[0])){
			$data_missing[] = 'user';
		}
		if(empty($corrected[1])){
			$data_missing[] = 'pid';
		}
		if(empty($corrected[2])){
			$data_missing[] = 'cpu';
		}
		if(empty($corrected[3])){
			$data_missing[] = 'float';
		}
		if(empty($corrected[4])){
			$data_missing[] = 'mem';
		}
		if(empty($corrected[5])){
			$data_missing[] = 'vsz';
		}
		if(empty($corrected[6])){
			$data_missing[] = 'rss';
		}
		if(empty($corrected[7])){
			$data_missing[] = 'tt';
		}
		if(empty($corrected[8])){
			$data_missing[] = 'started';
		}
		if(empty($corrected[9])){
			$data_missing[] = 'time';
		}
		if(empty($corrected[10])){
			$data_missing[] = 'command';
		}


		if(empty($data_missing)){

			//echo "$row<br />";
			//$now = time();
			$query = "insert into info (user, pid, cpu, mem, vsz, rss,
				tt, stat, started, time, command) 
				values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";		
			
			$stmt = mysqli_prepare($dbc, $query);

			mysqli_stmt_bind_param($stmt, "sssssssssss", $corrected[0], $corrected[1],
				$corrected[2], $corrected[3], $corrected[4], $corrected[5],
				$corrected[6], $corrected[7], $corrected[8], $corrected[9],
				$corrected[10]);

			mysqli_stmt_execute($stmt);

			$affected_rows = mysqli_stmt_affected_rows($stmt);

			if($affected_rows == 1){
				echo 'Success';
			}
			else
			{
				echo 'error<br />';
				echo mysqli_error($dbc);
			}
			mysqli_stmt_close($stmt);
			/*

			if($dbc->query($query) === TRUE){
				echo 'success';
			}	
			else{
				echo "error: ". $query . "<br>" . mysqli_error($dbc);
			}*/

   			
		}
		else{

			echo 'Incorrect format of input<br />';

		}
	}
   			mysqli_close($dbc);

?>
</body>
</html>
