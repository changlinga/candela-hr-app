# candela-hr-app

### Setup

1. Run below.

```
    $ cd CandelaHRApp
    $ npm install
```

2. Go to CandelaHRApp/src/constants/general.js and change the BASE_URL to your local IP address.

```
     export const BASE_URL = "http://<your local IP address>:3000";
```

### Run

1. Run below.

```
    $ npm start
```

2. In the Metro Bundler, you may choose to run on Android device/emulator or iOS Simulator.
3. To run on Android device, install Expo app, select "Scan QR Code" and scan the QR code in the Metro Bundler.
4. To run on iOS device, install Expo app, tap on the plus icon at the top right corner, enter the project URL to open (Expo project url that starts with exp://, available in the Metro Bundler).

### Unit Test

```
    $ npm test
```

### Publish to Expo

```
    $ npm run publish
```
