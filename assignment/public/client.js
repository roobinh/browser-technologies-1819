async function main() {
    // set public vapid key
    const publicVapidKey = 'BN8yGtgilYEATAYZEaVyV621kwyv4DMcuGr2coAm36uzqeHHtO3PvcW2G2dXfj4RWAsH3dOfpyNkWy06oTF7AUM'

    // check for service worker
    if('serviceWorker' in navigator) {
        console.log("service worker available!")

        send().catch(err => console.error(err));
    }

    // send notification
    async function send() {
        console.log('Registering service worker...');
        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
        });
        console.log('Service worker registered.');
        
        var convertedPublicKey = urlBase64ToUint8Array(publicVapidKey);
        console.log("Register Push...");
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedPublicKey
        })
        console.log("Push registered.")
        
        console.log("Sending Notification")
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log("Push send!")
    }

    // function to convert vapid key
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }
}

// event Listeners
var button = document.getElementById('recieveNotifications');
button.addEventListener("click", function() {
    main();
    location.reload();
})

var disableworker = document.getElementById('disableworker');
disableworker.addEventListener("click", function() {
    console.log("Disabling Worker...")
    disableWorker()
    console.log("Worker disabled.")
})

// check if service worker is running
navigator.serviceWorker.getRegistrations().then(registrations => {
    if(registrations.length == 1) {
        var notifications = document.getElementById('notifications');
        notifications.setAttribute("style", "display: none");
        var runningworker = document.getElementById('runningworker');
        runningworker.setAttribute("style", "display: block");
    }
});

// disable service workers
function disableWorker() {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
         registration.unregister()
       } 
    })
    location.reload();
}

var test = document.getElementById('testnotification');
test.addEventListener("click", function() {
    main();
})

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    var txt = xmlhttp.responseText;
    console.log(txt);
  }
};
xmlhttp.open("GET","https://api.myjson.com/bins/oost2",true);
xmlhttp.send();