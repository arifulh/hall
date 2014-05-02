window.PrimusClient = {

	init: function() {
		var primus = Primus.connect('http://localhost:3000/primus', {
			websockets: true,
			network: true
		});
		primus.on('open', function () {
            primus.write({ channel: 'test', message: 'news' });
            primus.on('data', function(message){
                console.log(message)
            })
		});
	}

}

