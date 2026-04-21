(function() {
    const monitorar = () => {
        const v = document.querySelector('video');
        if (v && !document.getElementById('f-layer')) {
            v.muted = true; 
            v.style.opacity = '0'; 
            const d = document.createElement('div');
            d.id = 'f-layer';
            d.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
            d.innerHTML = '<h2 style="color:#05ea63;font-family:sans-serif;">CINE FARIAS CONECTANDO...</h2>';
            v.parentElement.appendChild(d);
        }
    };
    setInterval(monitorar, 1000);
})();
