//Global variable for which user or timestamp to select from
var CURRENT_USER = "All Users";
var LIST_USER = [];

var CURRENT_TIMESTAMP = "Most Recent";
var LIST_TIMESTAMP = [];

//Remove all event listeners from this id
function removeEventListeners(id)
{
	var el = document.getElementById(id);
    var elClone = el.cloneNode(true);
	el.parentNode.replaceChild(elClone, el);
}

// Convert string to array
function stringToArray(arr)
{
	arr = arr.split(" ");
	var stringArr = new Array();

	for (var i = 0; i < arr.length; i++) {
		stringArr.push(arr[i]);
	}
	return stringArr;
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
		
		document.getElementById(currId).addEventListener('click', selectNewUsers, false);
	}
	
	//Loop through ids and generate onclick function for timestamp dropdown
	for (var i = 0, len = timestampDropdownElements.length; i < len; i++)
	{
		var currId = timestampDropdownElements[i].id;
		console.log("id " + currId);
		
		document.getElementById(currId).addEventListener('click', selectNewTimestamp, false);
	}
	
}

//Loads all unique users in the 'sort by user' drop down
function loadAllUsersinDropdown()
{
	//User drop down menu
	var userDropdown = document.getElementById('userdropdown');
	
	//Remove all existing elements from user dropdown
	while (userDropdown.firstChild)
	{
		userDropdown.removeChild(userDropdown.firstChild);
	}

	//Grab all unique users from database and put in a string separated by spaces
		//DO THIS ELIZA
	var uniqueUsers;
	xmlhttp.open("GET", "php/getAllUnique.php?column=user", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				uniqueUsers = (xmlhttp.responseText);
				console.log(pid);
			}

		
	//Test
	uniqueUsers = "Rica Alyza Jon Natasha Eliza";
	var userArr = stringToArray(uniqueUsers);
	userArr.unshift("All Users");
	
	for (var i=0, max=userArr.length; i < max; i++)
	{
		//Create list element
		var li = document.createElement("LI");
			
		//Create link element and add attributes and text node
		var a = document.createElement("A");
		a.setAttribute("id", userArr[i]);
		a.setAttribute("href", "#");
		var textnode = document.createTextNode(userArr[i]);
		a.appendChild(textnode);   

		//Append link element to list element
		li.appendChild(a);
		
		userDropdown.appendChild(li);
	}
}

//Loads all unique timestamps in the 'sort by timestamp' drop down
function loadAllTimeStampsinDropdown()
{
	//User drop down menu
	var timestampDropdown = document.getElementById('timestampdropdown');
	
	//Remove all existing elements from user dropdown
	while (timestampDropdown.firstChild)
	{
		timestampDropdown.removeChild(timestampDropdown.firstChild);
	}
	
	//Grab all unique timestamps from database and put in a string separated by spaces
		//DO THIS ELIZA
	var uniqueTimestamps;
	xmlhttp.open("GET", "php/getAllUnique.php?column=timestamp", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				uniqueTimestamps = (xmlhttp.responseText);
				console.log(pid);
			}

		
	//Test
	uniqueTimestamps = "time1 time2 time3 time4 time5 time6 time7";
	var timestampArr = stringToArray(uniqueTimestamps);
	timestampArr.unshift("Most Recent");
	
	for (var i=0, max=timestampArr.length; i < max; i++)
	{
		//Create list element
		var li = document.createElement("LI");
			
		//Create link element and add attributes and text node
		var a = document.createElement("A");
		a.setAttribute("id", timestampArr[i]);
		a.setAttribute("href", "#");
		var textnode = document.createTextNode(timestampArr[i]);
		a.appendChild(textnode);   

		//Append link element to list element
		li.appendChild(a);
		
		timestampDropdown.appendChild(li);
	}
}

//Visibly update selected element in dropdown
function updateDropdownSelected(dropdown)
{
	if (dropdown == "user")
	{
		document.getElementById("userselect").innerHTML = "Sort By " + CURRENTUSER + "<span class=\"caret\"></span>";
	}
	else if (dropdown == "time") 
	{
		document.getElementById('timeselect').innerHTML = "Sort By " + CURRENTTIMESTAMP + "<span class=\"caret\"></span>";
	}
	else
	{
		window.alert("Error: Invalid drop down selection");
	}
}

//Event for selecting new user by changing CURRENTUSER
function selectNewUsers()
{
	console.log("processing " + this.id);
	CURRENTUSER = this.id;
	updateDropdownSelected("user");
}

//Event for selecting new user by changing CURRENTTIMESTAMP
function selectNewTimestamp()
{
	console.log("processing " + this.id);
	CURRENTTIMESTAMP = this.id;
	updateDropdownSelected("time");
}

//Load charts
function loadCharts()
{
	google.charts.load('current', {'packages':['corechart']});
}

//Synchronously grabs chart data from php file
function getChartData(cata, user)
{
	var xmlhttp = new XMLHttpRequest();

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
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'pid');
		data.addColumn('number', cata);
		
		
		//var pid = getChartData(cata, user);
		//var category = getChartData(cata, user);
		//var command = getChartData(cata, user);
		//var user = getChartData(cata, user);
		
		
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "php/getFunc.php?column=pid", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				pid = (xmlhttp.responseText);
				console.log(pid);
			}
		
		var catagory;
		xmlhttp.open("GET", "php/getFunc.php?column=" + cata, false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				catagory = xmlhttp.response;
				console.log(catagory);
			}

		var command;
		xmlhttp.open("GET", "php/getFunc.php?column=command", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				command = xmlhttp.response;
				console.log(command);
			}

		var user;
		xmlhttp.open("GET", "php/getFunc.php?column=user", false);
		xmlhttp.send(null);
		
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//console.log(xmlhttp.responseText);
				user = xmlhttp.response;
				console.log(user);
			}
		
		
		//TEST DATA
		//var pid = "1 2 3 4";
		//var catagory = "0.2 0.4 0.2 0.1";
		//var command = "chrome darksouls geany spotify";
		//var user = "rica alyza eliza jon";
		
		var pidArr = stringToArray(pid);
		var cataArray = stringToArray(catagory);
		var commandAray = stringToArray(command);
		var userArray = stringToArray(user);

		var arg = [];
		for(var i = 0; i < pidArr.length; i++)
		{
			arg.push(["PID: " + pidArr[i] + " " + commandAray[i] + " " + userArray[i], parseFloat(cataArray[i])]);
		}
		data.addRows(arg);

		//Options for selected pie chart
		var options = 
		{
			//None for now
		};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	}
}

//On Page load function
function onLoad(cata,user)
{
	loadAllUsersinDropdown();
	loadAllTimeStampsinDropdown();
	dropdownImplementListeners();
    loadCharts();
    displayPieChart(cata,user);
}
