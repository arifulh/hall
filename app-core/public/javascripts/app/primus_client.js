window.PrimusClient = {

	init: function() {
		var primus = Primus.connect('http://localhost:3000/primus', {
			websockets: true,
			network: true
		});
		primus.on('open', function () {
			primus.write({ action: 'join', room: 'news' });
		});
	}

}

