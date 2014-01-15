document.getElementById('sketchInputSubmit').addEventListener('click', function() {
	var sketchInput = document.getElementById('sketchInputText');
	console.log(sketchInputText.value);
	socket.emit('client_cmd', { SKETCH : sketchInputText.value });
}, false);


