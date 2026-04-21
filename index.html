(function() {
    // 1. CONFIGURAÇÃO DE SEGURANÇA
    var senhaCorreta = '123'; // Altere para a senha que você desejar
    var acesso = prompt("CINE FARIAS TV - Digite a senha de acesso:");

    if (acesso !== senhaCorreta) {
        alert("Senha incorreta! Acesso negado.");
        return;
    }

    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var monitorar = function() {
            var vOrig = document.querySelector('video');
            if (vOrig && !document.getElementById('f-layer')) {
                // Esconde o player original da Kick
                vOrig.muted = true; 
                vOrig.style.opacity = '0';

                // Cria a camada do seu Cinema
                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                vOrig.parentElement.appendChild(d);

                var meuPlayer = document.getElementById('meu-player');
                var fonte = 'https://cinema.felipefariastv.com.br/live/fariastv/index.m3u8';

                if (Hls.isSupported()) {
                    var hls = new Hls({
                        enableWorker: true,
                        lowLatencyMode: true,     // Ativa modo de baixa latência
                        backBufferLength: 30,     // Limpa o que já passou (alivia o celular)
                        maxBufferLength: 6,       // Mantém apenas 6 segundos na frente (evita atraso)
                        maxMaxBufferLength: 10,
                        manifestLoadingMaxRetry: 20
                    });
                    hls.loadSource(fonte);
                    hls.attachMedia(meuPlayer);
                } else if (meuPlayer.canPlayType('application/vnd.apple.mpegurl')) {
                    meuPlayer.src = fonte;
                }
            }
        };
        setInterval(monitorar, 1000);
    };
    document.head.appendChild(s);
})();
