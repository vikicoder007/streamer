const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
var port = 3000;
var ip = require("ip");
var directory = `W:\\torrent`;
var videos = [];

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



rl.question("Please enter  the port for server : (8080 Default)", function(portInput) {
    rl.question("Please enter the path form where videos will be served :", function(pathInput) {
        port = (portInput == "" || isNaN(portInput)) ? port : portInput;
        directory = pathInput == "" ? directory : pathInput;
        rl.close();
    });
});

rl.on("close", function() {
    app.listen(port,function(){
        console.log("SERVER SERVING ON :"+port);
        console.log("ACCESS WEBSITE  ON FOLLOWING URL : ");
        console.log("http://"+ip.address() + ":"+port);
        console.log(`SERVING DIRECTORY :` + path.join(directory));
    });
});


app.use("/assets/",express.static(path.join(__dirname,"assets")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));





videos = fromDir(directory);
videos = videos.map(function(video){
    return {
        name : path.basename(video),
        file : video,
        url : path.basename(video).replace(/[^A-Z0-9]/ig, "-")
    };
});

for(var video of videos){
    bindExpressRoute(video);
}


app.get("/",function(req,res){
    res.render("index",{videos : videos});
});



// FUNCTIONS 


function fromDir(startPath){
    var items = [];
    if (!fs.existsSync(startPath)){
        return items;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            items = items.concat(fromDir(filename));
        }else if ([".mp4",".webm",".ogg"].indexOf(path.extname(filename))  >=0) {
            items.push(filename);
        };
    };
    return items;
};

function bindExpressRoute(video){
    app.get("/video/"+video.url,function(req,res){
        res.sendFile(video.file);
    });
    return video;
}



