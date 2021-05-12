var nameIndex = ""
var fromHuman = 0

function getIpAddr(ipAddr, reload)
{
    let lat = 0
    let long = 0

    if(reload || event.key === 'Enter') {
        if (!reload)
            fromHuman = 1
        function ipCall() {
            nameIndex = ipAddr.name

            const getLocalisationFromIp = async() => {

                await fetch('http://ip-api.com/json/' + ipAddr.value)
                    .then(res => res.json())
                    .then(res => { 
                        document.getElementById("ip-addr" + nameIndex).innerHTML = res.query;
                        document.getElementById("ip-lat" + nameIndex).innerHTML = "latitude: " + res.lat;
                        document.getElementById("ip-long" + nameIndex).innerHTML = "longitude: " + res.lon;
                        if (fromHuman) {
                            const url = parseInt($("#widget0").attr("modified")) ? 'users/widgets/update' : 'users/widgets/add';
                            const data = {
                                type: 'ip',
                                param_1: ipAddr.value,
                                param_2: '',
                                param_3: '',
                                param_4: '',
                            }

                            $.post(url, data, function(data, status) {
                                console.log(data);
                            });
                            $("#widget0").attr("modified", "1");
                            fromHuman = 0
                        }
                    })
                    .catch( e => console.log(e))
                
            }
            getLocalisationFromIp();
        }
        ipCall()
        setInterval(ipCall, 86400000);
    }
}
