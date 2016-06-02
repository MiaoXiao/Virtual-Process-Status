//Global variable for whichj user or timestamp to select from
var CURRENT_USER = "all";
var LIST_USER = [];
var EVENTLISTENERS_USER = [];

var CURRENT_TIMESTAMP = "recent";
var LIST_TIMESTAMP = [];
var EVENTLISTENERS_TIMESTAMP = [];

//Remove all event listeners from this id
function removeEventListeners(id)
{
	var el = document.getElementById(id);
    var elClone = el.cloneNode(true);
	el.parentNode.replaceChild(elClone, el);
}

//Process dropdown requests
function dropdownImplementListeners()
{
	//Remove any existing event listeners
	removeEventListeners('userdropdown');
	removeEventListeners('timestampdropdown');
	
	//Get array of user drop down elements and timestamp drop down elements
	var userDropdownElements = document.getElementById("userdropdown").getElementsByTagName("A");
	var timestampDropdownElements = document.getElementById("timestampdropdown").getElementsByTagName("A");;
	
	//Loop through ids and generate onclick function for username dropdown
	for (var i = 0, len = userDropdownElements.length; i < len; i++)
	{
		var currId = userDropdownElements[i].id;
		console.log("id " + currId);
		
		document.getElementById(currId).addEventListener('click', function()
		{
			console.log("processing " + this.id);
			return false;
		}, false);
	}
	
	//Loop through ids and generate onclick function for timestamp dropdown
	for (var i = 0, len = timestampDropdownElements.length; i < len; i++)
	{
		var currId = timestampDropdownElements[i].id;
		console.log("id " + currId);
		
		document.getElementById(currId).addEventListener('click', function()
		{
			console.log("processing " + this.id);
			return false;
		}, false);
	}
	
}

//Loads all unique users in the 'sort by user' drop down
function loadAllUsersinDropdown()
{
	
}

//Loads all unique timestamps in the 'sort by timestamp' drop down
function loadAllTimeStampsinDropdown()
{
	
}

//Selects new user by changing CURRENTUSER
function selectNewUser()
{
	
}

//Selects new timestamp by changing CURRENTTIMESTAMP
function selectNewTimestamp()
{
	
}

//Load charts
function loadCharts()
{
	google.charts.load('current', {'packages':['corechart']});
}

//Synchronously grabs chart data from php file
function getChartData(cata, user)
{
	xmlhttp.open("GET", "php/getFunc.php?column=" + cata, false);
	xmlhttp.send(null);

	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
	{
		return xmlhttp.response;
		//console.log(user);
	}
}

//Display selected Pie Chart
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
	function drawChart() 
	{
		// convert string to array
		function toArray(arr)
		{
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
		
		/*
		var pid = getChartData(cata, user);
		var category = getChartData(cata, user);
		var command = getChartData(cata, user);
		var user = getChartData(cata, user);
		*/
		/*
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "getFunc.php?column=pid", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				pid = (xmlhttp.responseText);
				console.log(pid);
			}
		
		var catagory;
		xmlhttp.open("GET", "getFunc.php?column=" + cata, false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				catagory = xmlhttp.response;
				console.log(catagory);
			}

		var command;
		xmlhttp.open("GET", "getFunc.php?column=command", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				command = xmlhttp.response;
				console.log(command);
			}

		var user;
		xmlhttp.open("GET", "getFunc.php?column=user", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				user = xmlhttp.response;
				console.log(user);
			}
		*/
		
		//TEST DATA
		var pid = "1 2 3 4";
		var catagory = "0.2 0.4 0.2 0.1";
		var command = "chrome darksouls geany spotify";
		var user = "rica alyza eliza jon";
		
		var pidArr = toArray(pid);
		var cataArray = toArray(catagory);
		var commandAray = toArray(command);
		var userArray = toArray(user);

		var arg = [];
		for(var i = 0; i < pidArr.length; i++)
		{
			arg.push(["PID: " + pidArr[i] + " " + commandAray[i] + " " + userArray[i], parseFloat(cataArray[i])]);
		}
		data.addRows(arg);

		//Options for selected pie chart
		var options = 
		{
			//None
		};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	}
}

//On Page load function
function onLoad(cata,user)
{
	dropdownImplementListeners();
    loadCharts();
    displayPieChart(cata,user);
}

