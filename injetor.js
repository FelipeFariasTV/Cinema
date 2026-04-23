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
                
                if (v.muted || v.volume === 0) {
                    if (!document.getElementById('aviso-config')) {
                        // 1. Overlay mais transparente para ver o fundo
                        var overlay = document.createElement('div');
                        overlay.id = 'aviso-overlay';
                        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:9998;pointer-events:none;';
                        
                        // 2. Caixa do Aviso com largura inteligente
                        var aviso = document.createElement('div');
                        aviso.id = 'aviso-config';
                        
                        // Detecta se é celular para ajustar o tamanho
                        var isMobile = window.innerWidth < 600;
                        var largura = isMobile ? '280px' : '380px';
                        var fontSize = isMobile ? '13px' : '15px';

                        aviso.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:' + largura + ';background:#141414;border:2px solid #05ea63;border-radius:15px;padding:20px;color:#fff;font-family:sans-serif;text-align:center;z-index:9999;box-shadow:0 0 20px rgba(0,0,0,0.8);pointer-events:auto;';
                        
                        aviso.innerHTML = '<h3 style="color:#05ea63;margin:0 0 10px 0;font-size:'+ (isMobile ? '16px' : '20px') +';">🎬 QUASE PRONTO!</h3>' +
                                        '<div style="text-align:left;background:#1a1a1a;padding:12px;border-radius:10px;border:1px solid #333;font-size:'+ fontSize +';line-height:1.3;">' +
                                        '<p style="margin:0 0 8px 0;"><b>1. LIGUE O SOM:</b> Ative o áudio da live para liberar o filme.</p>' +
                                        '<p style="font-size:11px;color:#888;margin:-5px 0 10px 0;">(Baixaremos para 1% sozinho)</p>' +
                                        '<p style="margin:0;"><b>2. ECONOMIA:</b> No celular, mude para <b>160p</b> na engrenagem.</p>' +
                                        '</div>' +
                                        '<p style="margin-top:15px;font-weight:bold;color:#05ea63;animation:pulseCalvo 1s infinite;font-size:'+ fontSize +';">ATIVE O SOM DA KICK ABAIXO</p>' +
                                        '<style>@keyframes pulseCalvo { 0%{opacity:1;} 50%{opacity:0.4;} 100%{opacity:1;} }</style>';
                        
                        v.parentElement.appendChild(overlay);
                        v.parentElement.appendChild(aviso);
                    }
                    return; 
                }

                var overlayExistente = document.getElementById('aviso-overlay');
                if (overlayExistente) overlayExistente.remove();
                var avisoExistente = document.getElementById('aviso-config');
                if (avisoExistente) avisoExistente.remove();

                // --- ATIVAÇÃO DO CINEMA ---
                v.muted = false;
                v.volume = 0.01;
                v.style.cssText = 'position:fixed; top:-9999px; left:-9999px; width:1px; height:1px; transform:scale(0); pointer-events:none;';

                setInterval(function() {
                    if (v && v.volume !== 0.01) v.volume = 0.01;
                    if (v && v.muted) v.muted = false; 
                }, 500);

                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9997;display:flex;align-items:center;justify-content:center;pointer-events:all;';
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
