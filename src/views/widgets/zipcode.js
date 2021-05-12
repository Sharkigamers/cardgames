var fromHuman = 0

function getZipcode(zipcode, reload)
{
    if(reload || event.key === 'Enter') {
        if (!reload)
            fromHuman = 1
        function zipcodeCall(){
            const getZipcodeInfo = async() => {

                await fetch('http://api.zippopotam.us/' + document.getElementById('zipcode-select').value + '/' + zipcode.value)
                    .then(res => res.json())
                    .then(res => {
                        document.getElementById("zipcode-result-text-city" + zipcode.name).innerHTML = "City";
                        document.getElementById("zipcode-result-city" + zipcode.name).innerHTML = res.places[0]["place name"];
                        document.getElementById("zipcode-result-text-state" + zipcode.name).innerHTML = "State";
                        document.getElementById("zipcode-result-state" + zipcode.name).innerHTML = res.places[0]["state"];
                        if (fromHuman) {
                            const url = parseInt($("#widget0").attr("modified")) ? 'users/widgets/update' : 'users/widgets/add';
                            const data = {
                                type: 'zipcode',
                                param_1: document.getElementById('zipcode-select').value,
                                param_2: zipcode.value,
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
            getZipcodeInfo();
        }
        zipcodeCall();
        setInterval(zipcodeCall, 86400000);
    }
}