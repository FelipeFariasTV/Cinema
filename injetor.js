(function() {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var check = function() {
            var v = document.querySelector('video');
            if (v && !document.getElementById('f-layer')) {
                v.muted = true; v.style.opacity = '0';
                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                v.parentElement.appendChild(d);
                var mp = document.getElementById('meu-player');
                // SEU LINK PROFISSIONAL COM CADEADO
                var src = 'https://cinema.felipefariastv.com.br/live/fariastv/index.m3u8';
                if (Hls.isSupported()) {
                    var hls = new Hls({ enableWorker: true, lowLatencyMode: true });
                    hls.loadSource(src); hls.attachMedia(mp);
                } else { mp.src = src; }
            }
        };
        setInterval(check, 1000);
    };
    document.head.appendChild(s);
})();
