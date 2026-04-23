(function() {
    var senhaCorreta = 'calvo123'; 
    var acesso = prompt("CINE FARIAS TV - Senha:");
    if (acesso !== senhaCorreta) return;

    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var check = function() {
            var v = document.querySelector('video');
            
            if (v && !document.getElementById('f-layer')) {
                if (v.muted || v.volume === 0) {
                    // (Aquele bloco do aviso de som continua aqui se você quiser, 
                    // mas vou focar na economia de recursos agora)
                }

                // --- MODO ECONOMIA DE CELULAR (O PULO DO GATO) ---
                v.muted = false;
                v.volume = 0.01;
                
                // Em vez de só esconder, vamos diminuir o vídeo original para quase nada
                // e dizer ao navegador para não renderizar (display: none as vezes corta o som, 
                // então usamos transform: scale(0) que é mais seguro)
                v.style.cssText = 'position:fixed; top:-9999px; left:-9999px; width:1px; height:1px; transform:scale(0); pointer-events:none;';

                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                v.parentElement.appendChild(d);

                var mp = document.getElementById('meu-player');
                var src = 'https://cinema.felipefariastv.com.br/live/cine/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls();
                    hls.loadSource(src);
                    hls.attachMedia(mp);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() { mp.play(); });
                }
                
                // Manter a trava de 1%
                setInterval(function() {
                    if (v && v.volume !== 0.01) v.volume = 0.01;
                    if (v && v.muted) v.muted = false;
                }, 500);
            }
        };
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
