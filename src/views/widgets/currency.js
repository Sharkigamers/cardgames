var fromHuman = 0

function getCurrency(currency, reload)
{
    if(reload || event.key === 'Enter') {
        if (!reload)
            fromHuman = 1
        function currencyCall() {
            const getCurrencyConverted = async() => {

                await fetch('https://v6.exchangerate-api.com/v6/886b857ef8edf4a578bf48ba/latest/' + document.getElementById('currency-first-select').value)
                    .then(res => res.json())
                    .then(res => {
                        document.getElementById('currency-result' + currency.name).innerHTML = res["conversion_rates"][document.getElementById('currency-second-select').value] * parseInt(currency.value)
                        if (fromHuman) {
                            const url = parseInt($("#widget0").attr("modified")) ? 'users/widgets/update' : 'users/widgets/add';
                            const data = {
                                type: 'currency',
                                param_1: document.getElementById('currency-first-select').value,
                                param_2: currency.value,
                                param_3: document.getElementById('currency-second-select').value,
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
            getCurrencyConverted();
        }
        currencyCall()
        setInterval(currencyCall, 86400000);
    }
}