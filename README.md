# Instructions for Running the Application 

This application is prepared and tested on an Android device. The following instructions are for Android users.

## Prerequisites 
- Ensure both your laptop and mobile phone are connected to the same Wi-Fi network. 
- The repository contains both the Ionic app and a test server. 
- Use the test server from my repository because the HOST is set to “0.0.0.0”. 
 
## Running the Test Server 

1. Open the app in the terminal. 

2. Run the following commands: 

```
npm install 
npm start 
```

3. The server will run on a local network address, allowing access to endpoints through your local Wi-Fi network IP (e.g., http://192.168.x.x/languages, http://192.168.x.x/levels, etc.). 
 
## Running the Ionic App 

1.Find the IP address of your local Wi-Fi network:

- Using the terminal: 
```
ifconfig en0 | grep 'inet ' | grep -v '127.0.0.1' | awk '{ print $2 }' 
```
- Or, go to System Preferences > Network. There you will find the text ("Wi-Fi is connected to WIFI and has the IP address 192.168.x.x"). 
 
2. Copy the IP address and update the following file:

- Open Ionic-app/src/app/services/api.services.ts. 
- Replace the wifiIP value on line 15 with your IP address. 

3. Enable Developer Options on your phone and connect it to your computer.

4. In the terminal of the Ionic app, execute the following commands:

``` 
npm install --legacy-peer-deps 
ionic serve (optional if you want to run the app in the browser) 
ionic cap sync android 
ionic cap run android 
```
### Additional Notes 

While building the app, I aimed to cover all the requirements from the task. I relied heavily on Ionic components to maximize the benefits of the framework. Initially, accessing the test server on the phone and making HTTP (not HTTPS) calls on Android was challenging, as it resulted in CORS errors on the phone while working with warnings on the web. The capacitor.config.ts property (server:{androidScheme: 'http'}) allows using HTTP on the phone.

Setting up the camera and screen orientation was also challenging due to the need to access native elements and install Capacitor plugins. For the statistics page, I used the Chart.js library. Offline functionality was achieved with the ionic/storage-angular library, which stores API call results for later access without an internet connection.

Thank you for your patience. I hope you enjoy the app. Feel free to reach out with any questions.

Enjoy!