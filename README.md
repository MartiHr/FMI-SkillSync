# FMI Skill Sync

<img src="logo.png" alt="logo.png" height="300" />

## Introduction

**FMI Skill Sync** is a platform designed to connect students who are struggling with subjects to other students who have more knowledge and are willing to help. By fostering collaboration and knowledge sharing. This platform aims to empower students to overcome the academic challenges (Faculty of Mathematics and Informatics) and achieve success in their studies.

## Setup

Make sure you export the following variables in .env:
```
VITE_REACT_APP_FIREBASE_API_KEY="<firebase token>"
VITE_REACT_APP_FIREBASE_AUTH_DOMAIN="<firebase auth domain>"
VITE_REACT_APP_FIREBASE_PROJECT_ID="<firebase project id>"
VITE_REACT_APP_FIREBASE_STORAGE_BUCKET="<firebase storage bucket>"
VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID="<firebase messaging sender id>"
VITE_REACT_APP_FIREBASE_APP_ID="<firebase app id>"
VITE_REACT_APP_FIREBASE_MEASUREMENT_ID="<firebase measurement id>"
VITE_REACT_APP_FIREBASE_DATABASE_URL="<firebase database url>"
```
Then run the following commands in terminal:
```
npm install
npm start
```

## Main Features
* The platform offers **multilingual support** to accommodate users who prefer to interact in *Bulgarian* or *English*.
* The platform includes different subjects of **discussion forum** where users can engage in conversations on a wide range of topics.
* The platform includes a **dedicated event list** where students can post requests for assistance with their studies, fostering *collaboration* and support among colleagues.
* The platform features a fully **responsive user interface**, ensuring seamless user experiences across various devices including smartphones, tablets, and desktops.
* Our platform facilitates *seamless communication* between users through two key features:
  - Engage in real-time conversations using **chat system**.
   - Engage visually with other users using our interactive **whiteboard** feature.

## User flows
* User Authentication
  - Login
  - Register
* Forum
  - Write
  - Comment
  - Discuss
* Events
  - Event to join
    - Join event
    - Location
    - Date
  - Event creator
    - Join requests
* Profile page
  - User created events
  - User real-time chats

## Used Technologies
* Real-time database
* Cloud Firestore
* Pure CSS design
* React + Vite
