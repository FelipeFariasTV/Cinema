(function() {
    // 1. SEGURANÇA
    var senhaCorreta = 'calvo123'; 
    var acesso = prompt("CINE FARIAS TV - Senha:");
    if (acesso !== senhaCorreta) return;

    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var check = function() {
            var v = document.querySelector('video');
            
            if (v && !document.getElementById('f-layer')) {
                
                // --- A TRAVA DO CALVO ---
                if (v.muted || v.volume === 0) {
                    if (!document.getElementById('aviso-som')) {
                        var aviso = document.createElement('div');
                        aviso.id = 'aviso-som';
                        aviso.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#05ea63;font-family:sans-serif;padding:20px;text-align:center;';
                        aviso.innerHTML = '<h2 style="margin-bottom:10px;">⚠️ SOM DESATIVADO DETECTADO</h2>' +
                                        '<p style="color:#fff;font-size:16px;">Para usar o Cine Farias, o som da live original <b>PRECISA</b> estar ativado.</p>' +
                                        '<p style="color:#888;font-size:14px;margin-top:10px;">Não se preocupe: o volume será baixado automaticamente para 1%.</p>' +
                                        '<p style="margin-top:20px;font-weight:bold;animation:pulse 1s infinite;">LIGUE O SOM DA KICK PARA LIBERAR O FILME</p>' +
                                        '<style>@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }</style>';
                        v.parentElement.appendChild(aviso);
                    }
                    return; // Interrompe a execução aqui. O cinema não abre.
                }

                // Se chegou aqui, é porque o som está ligado! Remove o aviso se ele existir.
                var avisoExistente = document.getElementById('aviso-som');
                if (avisoExistente) avisoExistente.remove();

                // --- INICIALIZAÇÃO DO CINEMA ---
                // Forçamos o 1% para não estourar o ouvido de ninguém
                v.volume = 0.01;
                v.style.opacity = '0'; 

                // Mantém o volume em 1% sem parar
                setInterval(function() {
                    if (v && v.volume !== 0.01) v.volume = 0.01;
                    if (v && v.muted) v.muted = false; 
                }, 500);

                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;pointer-events:all;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                v.parentElement.appendChild(d);

                var mp = document.getElementById('meu-player');
                var src = 'https://cinema.felipefariastv.com.br/live/cine/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls();
                    hls.loadSource(src);
                    hls.attachMedia(mp);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() { mp.play(); });
                    hls.on(Hls.Events.ERROR, function(e, data) {
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
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
