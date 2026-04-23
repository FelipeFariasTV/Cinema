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
                    if (!document.getElementById('aviso-config')) {
                        var overlay = document.createElement('div');
                        overlay.id = 'aviso-overlay';
                        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9998;pointer-events:none;';
                        
                        var isMobile = window.innerWidth < 600;
                        var largura = isMobile ? '240px' : '350px'; // Reduzi ainda mais!

                        var aviso = document.createElement('div');
                        aviso.id = 'aviso-config';
                        aviso.style.cssText = 'position:absolute;top:45%;left:50%;transform:translate(-50%, -50%);width:' + largura + ';background:#141414;border:2px solid #05ea63;border-radius:12px;padding:15px;color:#fff;font-family:sans-serif;text-align:center;z-index:9999;box-shadow:0 0 15px #000;pointer-events:auto;';
                        
                        aviso.innerHTML = '<h4 style="color:#05ea63;margin:0 0 10px 0;font-size:14px;">🎬 QUASE PRONTO!</h4>' +
                                        '<div style="text-align:left;background:#000;padding:10px;border-radius:8px;border:1px solid #333;font-size:11px;line-height:1.2;">' +
                                        '<p style="margin:0 0 5px 0;"><b>1. LIGUE O SOM:</b> Ative o áudio para liberar.</p>' +
                                        '<p style="margin:0;"><b>2. ECONOMIA:</b> Mude para <b>160p</b> na engrenagem.</p>' +
                                        '</div>' +
                                        '<p style="margin-top:12px;font-weight:bold;color:#05ea63;animation:p 1s infinite;font-size:11px;">ATIVE O SOM DA KICK ABAIXO</p>' +
                                        '<style>@keyframes p {0%{opacity:1;} 50%{opacity:0.3;} 100%{opacity:1;}}</style>';
                        
                        v.parentElement.appendChild(overlay);
                        v.parentElement.appendChild(aviso);
                    }
                    return; 
                }

                var ov = document.getElementById('aviso-overlay'); if (ov) ov.remove();
                var av = document.getElementById('aviso-config'); if (av) av.remove();

                v.muted = false; v.volume = 0.01;
                v.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;transform:scale(0);';

                setInterval(function() {
                    if (v && v.volume !== 0.01) v.volume = 0.01;
                    if (v && v.muted) v.muted = false; 
                }, 500);

                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9997;display:flex;align-items:center;justify-content:center;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                v.parentElement.appendChild(d);

                var mp = document.getElementById('meu-player');
                var src = 'https://cinema.felipefariastv.com.br/live/cine/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls(); hls.loadSource(src); hls.attachMedia(mp);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() { mp.play(); });
                }
            }
        };
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
