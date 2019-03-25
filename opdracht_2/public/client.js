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

        console.log("Register Push...");
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
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


    setInterval(function() {
        console.log('jo')
        // if(goal) {
        //     send();
        // }
    }, 500);

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