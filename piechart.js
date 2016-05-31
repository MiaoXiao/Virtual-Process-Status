
//Load
function loadCharts()
{
	google.charts.load('current', {'packages':['corechart']});
}

//Displays Pie Chart
function displayPieChart(cata, user)
{
	document.getElementById("title").innerHTML = cata;
	var cataArray = document.getElementsByTagName("LI");
	//console.log(cataArray);
	for (var i=0, max=cataArray.length; i < max; i++)
	{
		cataArray[i].setAttribute("class", "");
	}

	document.getElementById(cata).setAttribute("class", "active");
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() {

	// convert string to array
	function toArray(arr){
		arr = arr.split(" ");
		var stringArr = new Array();

		for (var i = 0; i < arr.length; i++) {
			stringArr.push(arr[i]);
		}
		return stringArr;
	}
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'pid');
	data.addColumn('number', cata);

	//var string1 = <?php echo "1 2 3 4" ?>;
	//var string2 = <?php echo "5 6 7 8" ?>;
	var pid = '3 33 333 3333';
	var catagory = '5 6 7 8';
	var command = `test test test test`;
	var user = `rica alyza jon eliza`;
	
	var arr1 = toArray(pid);
	var arr2 = toArray(catagory);
	var arr3 = toArray(command);
	var arr4 = toArray(user);
	//console.log(arr1);
	//console.log(arr2);
	var arg = [];
	for(var i = 0; i < arr1.length; i++){
		arg.push(["PID: " + arr1[i] + " " + arr3[i] + " " + arr4[i], parseInt(arr2[i])]);
	}
	data.addRows(arg);
	//console.log(arg);

	var options = {

	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
	}
}