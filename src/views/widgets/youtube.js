var fromHuman = 0

function getYoutube(yt, reload)
{
    if(reload || event.key === 'Enter') {
        if (!reload)
            fromHuman = 1
        function youtubeCall() {
            let youtubeKey = 'AIzaSyAMibC2ARDTOJchV2D7MYfxDGsDcruaypU';
            let youtubeUser = yt.value;
            let subCount = document.getElementById('yt-result-sub' + yt.name);
            let viewCount = document.getElementById('yt-result-view' + yt.name);
            let accountName = document.getElementById('yt-first' + yt.name);

            let getSubscribers = () => {

                fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUser}&part=snippet&key=${youtubeKey}`)
                .then(function(responses) {
                    return responses.json()
                })
                .then(ytData => {
                    accountName.innerHTML = ytData["items"][0].snippet.title;
                    document.getElementById('yt-result-text-sub' + yt.name).innerHTML = "Subscribers";
                    subCount.innerHTML = ytData["items"][0].statistics.subscriberCount;
                    document.getElementById('yt-result-text-view' + yt.name).innerHTML = "Viewers";
                    viewCount.innerHTML = ytData["items"][0].statistics.viewCount;
                    if (fromHuman) {
                        const url = parseInt($("#widget0").attr("modified")) ? 'users/widgets/update' : 'users/widgets/add';
                        const data = {
                            type: 'youtube',
                            param_1: youtubeUser,
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
                
            }
            getSubscribers();
        }
        youtubeCall()
        setInterval(youtubeCall, 10000);
    }
}
