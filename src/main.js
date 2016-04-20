function main()
{
	var colorwheel = document.getElementById("colorwheel");
	var hw = new HueWheel(colorwheel, {});
}

function call(func, num)
{
	jQuery.post(
		"https://api.particle.io/v1/devices/" + device + "/" + func,
		{
			access_token: token,
			arg: num
		},
		function(data, status){ console.log("Data: " + data + "\nStatus: " + status); }
	);
}

function digits()
{
	//call("lifeDigit", 1);
	//call("confirmNum", 1); // audience's calcuation result is correct or not
	//call("inputCtype", 1); // color type, single 1, warm 2, cool 3, rainbow 4
	call("inputR", 1);
	call("inputG", 1);
	call("inputB", 1);
	//call("thisMonth", 1); //month of birthday is equal to current month, yes=1, no=0
}
