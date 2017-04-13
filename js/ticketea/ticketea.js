(function () {
    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + '=';
        var begin = dc.indexOf('; ' + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(';', begin);
            if (end == -1) {
                end = dc.length;
            }
            (function () {
                function getCookie(name) {
                    var dc = document.cookie;
                    var prefix = name + '=';
                    var begin = dc.indexOf('; ' + prefix);
                    if (begin == -1) {
                        begin = dc.indexOf(prefix);
                        if (begin != 0) return null;
                    } else {
                        begin += 2;
                        var end = document.cookie.indexOf(';', begin);
                        if (end == -1) {
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
                    var oHead = document.getElementsByTagName('head')[0];
                    var div = document.getElementById('tkt-content');
                    div.innerHTML = '';

                    var iframe = document.createElement('iframe');
                    iframe.setAttribute('id', 'tkt-iframe');
                    iframe.setAttribute('width', '100%');
                    iframe.setAttribute('frameborder', 0);
                    iframe.setAttribute('scrolling', 'auto');
                    iframe.src = 'https://www.ticketea.com/entradas-conferencia-lechazoconf/custom/';
                    div.appendChild(iframe);

                    var iframe_resizer_script = document.createElement('script');
                    iframe_resizer_script.setAttribute('async', 'true');
                    iframe_resizer_script.type = 'text/javascript';
                    iframe_resizer_script.src = 'js/iframeResizer.min.js';
                    iframe_resizer_script.onload = function () {
                        resizeIframe();
                    };
                    iframe_resizer_script.onreadystatechange = function () {
                        var state = this.readyState;
                        if (!state || /loaded|complete/.test(state)) {
                            resizeIframe();
                        }
                    };
                    oHead.appendChild(iframe_resizer_script);
                }

                window.onload = function () {
                    if (
                        navigator.userAgent.indexOf('Safari') != -1 &&
                        navigator.userAgent.indexOf('Chrome') == -1 &&
                        navigator.userAgent.indexOf('Firefox') == -1
                    ) {
                        var tkt_cookie_set = getCookie('tkt_cookie_set');
                        if (tkt_cookie_set == null) {
                            var ts = new Date().getTime();
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
        var oHead = document.getElementsByTagName('head')[0];
        var div = document.getElementById('tkt-content');
        div.innerHTML = '';

        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'tkt-iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('scrolling', 'disabled');
        iframe.src = 'https://www.ticketea.com/entradas-conferencia-lechazoconf/custom/';
        div.appendChild(iframe);

        var iframe_resizer_script = document.createElement('script');
        iframe_resizer_script.setAttribute('async', 'true');
        iframe_resizer_script.type = 'text/javascript';
        iframe_resizer_script.src = 'js/iframeResizer.min.js';
        iframe_resizer_script.onload = function () {
            resizeIframe();
        };
        iframe_resizer_script.onreadystatechange = function () {
            var state = this.readyState;
            if (!state || /loaded|complete/.test(state)) {
                resizeIframe();
            }
        };
        oHead.appendChild(iframe_resizer_script);
    }

    window.onload = function () {
        if (
            navigator.userAgent.indexOf('Safari') != -1 &&
            navigator.userAgent.indexOf('Chrome') == -1 &&
            navigator.userAgent.indexOf('Firefox') == -1
        ) {
            var tkt_cookie_set = getCookie('tkt_cookie_set');
            if (tkt_cookie_set == null) {
                var ts = new Date().getTime();
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