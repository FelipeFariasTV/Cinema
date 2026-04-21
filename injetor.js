(function() {
    const monitorar = () => {
        const v = document.querySelector('video');
        if (v && !document.getElementById('f-layer')) {
            v.muted = true; 
            v.style.opacity = '0'; 
            const d = document.createElement('div');
            d.id = 'f-layer';
            d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
            d.innerHTML = `
                <div style="text-align:center;width:100%;height:100%;">
                    <video id="meu-player" controls autoplay style="width:100%;height:100%;object-fit:contain;">
                        <source src="http://187.45.255.102:8888/live/fariastv/index.m3u8" type="application/x-mpegURL">
                    </video>
                </div>`;
            v.parentElement.appendChild(d);
        }
    };
    setInterval(monitorar, 1000);
})();
