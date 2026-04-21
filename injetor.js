(function() {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    s.onload = function() {
        var monitorar = function() {
            var vOrig = document.querySelector('video');
            if (vOrig && !document.getElementById('f-layer')) {
                vOrig.muted = true;
                vOrig.style.opacity = '0';
                var d = document.createElement('div');
                d.id = 'f-layer';
                d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
                d.innerHTML = '<video id="meu-player" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain;"></video>';
                vOrig.parentElement.appendChild(d);
                var meuVideo = document.getElementById('meu-player');
                var fonte = 'http://187.45.255.102:8888/live/fariastv/index.m3u8';
                if (Hls.isSupported()) {
                    var hls = new Hls({ enableWorker: true, lowLatencyMode: true });
                    hls.loadSource(fonte);
                    hls.attachMedia(meuVideo);
                } else if (meuVideo.canPlayType('application/vnd.apple.mpegurl')) {
                    meuVideo.src = fonte;
                }
            }
        };
        setInterval(monitorar, 1000);
    };
    document.head.appendChild(s);
})();
