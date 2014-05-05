window.sclient = {

	init: function() {
        var self = this;
        this.primus = Primus.connect('http://localhost:3000/primus', {
			websockets: true,
			network: true
		});
		self.primus.on('open', function () {
            self.primus.write({ channel: 'test', message: 'news' });
            self.primus.on('data', function(message){
                console.log(message)
            })
		});
	},

    refresh: function() {
        var self = this;
        console.log(self)
        self.primus.end();
        self.primus = null;
        setTimeout(function() {
            self.init();
        }, 100);
    }

};

