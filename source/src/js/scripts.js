//PREPEND POLYFILL
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


//APPEND POLYFILL

(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


var grid_support = typeof document.createElement('div').style.grid === 'string';
try {
    let _grid = grid_support ? 'grid' : 'block';
    document.documentElement.style.setProperty('--grid', `${_grid}`);
} catch (e) { }





var bb_, visCur_, iMe, desktopOnlyOffset, frameWatcher, invoiceframe, clickWatcher, invoiceframeDoc, workingCurrency, returnScroll, scrollingLoop, startX, scrollLeft, dyW, addedIndexPlaceholders, curInd, iframeStageDetection = 0,
    gi_wFl = 0,
    sLe,
    indicationDelivered = !1,
    mousePositionDown = !1,
    index = 0,
    sym = ["$", "£", "€", "₿"],
    symass = {
        "usd": "$",
        "cad": "$",
        "gbp": "£",
        "eur": "€",
        "btc": "₿"
    },
    choicesCount = document.querySelectorAll(".choice_").length;
window.englihs = Array(), window.textElements = ["span", "p", "h1", "h2", "h3", "h4", "i", "b", "a", "li", "button"], dyW = .7 * document.documentElement.clientWidth > 400 ? 400 : .7 * document.documentElement.clientWidth;
window.aV_ = [1, 5, 20, 100];

window.lurl = String(window.location.href).replace("https://btcpayserver.org", "").replace("https://btcpayserver.flat18.co.uk", "").replace("/", "").split('/')[0];

var growChoice, dirkey, carouselMoving, cmTO, bosym, bosymset, loopPosition = 0,
    cFirst = getScrollAmount(document.querySelector(".choice_")),
    choices_ = document.getElementById("choices_"),
    geo = [],
    fA = document.documentElement.clientWidth / 300 > 1 ? parseInt(document.documentElement.clientWidth / 300) : 1;
for (addedIndexPlaceholders = parseInt(parseFloat(fA / 2)), i = 0; i < addedIndexPlaceholders; i++) {
    var befH = document.createElement("div");
    befH.setAttribute("class", "placeholderChoice beforePH"), befH.setAttribute("onclick", "carousel(choicesCount-1)");
    var aftH = document.createElement("div");
    aftH.setAttribute("class", "placeholderChoice afterPH"), aftH.setAttribute("onclick", "carousel(0)"), choices_.prepend(befH), choices_.appendChild(aftH)
}

function getMobileStatus() {
    iMe = !1, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (iMe = !0)
}

function toggleMobileMenu() {
    document.getElementById("menuContents").style.display = "grid"
}

function closeMenu() {
    document.getElementById("menuContents").removeAttribute("style")
}

function endVideo() {
    document.getElementById("videoContainer").style.display = "none", document.getElementById("videoContainer_video0").innerHTML = ""
}

function playVideo() {
    var e = document.getElementById("videoContainer_video0");
    e.innerHTML = '<iframe id="videoContainerVideoPayload_0" src="https://www.youtube-nocookie.com/embed/ZIfJyq9RimM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', document.getElementById("videoContainer").style.display = "grid", document.getElementById("videoContainerVideoPayload_0").width = e.clientWidth, document.getElementById("videoContainerVideoPayload_0").height = e.clientWidth / 1.529
}

function setClickWatch() {
    if (grid_support) {
        document.querySelectorAll("a").forEach(function (e) {
            e.addEventListener("click", function (e) {
                e.stopPropagation()
            })
        }), document.querySelectorAll(".choices_holder")[0].removeAttribute("style"), document.getElementById("choices_holder").addEventListener("mousedown", function (e) {
            mousePositionDown = !0, startX = e.pageX - document.getElementById("choices_").offsetLeft, scrollLeft = document.getElementById("choices_").scrollLeft
        }), document.getElementById("choices_").addEventListener("mouseleave", function () {
            mousePositionDown = !1
        }), document.getElementById("choices_").addEventListener("mouseup", function () {
            mousePositionDown = !1
        }), document.getElementById("choices_").addEventListener("mousemove", function (e) {
            if (mousePositionDown) {
                e.preventDefault();
                var t = 3 * (e.pageX - document.getElementById("choices_").offsetLeft - startX);
                document.getElementById("choices_").scrollLeft = scrollLeft - t
            }
        })
    }
}
gradient = function (e) {
    return "rgb(" + (15 * e >= 200 ? 0 : 200 - 15 * e) + ",210," + (15 * e >= 200 ? 15 * e : 0) + ")"
}, getMobileStatus();

if (grid_support) {
    try {
        document.getElementById("choices_").addEventListener("scroll", function (t) {

            var c = document.getElementById("choicesUIShadowXScrollPre"),
                d = document.getElementById("choicesUIShadowXScroll");
            c && t.scrollLeft >= 100 ? c.style.opacity = 1 : c && (c.style.opacity = 0), d && t.scrollLeft <= 450 ? d.style.opacity = 1 : d && (d.style.opacity = 0)
        })
    } catch (e) { }
}


function scrollTo(e, t) {
    var n = t || 1,
        o = document.getElementById(e),
        i = window.scrollY ? window.scrollY : 0;
    animate(document.scrollingElement || document.documentElement, "scrollTop", "", i, o.offsetTop - n, 750, !0)
}

function animate(e, t, n, o, i, r, l) {
    if (e) {
        var c = (new Date).getTime(),
            s = setInterval(function () {
                var a = Math.min(1, ((new Date).getTime() - c) / r);
                l ? e[t] = o + a * (i - o) + n : e.style[t] = o + a * (i - o) + n, 1 === a && clearInterval(s)
            }, 1);
        l ? e[t] = o + n : e.style[t] = o + n
    }
}

function alterHTML(e, t, n) {
    var o = document.createElement("div");
    switch (o.innerHTML = t, n) {
        case "append":
            for (; o.children.length > 0;) e.appendChild(o.children[0]);
            break;
        case "prepend":
            for (; o.children.length > 0;) e.prepend(o.children[0])
    }
}





var wkCur_, ivFr_, frWtr_, ckWr_, ivFr_Doc, val_, ifSD_, storeId = "EErYwCthBNfJUpuU1etH1uhg3x1YVH1q1F2zez7u1AAX",
    storeURL = "donate.btcpayserver.org";




function setJSEnvironment() {
    //CURRENTLY USING TRYS TO AVOID BLOCKING ANY SCRIPTS IF ELEMENTS HAVE MOVED OR DISAPPEARED FROM DOM/HTML
    try {
        if (grid_support) {
            document.getElementById("choices_").removeAttribute("style"), document.getElementById("choices_").removeAttribute("class"), document.querySelectorAll(".nonJavascriptMessage").forEach(function (e) {
                e.style.display = "none"
            }), document.querySelectorAll(".oF_JS_Env").forEach(function (e) {
                e.style.display = ""
            }), document.querySelectorAll(".demoBlockText")[0].style.display = "", document.getElementById("infoButton01").removeAttribute("style", ""), document.getElementById("infoButton01").addEventListener("click", function () {
                document.getElementById("furtherQuote").style.display = "unset", document.getElementById("infoButton01").style.display = "none"
            }), document.getElementById("furtherQuote").style.display = "none", curInd = !curInd || isNaN(curInd) ? 0 : curInd, document.querySelectorAll(".valueSelectorHolder").forEach(function (e) {
                e.querySelectorAll("select").forEach(function (e) {
                    e.selectedIndex = curInd
                })
            })
        }
    } catch (e) { }
    try {

        var t = .85 * document.documentElement.clientWidth >= 500 ? .35 * document.documentElement.clientWidth >= 500 ? 500 : .35 * document.documentElement.clientWidth : .85 * document.documentElement.clientWidth;
        document.getElementById("unfetteredVideoFrame").style.width = t + "px", document.getElementById("unfetteredVideoFrame").style.height = (t - 0) / 1.78 + "px";
    } catch (e) { }
    try {
        if (bb_ != 1) {
            bb_ = 1;
            //CONSIDER LOOP FOR APPENDING TO CURTAIN VIEW
            var a = window.aV_;

            document.querySelectorAll('.jsR_don').forEach(function (p) {
                c = 0;
                for (i = 0; i < a.length; i++) {
                    var e = document.createElement('div');
                    var b = "rgba(255,255,255,0.8)";
                    c++;
                    var d = "rgba(255,255,255,0.9)";
                    c++;
                    e.style.background = "linear-gradient(90deg," + b + "," + d + ")";
                    e.innerHTML = "<span class=\"cur-val-no\">" + a[i] + "</span><span class=\"q-pay-unit cur-val-fu\">USD</span>";
                    e.classList.add('q-pay');
                    e.setAttribute('onclick', 'val_=Number(this.querySelectorAll(".cur-val-no")[0].innerHTML);mfC();genInvoice_();')
                    p.appendChild(e);
                }
                var b = "rgba(255,255,255,0.8)";
                c++;
                var d = "rgba(255,255,255,0.9)";
                c++;
                var e = document.createElement('div');
                e.style.background = "linear-gradient(90deg," + b + "," + d + ")";
                k = "<span class=\"cdon-am-tx\">" + window.donationTitle + "</span>";
                e.innerHTML = k + "<input onclick=\"sAt_(this);\" onkeyup=\"vrN(this, event)\" type=\"number\" pattern=\"[0-9]*\" name=\"price\" value=\"250\" placeholder=\"250\" class=\"cust-amt-inv-but c-a-i-b\" /><span class=\"q-pay-unit cur-val-fu\">USD</span>";
                e.classList.add('q-pay');
                var u = document.createElement('button');
                u.setAttribute('alt', 'Pay with BtcPay, Self-Hosted Bitcoin Payment Processor');
                u.innerHTML = window.donWor.toLowerCase();
                u.setAttribute('onclick', 'val_=this.parentNode.querySelectorAll(".c-a-i-b")[0].value;mfC();genInvoice_(this);')
                e.appendChild(u);
                p.appendChild(e);
            });

            var n = document.getElementById('disposable-top-donation-cta');
            var e = document.createElement('button');
            e.setAttribute("alt", "Pay with BtcPay, Self-Hosted Bitcoin Payment Processor");
            e.setAttribute("onclick", "val_=this.parentNode.querySelectorAll('.c-a-i-b')[0].value;mfC();genInvoice_(this);");
            e.innerHTML = "&nbsp;" + window.donWor + "&nbsp;<i class=\"fas fa-chevron-circle-" + window.rl + "\"></i>";
            n.replaceWith(e);

            var i = document.createElement('input');
            i.setAttribute("class", "c-a-i-b input-a res_le");
            i.setAttribute("onclick", "sAt_(this);");
            i.setAttribute("onkeyup", "vrN(this, event);rGr(this);");
            i.setAttribute("oninput", "vrN(this, event);rGr(this);");
            i.setAttribute("onchange", "vrN(this, event);rGr(this);");
            i.setAttribute("type", "number");
            i.setAttribute("pattern", "^\d+(\.|\,)\d{2}$");
            i.setAttribute("name", "price");
            i.setAttribute("value", "5");
            i.setAttribute("placeholder", "5");
            i.setAttribute("step", "1");
            document.getElementById('c-i-ab-v').replaceWith(i);



        }
    } catch (e) { }
    try {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    } catch (e) { }
    try {
        var unfetteredVideoFrame = document.getElementById('unfetteredVideoFrame');
        var e = new Image();
        e.set = "100px"
        e.src = "/img/clip602.gif";
        var posterGif = function () {
            unfetteredVideoFrame.setAttribute("poster", "/img/clip602.gif")
        };
        var unposterGif = function () {
            unfetteredVideoFrame.setAttribute("poster", "/img/vidph.svg")
        };

        unfetteredVideoFrame.addEventListener("mouseenter", posterGif, true);

        unfetteredVideoFrame.addEventListener("mouseleave", unposterGif, true);
        var eventCleanup = 0;
        unfetteredVideoFrame.addEventListener("play", function () {
            unfetteredVideoFrame.setAttribute("poster", "/img/vidph.svg");
            unfetteredVideoFrame.play();
            unfetteredVideoFrame.removeEventListener("mouseenter", posterGif, true);
            unfetteredVideoFrame.removeEventListener("mouseleave", unposterGif, true);
        });
    } catch (e) { }

    try {
        document.getElementById('t-ct-d-v-0').selectedIndex = 0;
    } catch (e) {
        console.log(e)
    }

}

function sAt_(t) {
    try {
        t.select() || t.setSelectionRange(0, t.value.length);
    } catch (e) { }
    try {
        t.parentNode.querySelectorAll('.cursor')[0].style.display = "none";
    } catch (e) { }
}

function vrN(t, e) {

    var l = t.value.replace("^\d+(\.|\,)\d{2}$", "");
    if (13 == e.keyCode) {
        val_ = t.value, mfC(), genInvoice_();
    }
    if (!t.value || isNaN(t.value)) {
        gi_wFl = 1;
    } else {
        gi_wFl = 0;
    }

}

function tValid(t) {
    var n = t.value;
    var m = parseFloat(String(n) + '0');
    if (isNaN(m) || m <= 0) {
        t.value = 5
    };
}

function rGr(t) {
    !t.value.length && tValid(t);
    if (t.classList.contains('input-a')) {
        var l = t.value.length + 2 - (t.value.length * .3);
        t.style['max-width'] = l + "rem";
    }
}


function setVisCur(e) {
    var x = 0.0002;
    visCur_ = e;
    wkCur_ = (e).toUpperCase();
    document.querySelectorAll('.cur-val-fu').forEach(function (t) {
        if (String(t.nodeName).toUpperCase() !== "SELECT") {
            t.value = (e).toUpperCase();
            t.innerHTML = (e).toUpperCase();
        } else {
            switch (e) {
                case "btc":
                    var f = 0;
                    break;
                case "usd":
                    var f = 1;
                    break;
                case "cad":
                    var f = 2;
                    break;
                case "eur":
                    var f = 3;
                    break;
                case "gbp":
                    var f = 4;
                    break;
            }
            foTO(f);
        }
    })
    switch (e) {
        case "btc":
            var f = 1;
            break;
        case "usd":
            var f = 0;
            break;
        case "cad":
            var f = 2;
            break;
        case "eur":
            var f = 3;
            break;
        case "gbp":
            var f = 4;
            break;
    }
    document.getElementById('t-ct-d-v-0').selectedIndex = f;
    document.querySelectorAll('.valueSelectorHolder').forEach(function (t) {
        var t = t.querySelectorAll('select')[0];
        for (var i = 0, j = t.options.length; i < j; ++i) {
            if ((t.options[i].innerHTML).toUpperCase() === (e).toUpperCase()) {
                t.selectedIndex = i;
            }
        }
    })
    if (wkCur_ == "BTC") {
        var i = 0;
        document.querySelectorAll('.cur-val-no').forEach(function (e) {
            i = i % aV_.length;
            var n = isNaN(e.innerHTML) != true ? e.innerHTML : isNaN(e.value) != true ? e.value : 1;
            if (n != (window.aV_[i] * x)) {
                n = n * x;
                e.innerHTML = n;
                e.value = n;
            }
            i++;
        });
    } else {
        var i = 0;
        document.querySelectorAll('.cur-val-no').forEach(function (e) {
            i = i % aV_.length;
            var n = isNaN(e.innerHTML) != true ? e.innerHTML : isNaN(e.value) != true ? e.value : 1;
            if (n != window.aV_[i]) {
                n = n / x;
                e.innerHTML = n;
                e.value = n;
            }
            i++;
        });
    }
}

function foTO(i) {
    var t = '.vci-in-m';
    document.querySelectorAll('.currencyOpts').forEach(function (e) {
        e.querySelectorAll(t).forEach(function (f) {
            f.classList.remove('focused')
        })
    });
    document.querySelectorAll('.currencyOpts').forEach(function (e) {
        e.querySelectorAll(t)[i].classList.add('focused')
    })
}

function randomString(e) {
    var t = "";
    for (n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", o = e; o > 0; --o) t += n[Math.floor(Math.random() * n.length)];
    return t;
}

function startTimerInvoice() {
    var e, t = 0,
        n = 14;
    e = 59;
    var o = document.getElementById("countDownTimer");
    window.setInterval(function () {
        function i() {
            t++;
            var e = document.getElementById("timer-row__progress-bar"),
                n = document.getElementById("timer-row");
            e.style.width = n.clientWidth - (n.clientWidth - 50) * ((900 - t) / 900)
        }
        i(), "00" === e && (e = Number(60), n--), 1 == e && (e = String("00")), "00" != e && e--;
        var r = String(e).length > 1 ? "" : "0";
        o.innerHTML = n + ":" + r + e, i()
    }, 1e3)
}

function genInvoice_(e) {
    if (e) {
        if (!e.parentNode.querySelectorAll(".c-a-i-b")[0].value || e.parentNode.querySelectorAll(".c-a-i-b")[0].value <= 0 || isNaN(e.parentNode.querySelectorAll(".c-a-i-b")[0].value)) {
            e.parentNode.querySelectorAll(".c-a-i-b")[0].value = 1;
            val_ = e.parentNode.querySelectorAll(".c-a-i-b")[0].value;
            gi_wFl = 1;
        } else {
            gi_wFl = 0;
        }
    } else {

    }
    var val_neat = val_ < 0.01 ? Number(val_).toFixed(val_.split(".")[1].length) : Number(val_).toFixed(2);
    var t = document.getElementById('donParent');
    var f = gi_wFl != 0 ? "&nbsp;<i class=\"fas fa-exclamation-triangle don-iss\"></i>" : "";
    t.querySelector(".modPar");
    if (t.querySelector(".GenerateInvoiceButton").style.display = "none",
        t.querySelector(".jsInvoiceWorkspacePre").style.display = "none", t.querySelector(".statusButton").style.display = "", wkCur_ = wkCur_ || "USD", !ivFr_, t.querySelector(".genIn_").innerHTML = t.querySelector(".genIn_").innerHTML.replace("...", ""), t.querySelector(".genVal_").innerHTML = "<br>" + symass[wkCur_.toLowerCase()] + " " + val_neat + " (" + wkCur_.toLowerCase() + ") " + f) {
        var n = val_ || 5;
        var r = window.rl == "left" ? "rtl" : "ltr";
        (ivFr_ = document.createElement("iframe")).style.border = "none", ivFr_.setAttribute("dir", r), ivFr_.setAttribute("onLoad", "window.informOfProgress(event, this);"), ivFr_.setAttribute("srcdoc", '<!doctype html><html dir="' + r + '"><body><form method="POST"  action="https://' + storeURL + '/api/v1/invoices/?lang=' + window.language + '" style="width:0px;height:0px"><input type="hidden" name="storeId" value="' + storeId + '" /><input type="hidden" name="price" value="' + n + '" /><input type="hidden" name="currency" value="' + wkCur_ + '" /><input type="hidden" name="lang" value="sv" /><input type="image" src="" name="submit"></form></body></html>'), ivFr_.style.height = "0px", ivFr_.style.width = "0px", ivFr_.style.visibility = "hidden", t.querySelector(".jsInvoiceWorkspace").appendChild(ivFr_)
    }
    var z = document.querySelectorAll('.closeVideoWindow')[0].getBoundingClientRect().height > 0 ? document.querySelectorAll('.closeVideoWindow')[0].getBoundingClientRect().height : 40;
    var x = window.innerHeight - z >= 720 ? 720 : window.innerHeight - z;
    sLe = 0;
    wfCh("btcpay", x, t)
}


function wfCh(e, t, n) {
    var o = n.querySelector(".modPar"),
        i = "btcpay" === e ? 1 : 0,
        r = "btcpay" === e ? 2 : 1;
    frWtr_ = setInterval(function () {
        var e = n.querySelector("iframe");
        ifSD_ == r && (clearInterval(frWtr_), setTimeout(function () {
            var i = t || 720;
            var x = 720 <= window.innerHeight - 45 ? 720 : window.innerHeight - 45;
            var d = 720 <= window.innerHeight - 60 ? 0 : 60;
            var z = x - 10;
            n.querySelector(".jsInvoiceWorkspace").style.display = "block", n.querySelector(".statusButton").style.display = "none", e.style.height = z + "px", n.querySelector(".jsInvoiceWorkspace").style.height = x + "px", n.querySelector(".jsInvoiceWorkspace").classList.add('js-i-ws-to-sc'),
                o.style.width = "350px", e.style.width = "100%", e.style.visibility = "visible"
            sLe == 0 && setTimeout(function () {
                sLe = 1;
                document.querySelectorAll('.jsInvoiceWorkspace')[0].scrollTo({
                    top: d,
                    left: 0,
                    behavior: 'smooth'
                });
            }, 500);
        }, 300)), ifSD_ == i && (ckWr_ || (ivFr_Doc = e.contentDocument).querySelector("form") && (ivFr_Doc.querySelector("form").submit(), ckWr_ = 1, o.style.width = "350px"))
    }, 600)
}

function cDon(e) {
    var e = e ? e : document.querySelectorAll('.closeDonationButton')[0];
    var t = e.parentNode,
        n = t.querySelectorAll(".modPar")[0];
    t.querySelector(".GenerateInvoiceButton").style.display = "", e.style.visibility = "hidden", n.style.width = "", t.querySelector(".statusButton").style.display = "none", t.querySelector(".jsInvoiceWorkspacePre").style.display = "", ivFr_ = void 0, ckWr_ = void 0, t.querySelector(".jsInvoiceWorkspace").style.display = "none", t.querySelector(".jsInvoiceWorkspace").innerHTML = "", ifSD_ = 0;
}

function adjV(e, t, n) {
    var o = n.parentNode,
        i = o.querySelectorAll(".finalValue_")[0].getAttribute("value"),
        r = Number(i);
    r = r <= 1 ? 1 : r;
    var l = " onkeyup=\"adjV('verify', event, this)\"";
    switch (e) {
        case "minus":
            var c = r - 1 >= 1 ? (r - 1).toFixed(2) : (1).toFixed(2);
            o.querySelectorAll(".finalValue_")[0].outerHTML = '<input class="form-control finalValue_ bounce_" value="' + c + '" type="text" placeholder="' + c + '"' + l + "/>", val_ = Number(c)
            break;
        case "plus":
            var s = r + 1 >= 1 ? (r + 1).toFixed(2) : (1).toFixed(2);
            o.querySelectorAll(".finalValue_")[0].outerHTML = '<input class="form-control finalValue_ bounce_" value="' + s + '" type="text" placeholder="' + s + '"' + l + "/>", val_ = Number(s)
            break;
        case "verify":
            (0 != isNaN(Number(t.key)) && 1 != [".", "Backspace", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(t.key) ? (o.querySelectorAll(".finalValue_")[0].outerHTML = '<input class="form-control finalValue_ bounce_" value="5" type="text" placeholder="5.00"' + l + "/>", o.querySelectorAll(".finalValue_")[0].focus(), val_ = 5) : (n.value = n.value, val_ = Number(n.value))), r < 0.01 && (o.querySelectorAll(".finalValue_")[0].innerHTML = 0.01)
            break;
    }
}

function stC(e) {
    wkCur_ = e.value, curInd = e.selectedIndex, setVisCur(e.value);
}

function mfC() {
    document.body.classList.add('no-scroll');
    document.getElementById('p-nm-co-ho').classList.add('blur');


    var e = document.createElement("p"),
        t = document.querySelector(".curtainWorkspace").querySelector(".jsInvoiceWorkspacePre");
    document.querySelector(".curtainWorkspace").querySelectorAll(".valueControlBtn").forEach(function (e) {
        e.style.display = "none"
    });
    var n = document.createElement("div");
    t.querySelectorAll("select").forEach(function (e) {
        e.selectedIndex = curInd
    }), document.getElementById("curtainGen").style.display = "";
    uPHis('/#donate');
}

function closeCurtain() {
    document.body.classList.remove('no-scroll');
    document.getElementById('p-nm-co-ho').classList.remove('blur');
    document.getElementById("curtainGen").style.display = "none";
    cDon();
    uPHis('/');
}


function uPHis(e, s) {
    f = e.substr(0, 1);
    if (e == "/") {
        e = e + window.lurl + e;
    }
    if (e.substr(0, 1) == "#" || e.substr(0, 2) == "/#") {
        e = "/" + window.lurl + "/" + e.replace("/", "");
    }
    var t = e.replace("//", "/"),
        n = {
            page: t
        };
    history.pushState(n, t, t)
}
window.onpopstate = function (e) {
    historyMan()
}

function historyMan(e) {
    try {
        n = String(window.location.href).replace("https://btcpayserver.org", "").replace("https://btcpayserver.flat18.co.uk", "").replace("/", "").replace(window.lurl, "").replace("/", "");
        switch (n) {
            case "#donate":
                // cDon();
                // mfC();
                // uPHis(n);
                window.location = "/donate";
                break;
            case "#invoicing":
                genInvoice_();
            default:
                if (n.length > 1) {

                } else {
                    cDon();
                    closeCurtain();
                }
        }
    } catch (e) {
        console.log(e);
    }
}


function openCurrencyOptions(e) {
    document.getElementById("cOpt_").setAttribute("open", !0)
}

function focusLanguagePicker() {
    var e = document.getElementById("LanguagePicker");
    if (e.style.display = "", e.focus(), document.createEvent) {
        var t = document.createEvent("MouseEvents");
        t.initMouseEvent("mousedown", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), e.dispatchEvent(t)
    } else element.fireEvent && e.fireEvent("onmousedown");
    document.getElementById("lnNom").style.display = "none"
}

function systemAlert(e, t) {
    t = t || "No message", clearTimeout(bosym), clearTimeout(bosymset), document.getElementById("systemAlert").style.display = "none", document.getElementById("systemAlert").innerHTML = "<b>" + e + "</b><p>" + t + "</p>", bosymset = setTimeout(function () {
        document.getElementById("systemAlert").style.display = "block"
    }, 10), bosym = setTimeout(function () {
        document.getElementById("systemAlert").style.display = "none"
    }, 1e4)
}

function toggle_(e) {
    if ("#" === String(e).substring(0, 1)) {
        var t = e.substring(1, e.length);
        document.getElementById(t).style.display = "none" == document.getElementById(t).style.display ? "" : "none"
    } else if ("." === String(e).substring(0, 1)) document.querySelectorAll(e).forEach(function (e) {
        e.style.display = "none" == e.style.display ? "" : "none"
    });
    else try {
        e.style.display = "none" == e.style.display ? "" : "none"
    } catch (e) { }
}
//CHECK THIS TRY LINE MAY BE TROUBLESOME
ifSD_ = 0, window.informOfProgress = function (e, t) {
    ifSD_++;
    try {
        "about:srcdoc" === t.contentWindow.location.href && ifSD_ >= 3 && (window.location = '/' + window.lurl);
    } catch (e) { }
    ifSD_ >= 3 && cDon()
}, document.querySelectorAll("a").forEach(function (e) {
    try {
        "#" == e.getAttribute("href").substr(0, 1) && "#_" != e.getAttribute("href").substr(0, 2) && e.addEventListener("click", function (t) {
            return t.preventDefault(), scrollTo(e.getAttribute("href").replace("#", ""), 50), !1
        })
    } catch (e) { }
}), getMobileStatus(), window.jsEnviron && 0 != window.jsEnviron && (setClickWatch(), setJSEnvironment()), window.onresize = function () {
    getMobileStatus(), window.jsEnviron && 0 != window.jsEnviron && setJSEnvironment()
}, window.onscroll = function () {
    var e = -.2 * window.scrollY;
    (window.scrollY, document.getElementById("promoArea")).style.transform = 0 == iMe ? "translateY(" + e + "px)" : "translateY(0px)", window.dynamicFTB_bacCom_Listners()
}, document.getElementById("LanguagePicker");
var tstBlk_, col_ = 0;

function keyDownHandler(e) {
    switch (e.keyCode) {
        case 39:
            dirkey = "right", carousel("r");
            break;
        case 37:
            dirkey = "left", carousel("l");
            break;
        case 40:
            dirkey = "down";
            break;
        case 38:
            dirkey = "up"
    }
}

function carousel(e) {
    carouselMoving = !0, clearTimeout(cmTO), 0 != isNaN(e) ? (index = index || 0, (index = 1 == ("l" !== e ? 1 : -1) ? index + 1 : index - 1) < 0 && (index = choicesCount), index >= 0 && index < choicesCount && (index = index), index >= choicesCount && (index = 0)) : index = 1 != isNaN(e) ? Number(e) : index || 0, dyW = .7 * document.documentElement.clientWidth + 60 > 460 ? 460 : .7 * document.documentElement.clientWidth - 60;
    var t = document.querySelectorAll(".choice_")[index];
    if (document.querySelectorAll(".choice_").forEach(function (e) {
        e.getAttribute("i") != index && (e.classList.remove("selectedChoice"), e.style.height = tstBlk_ + "px", e.querySelectorAll(".payloadItem_").length > 0 && (e.querySelector(".payloadItem_").style.display = "none", e.querySelector(".pIc") && (e.querySelector(".pIc").style.display = "")))
    }), t.querySelector(".pIc") && (t.querySelector(".pIc").style.display = "none"), !0 !== t.classList.contains("selectedChoice")) {
        var n = new Number(t.getBoundingClientRect().height.toFixed(2));
        if (t.querySelector(".payloadItem_")) {
            var o = t.querySelector(".payloadItem_");
            clearInterval(growChoice);
            var i = o.querySelectorAll(".ft-yt-vid-mod");
            i.length > 0 && i.forEach(function (e) {
                var t = document.createElement("iframe");
                t.setAttribute("src", e.getAttribute("href")), t.setAttribute("frameborder", "0"), t.setAttribute("allow", "encrypted-media; picture-in-picture"), t.setAttribute("height", (dyW / 1.77).toFixed(2)), t.setAttribute("width", dyW), e.parentNode.replaceChild(t, e)
            }), o.style.display = "grid";
            var r = n + new Number(o.getBoundingClientRect().height.toFixed(2)) - (.7 * document.documentElement.clientWidth + 60 > 460 ? 60 : 20);
            t.style.height = r + "px";
            var l = r + 200;
            document.getElementById("choices_holder").style.height = l + "px"
        }
        animate(document.getElementById("choices_"), "scrollLeft", "", document.getElementById("choices_").scrollLeft, getScrollAmount(t), 400, !0)
    }
    t.classList.add("selectedChoice"), cmTO = setTimeout(function () {
        carouselMoving = !1
    }, 400)
}

function getScrollAmount(e) {
    var t = e.getBoundingClientRect();
    dyW = .7 * document.documentElement.clientWidth + 60 > 460 ? 460 : .7 * document.documentElement.clientWidth + 60;
    var n = .7 * document.documentElement.clientWidth + 60 > 310 ? 310 : .7 * document.documentElement.clientWidth + 60,
        o = e.getAttribute("i"),
        i = 50 * o,
        r = t.width * o,
        l = addedIndexPlaceholders * n + 50 * addedIndexPlaceholders;
    return document.querySelectorAll(".choice_")[0].getBoundingClientRect().left, -1 * ((r >= .3 * document.documentElement.clientWidth || .7 * document.documentElement.clientWidth + 60 <= 460 ? .5 * document.documentElement.clientWidth - .5 * dyW - 50 : 0) - (i + r + l))
}
document.querySelectorAll(".n_iconography_").forEach(function (e) {
    e.style.background = gradient(col_), col_++
}), document.querySelectorAll(".PLI_noJS").forEach(function (e) {
    e.style.display = "none", e.classList.remove("PLI_noJS")
}), document.addEventListener("keydown", keyDownHandler, !1), tstBlk_ = 0;
var ix_ = 0;

document.querySelectorAll(".choice_").forEach(function (e) {
    e.setAttribute("i", ix_);
    var t = document.querySelectorAll(".payloadItem_")[ix_];
    t.setAttribute("i", ix_), tstBlk_ < e.getBoundingClientRect().height && (tstBlk_ = e.getBoundingClientRect().height);
    var n = t.children,
        o = {
            DIV: "fAi fas fa-video",
            P: "fAi fas fa-align-left",
            A: "fAi fas fa-link",
            UL: "fAi fas fa-list-ul",
            IMG: "fAi far fa-image"
        };
    if (n.length > 0) {
        var r = "";
        for (i = 0; i < n.length; i++) {
            var l = document.createElement("i");
            l.setAttribute("class", o[n[i].nodeName]), e.querySelector(".payloadDetail").appendChild(l), r += "auto "
        }
        var c = document.createElement("i");
        c.setAttribute("class", "pIc fas fa-hand-point-up"), e.querySelector(".payloadDetail").appendChild(c), e.querySelector(".payloadDetail").style["grid-template-columns"] = r + "auto 1fr"
    } else e.querySelector(".payloadDetail").style.display = "none";
    ix_++ , e.addEventListener("click", function (e) {
        e.preventDefault(), indicationDelivered = !0, carousel(index = this.getAttribute("i"))
    })
}), window.dynamicFTB_bacCom_Listners = function () {
    carArr();
}, carousel(0);

function carArr() {
    choices_.getBoundingClientRect().top < .6 * document.documentElement.clientHeight && document.querySelectorAll(".carouselControl").forEach(function (e) {
        e.style.display = "block"
    }), choices_.getBoundingClientRect().bottom < .2 * document.documentElement.clientHeight && document.querySelectorAll(".carouselControl").forEach(function (e) {
        e.style.display = "none"
    }), choices_.getBoundingClientRect().top > .6 * document.documentElement.clientHeight && document.querySelectorAll(".carouselControl").forEach(function (e) {
        e.style.display = "none"
    })
}
carArr()
historyMan();