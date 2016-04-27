'use strict'

var colorwheel, hw, iyear, imonth, iday, idigit;
var warm, cool, rainbow;
var inputCtype = 1;

function ccolor()
{
	warm.style.border = "";
	cool.style.border = "";
	rainbow.style.border = "";
	inputCtype = 1;
}

function cwarm()
{
	warm.style.border = "thick dotted red";
	cool.style.border = "";
	rainbow.style.border = "";
	inputCtype = 2;
}

function ccool()
{
	warm.style.border = "";
	cool.style.border = "thick dotted blue";
	rainbow.style.border = "";
	inputCtype = 3;
}

function crainbow()
{
	warm.style.border = "";
	cool.style.border = "";
	rainbow.style.border = "thick dotted white";
	inputCtype = 4;
}

function main()
{
	warm = document.getElementById("warm");
	cool = document.getElementById("cool");
	rainbow = document.getElementById("rainbow");
	idigit = document.getElementById("digit");
	iyear = document.getElementById("year");
	imonth = document.getElementById("month");
	iday = document.getElementById("day");
	colorwheel = document.getElementById("colorwheel");
	hw = new HueWheel(colorwheel, { rgb: [0,150,150], lightness:0.5 });
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
	var colorFactor = 15;

	var lifeDigit = Number(idigit.value);
	var year = Number(iyear.value);
	var month = Number(imonth.value);
	var day = Number(iday.value);
	var digit = (year + month + day) % 9
	if (!digit) digit = 9;
	var confirmNum = (digit == lifeDigit ? 1 : 0); // audience's calcuation result is correct or not
	var inputR = Math.floor(hw.rgb().r/colorFactor);
	var inputG = Math.floor(hw.rgb().g/colorFactor);
	var inputB = Math.floor(hw.rgb().b/colorFactor);
	var thisMonth = (month == Number(new Date().getMonth()+1) ? 1 : 0) ; //month of birthday is equal to current month, yes=1, no=0

	//alert(lifeDigit);
	//alert(confirmNum);
	//alert(inputCtype);
	//alert(inputR);
	//alert(inputG);
	//alert(inputB);
	//alert(new Date().getMonth());

	var input
	= lifeDigit
	+ confirmNum * 10
	+ inputR * 10 * 2
	+ inputG * 10 * 2 * 256
	+ inputB * 10 * 2 * 256 * 256
	+ inputCtype * 10 * 2 * 256 * 256 * 256
	+ thisMonth * 10 * 2 * 256 * 256 * 256 * 4;

	//alert(input);

	call("Input", input);
}
