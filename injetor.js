(function() {
    var senhaCorreta = '123'; 
    var acesso = prompt("CINE FARIAS TV - Senha:");
    if (acesso !== senhaCorreta) return;

    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var check = function() {
            var v = document.querySelector('video');
            if (v && !document.getElementById('f-layer')) {
                v.muted = true; v.style.opacity = '0';
                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;"></video>';
                v.parentElement.appendChild(d);

                var mp = document.getElementById('meu-player');
                var src = 'https://cinema.felipefariastv.com.br/live/fariastv/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls({
                        enableWorker: true,
                        lowLatencyMode: false, // DESATIVADO TOTAL
                        // Essas linhas abaixo impedem o "efeito elástico":
                        liveSyncDurationCount: 5,     // Espera acumular 5 pedaços de vídeo antes de iniciar
                        liveMaxLatencyDurationCount: 999, // NUNCA tenta alcançar o tempo real
                        maxBufferLength: 30,          // Pode guardar bastante vídeo na RAM
                        maxMaxBufferLength: 60,
                        manifestLoadingMaxRetry: 10
                    });
                    hls.loadSource(src);
                    hls.attachMedia(mp);
                    
                    // Garante que o vídeo não tente pular frames para sincronizar
                    hls.on(Hls.Events.ERROR, function() { hls.recoverMediaError(); });
                } else { mp.src = src; }
            }
        };
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
