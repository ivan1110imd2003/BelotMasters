const ws = new WebSocket('wss://environment-basketball.gl.at.ply.gg:49647');

ws.onopen = () => {
    console.log('Connected to the server');
    ws.send('Hello Server!'); // Send a message to the server
};

$(".cards button").click(function() {
    const message = $(this).text();
    ws.send(message);
});