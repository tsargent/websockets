const url = "ws://localhost:3000";
const socket = new WebSocket(url, 'twitter-example');

socket.addEventListener('open', function (event) {
    console.log('open');
    socket.send('Hello Server!');
});

socket.addEventListener('message', function (event) {
    console.log(event.data);
    document.write(event.data);
});
