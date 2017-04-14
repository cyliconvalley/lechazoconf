(function () {
    function getCookie(name) {
        const dc = document.cookie;
        const prefix = name + '=';
        let begin = dc.indexOf('; ' + prefix);
        if (begin === -1) {
            begin = dc.indexOf(prefix);
            if (begin !== 0) return null;
        } else {
            begin += 2;
            let end = document.cookie.indexOf(';', begin);
            if (end === -1) {
                end = dc.length;
            }
            (function () {
                function getCookie(name) {
                    const dc = document.cookie;
                    const prefix = name + '=';
                    let begin = dc.indexOf('; ' + prefix);
                    if (begin === -1) {
                        begin = dc.indexOf(prefix);
                        if (begin !== 0) return null;
                    } else {
                        begin += 2;
                        let end = document.cookie.indexOf(';', begin);
                        if (end === -1) {
                            end = dc.length;
                        }
                    }
                    return unescape(dc.substring(begin + prefix.length, end));
                }

                function resizeIframe() {
                    iFrameResize({
                        checkOrigin: false,
                        heightCalculationMethod: 'taggedElement',
                        inPageLinks: true,
                        scrolling: 'auto'
                    }, '#tkt-iframe');
                }

                function createIframe() {
                    const oHead = document.getElementsByTagName('head')[0];
                    const div = document.getElementById('tkt-content');
                    div.innerHTML = '';

                    const iframe = document.createElement('iframe');
                    iframe.setAttribute('id', 'tkt-iframe');
                    iframe.setAttribute('width', '100%');
                    iframe.setAttribute('frameborder', 0);
                    iframe.setAttribute('scrolling', 'auto');
                    iframe.src = 'https://www.ticketea.com/entradas-conferencia-lechazoconf/custom/';
                    div.appendChild(iframe);

                    const iframe_resizer_script = document.createElement('script');
                    iframe_resizer_script.setAttribute('async', 'true');
                    iframe_resizer_script.type = 'text/javascript';
                    iframe_resizer_script.src = 'js/ticketea/iframeResizer.min.js';
                    iframe_resizer_script.onload = function () {
                        resizeIframe();
                    };
                    iframe_resizer_script.onreadystatechange = function () {
                        let state = this.readyState;
                        if (!state || /loaded|complete/.test(state)) {
                            resizeIframe();
                        }
                    };
                    oHead.appendChild(iframe_resizer_script);
                }

                window.onload = function () {
                    if (
                        navigator.userAgent.indexOf('Safari') !== -1 &&
                        navigator.userAgent.indexOf('Chrome') === -1 &&
                        navigator.userAgent.indexOf('Firefox') === -1
                    ) {
                        const tkt_cookie_set = getCookie('tkt_cookie_set');
                        if (tkt_cookie_set === null) {
                            const ts = new Date().getTime();
                            document.cookie = 'tkt_cookie_set=' + ts;
                            window.location = 'https://www.ticketea.com/echo_view/?referer=' + window.location.href;
                        } else {
                            createIframe();
                        }
                    } else {
                        createIframe();
                    }
                }
            })();
        }
        return unescape(dc.substring(begin + prefix.length, end));
    }

    function resizeIframe() {
        iFrameResize({checkOrigin: false, heightCalculationMethod: 'taggedElement'}, '#tkt-iframe');
    }

    function createIframe() {
        const oHead = document.getElementsByTagName('head')[0];
        const div = document.getElementById('tkt-content');
        div.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'tkt-iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('scrolling', 'disabled');
        iframe.src = 'https://www.ticketea.com/entradas-conferencia-lechazoconf/custom/';
        div.appendChild(iframe);

        const iframe_resizer_script = document.createElement('script');
        iframe_resizer_script.setAttribute('async', 'true');
        iframe_resizer_script.type = 'text/javascript';
        iframe_resizer_script.src = 'js/ticketea/iframeResizer.min.js';
        iframe_resizer_script.onload = function () {
            resizeIframe();
        };
        iframe_resizer_script.onreadystatechange = function () {
            let state = this.readyState;
            if (!state || /loaded|complete/.test(state)) {
                resizeIframe();
            }
        };
        oHead.appendChild(iframe_resizer_script);
    }

    window.onload = function () {
        if (
            navigator.userAgent.indexOf('Safari') !== -1 &&
            navigator.userAgent.indexOf('Chrome') === -1 &&
            navigator.userAgent.indexOf('Firefox') === -1
        ) {
            const tkt_cookie_set = getCookie('tkt_cookie_set');
            if (tkt_cookie_set === null) {
                const ts = new Date().getTime();
                document.cookie = 'tkt_cookie_set=' + ts;
                window.location = 'https://www.ticketea.com/echo_view/?referer=' + window.location.href;
            } else {
                createIframe();
            }
        } else {
            createIframe();
        }
    }
})();