(function() {
    // 1. SEGURANÇA
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
                    var hls = new Hls(); // SEM CONFIGURAÇÕES, MODO PADRÃO
                    hls.loadSource(src);
                    hls.attachMedia(mp);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        mp.play();
                    });
                } else if (mp.canPlayType('application/vnd.apple.mpegurl')) {
                    // Para iPhones e Safari (Modo Nativo do Sistema)
                    mp.src = src;
                    mp.addEventListener('loadedmetadata', function() {
                        mp.play();
                    });
                }
            }
        };
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
