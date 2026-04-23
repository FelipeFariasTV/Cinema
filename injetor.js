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
                
                // --- AVISO DE CONFIGURAÇÃO (SOM + QUALIDADE) ---
                if (v.muted || v.volume === 0) {
                    if (!document.getElementById('aviso-config')) {
                        var aviso = document.createElement('div');
                        aviso.id = 'aviso-config';
                        aviso.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#05ea63;font-family:sans-serif;padding:30px;text-align:center;';
                        aviso.innerHTML = '<h2 style="margin-bottom:15px;">🎬 QUASE PRONTO!</h2>' +
                                        '<div style="text-align:left; color:#fff; background:#1a1a1a; padding:20px; border-radius:15px; border:1px solid #05ea63;">' +
                                        '<p><b>1. LIGUE O SOM:</b> A live da Kick precisa estar com som para o filme carregar.</p>' +
                                        '<p style="font-size:12px; color:#888; margin-bottom:15px;">(O volume será baixado para 1% automaticamente)</p>' +
                                        '<p><b>2. ECONOMIZE BATERIA:</b> Se estiver no celular, mude a qualidade da Kick para <b>160p</b> na engrenagem antes de ativar.</p>' +
                                        '</div>' +
                                        '<p style="margin-top:25px; font-weight:bold; color:#05ea63; animation:pulse 1s infinite;">LIGUE O SOM DA KICK PARA COMEÇAR</p>' +
                                        '<style>@keyframes pulse { 0%{opacity:1;} 50%{opacity:0.4;} 100%{opacity:1;} }</style>';
                        v.parentElement.appendChild(aviso);
                    }
                    return; 
                }

                var avisoExistente = document.getElementById('aviso-config');
                if (avisoExistente) avisoExistente.remove();

                // --- ATIVAÇÃO DO PLAYER ---
                v.muted = false;
                v.volume = 0.01;
                // Esconde e tira o peso da renderização
                v.style.cssText = 'position:fixed; top:-9999px; left:-9999px; width:1px; height:1px; transform:scale(0);';

                setInterval(function() {
                    if (v && v.volume !== 0.01) v.volume = 0.01;
                    if (v && v.muted) v.muted = false; 
                }, 500);

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
            }
        };
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
