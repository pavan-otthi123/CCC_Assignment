
Mobile AI Project : (Multi Page App)

Phase 1: Build a Mobile app that run an AI Model and performs inference on camera frames. Once the predicted probability on camera frame is above a ceratin threshold for the relevant tag send the image to a Flask Server and save them for later use.Save atleast 4 images.
Phase 2 : Send the images back to the app on the device and display all the captured images on a new summary page.
For AI model yo can train your own small Image classifier model that can run on tfjs. Or download an image classifier model that can run on js from Tensorflow website.

1. In the folder named sandbox you will find boiler plate code for hosting a web app using flask.
2. If using visual studio code . 
    Replicate the folder and files structure in visual studo code.
  - open a new terminal and navigate to the folder sandbox. 
  - Create a virtual env using terminal
    - virtualenv name-of-virtualenv
    - source name-of-virtualenv/bin/activate
    - pip install flask 
  - For running WebApp on mobile device . You will need the website to be running on https. 
  - Use the steps below to generate a self signed certificate and host the web app on your computer.
3. Terminal Commands for generating self-signed certificate.
  openssl genrsa -des3 -out server.key 1024
    - enter the passphrase as  '12345'
  openssl req -new -key server.key -out server.csr
    - 12345
    - US
    - state name
    - city name
    - none 
    - none
    - none
    - none
    - press enter

  cp server.key server.key.org
  openssl rsa -in server.key.org -out server.key
    - 12345
  openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

Now you generate all the required certificates to host the web app on https.
In the file app.py , line 9 enter your computer ip address where it says ip-address. 
  - Use the https://[computer ip-address]:port to access web app on your mobile device.

Type 'python3 app.py' in the terminal and use the address on a mobile device connected to the same wifi to access the web app.

Now you are ready to build your web app. 
Please refer to the problem statement to complete the assigned task.

Ignore package-lock.json, package,json and vite-config.ts

