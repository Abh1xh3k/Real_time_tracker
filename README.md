# Real-time Location Tracker

A real-time location tracking application using Node.js, Express, Socket.IO, and Leaflet maps.

## Main Components

### Frontend (script.js)

#### Geolocation Handling
```javascript
navigator.geolocation.watchPosition()
```
- Continuously watches user's position changes
- Parameters:
  - Success callback: Sends location data to server
  - Error callback: Logs any geolocation errors
  - Options: 
    - `enableHighAccuracy`: True for best possible results
    - `timeout`: 2000ms timeout for location fetch
    - `maximumAge`: 0 to prevent cached locations

#### Map Initialization
```javascript
const map = L.map("map").setView([0, 0], 10)
```
- Creates a Leaflet map instance
- Initially centered at coordinates [0,0]
- Sets initial zoom level to 10

#### Socket Event Handlers

1. `socket.on('recieveLocation')`:
   - Receives location updates from server
   - Updates or creates markers for each user
   - Centers map view on latest location
   - Maintains markers in an object for tracking multiple users

2. `socket.on('user-disconnected')`:
   - Handles user disconnection
   - Removes corresponding marker from map
   - Cleans up marker reference

### Backend (app.js)

#### Server Setup
```javascript
const server = http.createServer(app)
const io = socketio(server)
```
- Creates HTTP server with Express
- Initializes Socket.IO for real-time communication

#### Socket Event Handlers

1. `io.on('connection')`:
   - Handles new client connections
   - Sets up event listeners for each client

2. `socket.on('sendLocation')`:
   - Receives location updates from clients
   - Broadcasts location to all connected clients
   - Includes unique socket ID with coordinates

3. `socket.on('disconnect')`:
   - Handles client disconnections
   - Notifies all clients when a user disconnects

#### Express Routes
```javascript
app.get('/')
```
- Serves the main page using EJS template engine

## Features

- Real-time location tracking
- Multiple user support
- Dynamic marker updates
- Automatic cleanup on user disconnect
- Interactive map interface

## Dependencies

- Express.js: Web application framework
- Socket.IO: Real-time bidirectional communication
- EJS: Template engine
- Leaflet: Interactive maps