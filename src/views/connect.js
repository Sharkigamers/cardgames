function personalAccountConnection() {
    console.log("azerty");
    document.getElementById("logger").style.display = "none";
    document.getElementById("disconnector").style.display = "inline-block";
    document.getElementById("connector").style.display = "none";
}

function personalAccountCreation() {
    console.log("azerty");
    document.getElementById("logger").style.display = "none";
    document.getElementById("disconnector").style.display = "inline-block";
    document.getElementById("connector").style.display = "none";
    document.getElementById("connection").style.display = "block";
    document.getElementById("creation").style.display = "none";
}

function createAccount() {
    document.getElementById("connection").style.display = "none";
    document.getElementById("creation").style.display = "block";
}

function dashboardConnect() {
    document.getElementById("logger").style.display = "block";
}

function dashboardDisconnect() {
    document.getElementById("connector").style.display = "inline-block";
    document.getElementById("disconnector").style.display = "none";
}