# Using firebase emulators to emulate sign in interactions

##Firebase is used in this project to authenticate and store user and app data

## 1.- Install firebase cli https://firebase.google.com/docs/cli

> npm install -g firebase-tools

## 2.- Current version of the repo already comes with some integration executing this command will open the emulator and emulator settings at port 4000

> firebase emulators:start

## 3.- yarn start

> yarn start

## 4.- Open localhost:4000/auth and create a user and password (Theres dummy data but hasnt been pushed yet)

## 5.- go to localhost:3000/auth and login, since theres no follow up action to the login button move to marketplace.

## 6.- You should see your username at the top right corner along with the pfp
