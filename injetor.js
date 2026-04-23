(function() {
    // 1. SEGURANÇA - Senha atualizada
    var senhaCorreta = 'calvo123'; 
    var acesso = prompt("CINE FARIAS TV - Senha:");
    if (acesso !== senhaCorreta) return;

    // 2. CARREGAR BIBLIOTECA HLS
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var check = function() {
            var v = document.querySelector('video');
            
            // Se o player da Kick existir e nosso layer ainda não estiver lá
            if (v && !document.getElementById('f-layer')) {
                
                // --- AJUSTE DE VIEWS (FORÇAR SOM LIGADO EM 1%) ---
                v.muted = false;       // Força a sair do mudo
                v.volume = 0.01;      // Seta em 1% exato
                v.style.opacity = '0'; // Esconde o vídeo original
                
                // Cria o container do seu player customizado
                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;pointer-events:all;';
                
                // Injeta o novo elemento de vídeo (seu cinema)
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                v.parentElement.appendChild(d);

                var mp = document.getElementById('meu-player');
                var src = 'https://cinema.felipefariastv.com.br/live/cine/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls();
                    hls.loadSource(src);
                    hls.attachMedia(mp);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        mp.play();
                    });

                    // Tratamento de erros
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
                    mp.src = src;
                }
            }
        };
        // Verifica a cada 1 segundo
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
