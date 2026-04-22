(function() {
    // 1. SEGURANÇA - Mantendo sua senha original
    var senhaCorreta = '123'; 
    var acesso = prompt("CINE FARIAS TV - Senha:");
    if (acesso !== senhaCorreta) return;

    // 2. CARREGAR BIBLIOTECA HLS (Para rodar o vídeo da VPS)
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var check = function() {
            // Procura o vídeo original da Kick
            var v = document.querySelector('video');
            
            // Se encontrar o vídeo e ainda não tivermos injetado o nosso layer
            if (v && !document.getElementById('f-layer')) {
                
                // Muta e esconde o vídeo original (mantendo a audiência na Kick)
                v.muted = true; 
                v.style.opacity = '0'; 
                
                // Cria o container do nosso player customizado
                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
                
                // Injeta o novo elemento de vídeo
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                v.parentElement.appendChild(d);

                var mp = document.getElementById('meu-player');
                
                // --- LINK ATUALIZADO COM SEU DOMÍNIO E SSL ---
                var src = 'https://cinema.felipefariastv.com.br/live/cine/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls();
                    hls.loadSource(src);
                    hls.attachMedia(mp);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        mp.play();
                    });

                    // Tratamento de erros para não travar o player
                    hls.on(Hls.Events.ERROR, function(event, data) {
                        if (data.fatal) {
                            switch(data.type) {
                                case Hls.ErrorTypes.NETWORK_ERROR: hls.startLoad(); break;
                                case Hls.ErrorTypes.MEDIA_ERROR: hls.recoverMediaError(); break;
                                default: hls.destroy(); break;
                            }
                        }
                    });

                } else if (mp.canPlayType('application/vnd.apple.mpegurl')) {
                    // Suporte nativo para iPhone/Safari
                    mp.src = src;
                }
            }
        };
        // Verifica a cada 1 segundo se o player da Kick mudou ou recarregou
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
