'use strict'

var colorwheel, hw, iyear, imonth, iday, idigit

function main()
{
	idigit = document.getElementById("digit");
	iyear = document.getElementById("year");
	imonth = document.getElementById("month");
	iday = document.getElementById("day");
	colorwheel = document.getElementById("colorwheel");
	hw = new HueWheel(colorwheel, { rgb: [100,100,100] });
}

function call(func, num)
{
	jQuery.post(
		"https://api.particle.io/v1/devices/" + device + "" + func,
		{
			access_token: token,
			arg: num
		},
		function(data, status){ console.log("Data: " + data + "\nStatus: " + status); }
	);
}

function digits()
{
	var lifeDigit = idigit.value;
	var year = iyear.value;
	var month = imonth.value;
	var day = iday.value;
	var digit = (year + month + day) % 9
	var confirmNum = digit == lifeDigit ? 1 : 0; // audience's calcuation result is correct or not
	var inputCtype = 1; // color type, single 1, warm 2, cool 3, rainbow 4\
	var inputR = hw.rgb().r;
	var inputG = hw.rgb().g;
	var inputB = hw.rgb().b;
	var thisMonth = month == new Date().getMonth() ? 1 : 0 ; //month of birthday is equal to current month, yes=1, no=0

	var input
	= lifeDigit
	+ confirmNum * 10
	+ inputR * 10 * 2
	+ inputG * 10 * 2 * 256
	+ inputB * 10 * 2 * 256 * 256
	+ inputCtype * 10 * 2 * 256 * 256 * 256
	+ thisMonth * 10 * 2 * 256 * 256 * 256 * 4;

	call("Input", input);
}
