const socket = io();
if(navigator.geolocation){
   navigator.geolocation.watchPosition(
    (position)=>{ 
   const {latitude,longitude}= position.coords;
   socket.emit('sendLocation',{latitude,longitude});
   },
   (error)=>{
    console.log(error);
   },
{
    enableHighAccuracy:true,
    timeout:2000,
    maximumAge:0, //koi bhi saved data use na kare i.e no caching
}) 
}

const map=L.map("map").setView([0, 0], 10); //initial view set to [0,0] coordinates with zoom level 0
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Abhishek's world"
}).addTo(map);

const markers={}
socket.on('recieveLocation',(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude],20);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
})
socket.on('user-disconneted',(id)=>
    {
        if(markers[id]){
            map.removeLayer(markers[id]);
            delete markers[id];
        }
    })
// console.log("connected");