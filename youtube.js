const apiKey = 'AIzaSyDuy8ovu-_DqccPUW6GaCDVXGuJzeAwACk';  
const channelId = 'UCM4nzmzIbNLo-2ZgwcwErLQ';  

fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`)
  .then(response => response.json())
  .then(data => {
    const mainVideoContainer = document.getElementById('cultos');
    let liveVideoFound = false;
    let latestVideoEmbed = '';

    data.items.forEach(item => {
      const videoId = item.id.videoId;
      const videoTitle = item.snippet.title;
      const liveBroadcastContent = item.snippet.liveBroadcastContent;
      
      if (liveBroadcastContent === 'live') {
        liveVideoFound = true;
        const liveVideoEmbed = `
          <div class="container m-auto">
            <div class="row justify-content-md-center pb-5">
              <div class=" col-sm-6">
                <div class="video embed-responsive embed-responsive-16by9 mt-5">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              <div class="col-sm-6 mt-5">
                <div>
                  <h1 class="font-weight-bold mb-3">🔴 AO VIVO: ${videoTitle}</h1>
                  <p class=" py-2 text-justify">O nosso culto 1 vez no mês presencialmente em nossa igreja, localizada no bairro Quintas do Picuaia, Lauro de Freitas - BA, MAS para todos aqueles adoradores de Deus que não puderem estar presentes nesse dia, também disponibilizamos uma gravação do culto em nosso canal do Youtube. Além disso, todas às quartas das 20:00 às 21:30 temos cultos no Youtube para que você acompanhe ao vivo ou quando quiser.</p>
                </div>
              </div>
            </div>
          </div>`;
        mainVideoContainer.innerHTML = liveVideoEmbed;
        return;  
      }

      if (!latestVideoEmbed) {
        latestVideoEmbed = `
          <div class="container m-auto">
            <div class="row justify-content-md-center pb-5">
              <div class=" col-sm-6">
                <div class="video embed-responsive embed-responsive-16by9 mt-5">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
              <div class="col-sm-6 mt-5">
                <div>
                  <h1 class="font-weight-bold mb-3">Acompanhe nossos cultos<span style="color: #FDA923;">!</span></h1>
                  <p class=" py-2 text-justify">O nosso culto 1 vez no mês presencialmente em nossa igreja, localizada no bairro Quintas do Picuaia, Lauro de Freitas - BA, MAS para todos aqueles adoradores de Deus que não puderem estar presentes nesse dia, também disponibilizamos uma gravação do culto em nosso canal do Youtube. Além disso, todas às quartas das 20:00 às 21:30 temos cultos no Youtube para que você acompanhe ao vivo ou quando quiser.</p>
                </div>
              </div>
            </div>
          </div>`;
      }
    });

    if (!liveVideoFound) {
      mainVideoContainer.innerHTML = latestVideoEmbed;
    }
  })
  .catch(error => console.error('Erro ao buscar vídeos: ', error));
 