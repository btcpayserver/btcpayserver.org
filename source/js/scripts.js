[Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (e) {
  e.hasOwnProperty("prepend") || Object.defineProperty(e, "prepend", {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: function () {
      var e = Array.prototype.slice.call(arguments),
        t = document.createDocumentFragment();
      e.forEach(function (e) {
        var n = e instanceof Node;
        t.appendChild(n ? e : document.createTextNode(String(e)))
      }), this.insertBefore(t, this.firstChild)
    }
  })
}), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (e) {
  e.hasOwnProperty("append") || Object.defineProperty(e, "append", {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: function () {
      var e = Array.prototype.slice.call(arguments),
        t = document.createDocumentFragment();
      e.forEach(function (e) {
        var n = e instanceof Node;
        t.appendChild(n ? e : document.createTextNode(String(e)))
      }), this.appendChild(t)
    }
  })
});
var grid_support = "string" == typeof document.createElement("div").style.grid;
try {
  let e = grid_support ? "grid" : "block";
  document.documentElement.style.setProperty("--grid", `${e}`)
} catch (e) {}
var bb_, visCur_, iMe, desktopOnlyOffset, frameWatcher, invoiceframe, clickWatcher, invoiceframeDoc, workingCurrency, returnScroll, scrollingLoop, startX, scrollLeft, dyW, addedIndexPlaceholders, curInd, sLe, iframeStageDetection = 0,
  gi_wFl = 0,
  indicationDelivered = !1,
  mousePositionDown = !1,
  index = 0,
  sym = ["$", "£", "€", "₿"],
  symass = {
    usd: "$",
    cad: "$",
    gbp: "£",
    eur: "€",
    btc: "₿"
  },
  choicesCount = document.querySelectorAll(".choice_").length;
window.englihs = Array(), window.textElements = ["span", "p", "h1", "h2", "h3", "h4", "i", "b", "a", "li", "button"], dyW = .7 * document.documentElement.clientWidth > 400 ? 400 : .7 * document.documentElement.clientWidth, window.aV_ = [1, 5, 20, 100], window.lurl = String(window.location.href).replace("https://btcpayserver.org", "").replace("https://btcpayserver.flat18.co.uk", "").replace("/", "").split("/")[0];
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
  console.log("debug: closing"), document.getElementById("menuContents").removeAttribute("style")
}

function endVideo() {
  document.getElementById("videoContainer").style.display = "none", document.getElementById("videoContainer_video0").innerHTML = ""
}

function playVideo() {
  var e = document.getElementById("videoContainer_video0");
  e.innerHTML = '<iframe id="videoContainerVideoPayload_0" src="https://www.youtube-nocookie.com/embed/ZIfJyq9RimM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', document.getElementById("videoContainer").style.display = "grid", document.getElementById("videoContainerVideoPayload_0").width = e.clientWidth, document.getElementById("videoContainerVideoPayload_0").height = e.clientWidth / 1.529
}

function setClickWatch() {
  grid_support && (document.querySelectorAll("a").forEach(function (e) {
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
  }))
}
if (gradient = function (e) {
    return "rgb(" + (15 * e >= 200 ? 0 : 200 - 15 * e) + ",210," + (15 * e >= 200 ? 15 * e : 0) + ")"
  }, getMobileStatus(), grid_support) try {
  document.getElementById("choices_").addEventListener("scroll", function (e) {
    var t = document.getElementById("choicesUIShadowXScrollPre"),
      n = document.getElementById("choicesUIShadowXScroll");
    t && e.scrollLeft >= 100 ? t.style.opacity = 1 : t && (t.style.opacity = 0), n && e.scrollLeft <= 450 ? n.style.opacity = 1 : n && (n.style.opacity = 0)
  })
} catch (e) {}

function scrollTo(e, t) {
  var n = t || 1,
    o = document.getElementById(e),
    r = window.scrollY ? window.scrollY : 0;
  animate(document.scrollingElement || document.documentElement, "scrollTop", "", r, o.offsetTop - n, 750, !0)
}

function animate(e, t, n, o, r, i, c) {
  if (e) {
    var l = (new Date).getTime(),
      a = setInterval(function () {
        var d = Math.min(1, ((new Date).getTime() - l) / i);
        c ? e[t] = o + d * (r - o) + n : e.style[t] = o + d * (r - o) + n, 1 === d && clearInterval(a)
      }, 1);
    c ? e[t] = o + n : e.style[t] = o + n
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
  try {
    grid_support && (document.getElementById("choices_").removeAttribute("style"), document.getElementById("choices_").removeAttribute("class"), document.querySelectorAll(".nonJavascriptMessage").forEach(function (e) {
      e.style.display = "none"
    }), document.querySelectorAll(".oF_JS_Env").forEach(function (e) {
      e.style.display = ""
    }), document.querySelectorAll(".demoBlockText")[0].style.display = "", document.getElementById("infoButton01").removeAttribute("style", ""), document.getElementById("infoButton01").addEventListener("click", function () {
      document.getElementById("furtherQuote").style.display = "unset", document.getElementById("infoButton01").style.display = "none"
    }), document.getElementById("furtherQuote").style.display = "none", curInd = !curInd || isNaN(curInd) ? 0 : curInd, document.querySelectorAll(".valueSelectorHolder").forEach(function (e) {
      e.querySelectorAll("select").forEach(function (e) {
        e.selectedIndex = curInd
      })
    }))
  } catch (r) {}
  try {
    var e = .85 * document.documentElement.clientWidth >= 550 ? .4 * document.documentElement.clientWidth >= 550 ? 550 : .4 * document.documentElement.clientWidth : .85 * document.documentElement.clientWidth;
    document.getElementById("unfetteredVideoFrame").style.width = e + "px", document.getElementById("unfetteredVideoFrame").style.height = (e - 0) / 1.78 + "px"
  } catch (r) {}
  try {
    if (1 != bb_) {
      bb_ = 1;
      var t = window.aV_;
      document.querySelectorAll(".jsR_don").forEach(function (e) {
        for (c = 0, o = 0; o < t.length; o++) {
          var n = document.createElement("div"),
            r = "rgba(255,255,255,0.8)";
          c++;
          var i = "rgba(255,255,255,0.9)";
          c++, n.style.background = "linear-gradient(90deg," + r + "," + i + ")", n.innerHTML = '<span class="cur-val-no">' + t[o] + '</span><span class="q-pay-unit cur-val-fu">USD</span>', n.classList.add("q-pay"), n.setAttribute("onclick", 'val_=Number(this.querySelectorAll(".cur-val-no")[0].innerHTML);mfC();genInvoice_();'), e.appendChild(n)
        }
        r = "rgba(255,255,255,0.8)";
        c++;
        i = "rgba(255,255,255,0.9)";
        c++, (n = document.createElement("div")).style.background = "linear-gradient(90deg," + r + "," + i + ")", k = '<span class="cdon-am-tx">' + window.donationTitle + "</span>", n.innerHTML = k + '<input onclick="sAt_(this);" onkeyup="vrN(this, event)" type="number" pattern="[0-9]*" name="price" value="250" placeholder="250" class="cust-amt-inv-but c-a-i-b" /><span class="q-pay-unit cur-val-fu">USD</span>', n.classList.add("q-pay");
        var l = document.createElement("button");
        l.setAttribute("alt", "Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"), l.innerHTML = window.donWor.toLowerCase(), l.setAttribute("onclick", 'val_=this.parentNode.querySelectorAll(".c-a-i-b")[0].value;mfC();genInvoice_(this);'), n.appendChild(l), e.appendChild(n)
      });
      var n = document.getElementById("disposable-top-donation-cta");
      (r = document.createElement("button")).setAttribute("alt", "Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"), r.setAttribute("onclick", "val_=this.parentNode.querySelectorAll('.c-a-i-b')[0].value;mfC();genInvoice_(this);"), r.innerHTML = "&nbsp;" + window.donWor + '&nbsp;<i class="fas fa-chevron-circle-' + window.rl + '"></i>', n.replaceWith(r);
      var o = document.createElement("input");
      o.setAttribute("class", "c-a-i-b input-a res_le"), o.setAttribute("onclick", "sAt_(this);"), o.setAttribute("onkeyup", "vrN(this, event);"), o.setAttribute("onchange", "rGr(this);"), o.setAttribute("type", "number"), o.setAttribute("pattern", "^d+(.|,)d{2}$"), o.setAttribute("name", "price"), o.setAttribute("value", "5"), o.setAttribute("placeholder", "5"), o.setAttribute("step", "1"), document.getElementById("c-i-ab-v").replaceWith(o)
    }
  } catch (r) {}
  try {
    let e = .01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${e}px`)
  } catch (r) {}
  try {
    var r, i = document.getElementById("unfetteredVideoFrame");
    (r = new Image).set = "100px", r.src = "/img/clip602.gif";
    var l = function () {
        i.setAttribute("poster", "/img/clip602.gif")
      },
      a = function () {
        i.setAttribute("poster", "/img/vidph.svg")
      };
    i.addEventListener("mouseenter", l, !0), i.addEventListener("mouseleave", a, !0);
    i.addEventListener("play", function () {
      i.setAttribute("poster", "/img/vidph.svg"), i.play(), i.removeEventListener("mouseenter", l, !0), i.removeEventListener("mouseleave", a, !0)
    })
  } catch (r) {}
  try {
    document.getElementById("t-ct-d-v-0").selectedIndex = 0
  } catch (r) {
    console.log(r)
  }
}

function sAt_(e) {
  try {
    e.select() || e.setSelectionRange(0, e.value.length)
  } catch (e) {}
  try {
    e.parentNode.querySelectorAll(".cursor")[0].style.display = "none"
  } catch (e) {}
}

function vrN(e, t) {
  e.value.replace("^d+(.|,)d{2}$", "");
  13 == t.keyCode && (val_ = e.value, mfC(), genInvoice_()), gi_wFl = !e.value || isNaN(e.value) ? 1 : 0
}

function rGr(e) {
  if (e.classList.contains("input-a")) {
    var t = e.value.length + 2 - .3 * e.value.length;
    e.style["max-width"] = t + "rem"
  }
}

function setVisCur(e) {
  var t = 2e-4;
  switch (visCur_ = e, wkCur_ = e.toUpperCase(), document.querySelectorAll(".cur-val-fu").forEach(function (t) {
    if ("SELECT" !== String(t.nodeName).toUpperCase()) t.value = e.toUpperCase(), t.innerHTML = e.toUpperCase();
    else {
      switch (e) {
        case "btc":
          var n = 0;
          break;
        case "usd":
          n = 1;
          break;
        case "cad":
          n = 2;
          break;
        case "eur":
          n = 3;
          break;
        case "gbp":
          n = 4
      }
      foTO(n)
    }
  }), e) {
    case "btc":
      var n = 1;
      break;
    case "usd":
      n = 0;
      break;
    case "cad":
      n = 2;
      break;
    case "eur":
      n = 3;
      break;
    case "gbp":
      n = 4
  }
  if (document.getElementById("t-ct-d-v-0").selectedIndex = n, document.querySelectorAll(".valueSelectorHolder").forEach(function (t) {
      for (var n = 0, o = (t = t.querySelectorAll("select")[0]).options.length; n < o; ++n) t.options[n].innerHTML.toUpperCase() === e.toUpperCase() && (t.selectedIndex = n)
    }), "BTC" == wkCur_) {
    var o = 0;
    document.querySelectorAll(".cur-val-no").forEach(function (e) {
      o %= aV_.length;
      var n = 1 != isNaN(e.innerHTML) ? e.innerHTML : 1 != isNaN(e.value) ? e.value : 1;
      n != window.aV_[o] * t && (n *= t, e.innerHTML = n, e.value = n), o++
    })
  } else {
    o = 0;
    document.querySelectorAll(".cur-val-no").forEach(function (e) {
      o %= aV_.length;
      var n = 1 != isNaN(e.innerHTML) ? e.innerHTML : 1 != isNaN(e.value) ? e.value : 1;
      n != window.aV_[o] && (n /= t, e.innerHTML = n, e.value = n), o++
    })
  }
}

function foTO(e) {
  var t = ".vci-in-m";
  document.querySelectorAll(".currencyOpts").forEach(function (e) {
    e.querySelectorAll(t).forEach(function (e) {
      e.classList.remove("focused")
    })
  }), document.querySelectorAll(".currencyOpts").forEach(function (n) {
    n.querySelectorAll(t)[e].classList.add("focused")
  })
}

function randomString(e) {
  var t = "";
  for (n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", o = e; o > 0; --o) t += n[Math.floor(Math.random() * n.length)];
  return t
}

function startTimerInvoice() {
  var e, t = 0,
    n = 14;
  e = 59;
  var o = document.getElementById("countDownTimer");
  window.setInterval(function () {
    function r() {
      t++;
      var e = document.getElementById("timer-row__progress-bar"),
        n = document.getElementById("timer-row");
      e.style.width = n.clientWidth - (n.clientWidth - 50) * ((900 - t) / 900)
    }
    r(), "00" === e && (e = Number(60), n--), 1 == e && (e = String("00")), "00" != e && e--;
    var i = String(e).length > 1 ? "" : "0";
    o.innerHTML = n + ":" + i + e, r()
  }, 1e3)
}

function genInvoice_(e) {
  e && (!e.parentNode.querySelectorAll(".c-a-i-b")[0].value || e.parentNode.querySelectorAll(".c-a-i-b")[0].value <= 0 || isNaN(e.parentNode.querySelectorAll(".c-a-i-b")[0].value) ? (e.parentNode.querySelectorAll(".c-a-i-b")[0].value = 1, val_ = e.parentNode.querySelectorAll(".c-a-i-b")[0].value, gi_wFl = 1) : gi_wFl = 0);
  var t = val_ < .01 ? Number(val_).toFixed(val_.split(".")[1].length) : Number(val_).toFixed(2),
    n = document.getElementById("donParent"),
    o = 0 != gi_wFl ? '&nbsp;<i class="fas fa-exclamation-triangle don-iss"></i>' : "";
  if (n.querySelector(".modPar"), n.querySelector(".GenerateInvoiceButton").style.display = "none", n.querySelector(".jsInvoiceWorkspacePre").style.display = "none", n.querySelector(".statusButton").style.display = "", wkCur_ = wkCur_ || "USD", n.querySelector(".genIn_").innerHTML = n.querySelector(".genIn_").innerHTML.replace("...", ""), n.querySelector(".genVal_").innerHTML = "<br>" + symass[wkCur_.toLowerCase()] + " " + t + " (" + wkCur_.toLowerCase() + ") " + o) {
    var r = val_ || 5,
      i = "left" == window.rl ? "rtl" : "ltr";
    (ivFr_ = document.createElement("iframe")).style.border = "none", ivFr_.setAttribute("dir", i), ivFr_.setAttribute("onLoad", "window.informOfProgress(event, this);"), ivFr_.setAttribute("srcdoc", '<!doctype html><html dir="' + i + '"><body><form method="POST"  action="https://' + storeURL + "/api/v1/invoices/?lang=" + window.language + '" style="width:0px;height:0px"><input type="hidden" name="storeId" value="' + storeId + '" /><input type="hidden" name="price" value="' + r + '" /><input type="hidden" name="currency" value="' + wkCur_ + '" /><input type="hidden" name="lang" value="sv" /><input type="image" src="" name="submit"></form></body></html>'), ivFr_.style.height = "0px", ivFr_.style.width = "0px", ivFr_.style.visibility = "hidden", n.querySelector(".jsInvoiceWorkspace").appendChild(ivFr_)
  }
  var c = document.querySelectorAll(".closeVideoWindow")[0].getBoundingClientRect().height > 0 ? document.querySelectorAll(".closeVideoWindow")[0].getBoundingClientRect().height : 40,
    l = window.innerHeight - c >= 720 ? 720 : window.innerHeight - c;
  sLe = 0, wfCh("btcpay", l, n)
}

function wfCh(e, t, n) {
  var o = n.querySelector(".modPar"),
    r = "btcpay" === e ? 1 : 0,
    i = "btcpay" === e ? 2 : 1;
  frWtr_ = setInterval(function () {
    var e = n.querySelector("iframe");
    ifSD_ == i && (clearInterval(frWtr_), setTimeout(function () {
      var t = 720 <= window.innerHeight - 45 ? 720 : window.innerHeight - 45,
        r = 720 <= window.innerHeight - 60 ? 0 : 60,
        i = t - 10;
      n.querySelector(".jsInvoiceWorkspace").style.display = "block", n.querySelector(".statusButton").style.display = "none", e.style.height = i + "px", n.querySelector(".jsInvoiceWorkspace").style.height = t + "px", n.querySelector(".jsInvoiceWorkspace").classList.add("js-i-ws-to-sc"), o.style.width = "350px", e.style.width = "100%", e.style.visibility = "visible", 0 == sLe && setTimeout(function () {
        sLe = 1, document.querySelectorAll(".jsInvoiceWorkspace")[0].scrollTo({
          top: r,
          left: 0,
          behavior: "smooth"
        })
      }, 500)
    }, 300)), ifSD_ == r && (ckWr_ || (ivFr_Doc = e.contentDocument).querySelector("form") && (ivFr_Doc.querySelector("form").submit(), ckWr_ = 1, o.style.width = "350px"))
  }, 600)
}

function cDon(e) {
  var t = (e = e || document.querySelectorAll(".closeDonationButton")[0]).parentNode,
    n = t.querySelectorAll(".modPar")[0];
  t.querySelector(".GenerateInvoiceButton").style.display = "", e.style.visibility = "hidden", n.style.width = "", t.querySelector(".statusButton").style.display = "none", t.querySelector(".jsInvoiceWorkspacePre").style.display = "", ivFr_ = void 0, ckWr_ = void 0, t.querySelector(".jsInvoiceWorkspace").style.display = "none", t.querySelector(".jsInvoiceWorkspace").innerHTML = "", ifSD_ = 0
}

function adjV(e, t, n) {
  var o = n.parentNode,
    r = o.querySelectorAll(".finalValue_")[0].getAttribute("value"),
    i = Number(r);
  i = i <= 1 ? 1 : i;
  var c = " onkeyup=\"adjV('verify', event, this)\"";
  switch (e) {
    case "minus":
      var l = i - 1 >= 1 ? (i - 1).toFixed(2) : 1..toFixed(2);
      o.querySelectorAll(".finalValue_")[0].outerHTML = '<input class="form-control finalValue_ bounce_" value="' + l + '" type="text" placeholder="' + l + '"' + c + "/>", val_ = Number(l);
      break;
    case "plus":
      var a = i + 1 >= 1 ? (i + 1).toFixed(2) : 1..toFixed(2);
      o.querySelectorAll(".finalValue_")[0].outerHTML = '<input class="form-control finalValue_ bounce_" value="' + a + '" type="text" placeholder="' + a + '"' + c + "/>", val_ = Number(a);
      break;
    case "verify":
      0 != isNaN(Number(t.key)) && 1 != [".", "Backspace", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(t.key) ? (o.querySelectorAll(".finalValue_")[0].outerHTML = '<input class="form-control finalValue_ bounce_" value="5" type="text" placeholder="5.00"' + c + "/>", o.querySelectorAll(".finalValue_")[0].focus(), val_ = 5) : (n.value = n.value, val_ = Number(n.value)), i < .01 && (o.querySelectorAll(".finalValue_")[0].innerHTML = .01)
  }
}

function stC(e) {
  wkCur_ = e.value, curInd = e.selectedIndex, setVisCur(e.value)
}

function mfC() {
  document.body.classList.add("no-scroll"), document.getElementById("p-nm-co-ho").classList.add("blur");
  document.createElement("p");
  var e = document.querySelector(".curtainWorkspace").querySelector(".jsInvoiceWorkspacePre");
  document.querySelector(".curtainWorkspace").querySelectorAll(".valueControlBtn").forEach(function (e) {
    e.style.display = "none"
  });
  document.createElement("div");
  e.querySelectorAll("select").forEach(function (e) {
    e.selectedIndex = curInd
  }), document.getElementById("curtainGen").style.display = "", uPHis("/#donate")
}

function closeCurtain() {
  document.body.classList.remove("no-scroll"), document.getElementById("p-nm-co-ho").classList.remove("blur"), document.getElementById("curtainGen").style.display = "none", cDon(), uPHis("/")
}

function uPHis(e, t) {
  f = e.substr(0, 1), "/" == e && (e = e + window.lurl + e), "#" != e.substr(0, 1) && "/#" != e.substr(0, 2) || (e = "/" + window.lurl + "/" + e.replace("/", ""));
  var n = e.replace("//", "/"),
    o = {
      page: n
    };
  history.pushState(o, n, n)
}

function historyMan(e) {
  try {
    switch (n = String(window.location.href).replace("https://btcpayserver.org", "").replace("https://btcpayserver.flat18.co.uk", "").replace("/", "").replace(window.lurl, "").replace("/", ""), n) {
      case "#donate":
        cDon(), mfC(), uPHis(n);
        break;
      case "#invoicing":
        genInvoice_();
      default:
        n.length > 1 || (cDon(), closeCurtain())
    }
  } catch (e) {
    console.log(e)
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
  } catch (e) {}
}
window.onpopstate = function (e) {
  historyMan()
}, ifSD_ = 0, window.informOfProgress = function (e, t) {
  ifSD_++;
  try {
    "about:srcdoc" === t.contentWindow.location.href && ifSD_ >= 3 && (window.location = "/" + window.lurl)
  } catch (e) {}
  ifSD_ >= 3 && cDon()
}, document.querySelectorAll("a").forEach(function (e) {
  try {
    "#" == e.getAttribute("href").substr(0, 1) && "#_" != e.getAttribute("href").substr(0, 2) && e.addEventListener("click", function (t) {
      return t.preventDefault(), scrollTo(e.getAttribute("href").replace("#", ""), 50), !1
    })
  } catch (e) {}
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
      var r = o.querySelectorAll(".ft-yt-vid-mod");
      r.length > 0 && r.forEach(function (e) {
        var t = document.createElement("iframe");
        t.setAttribute("src", e.getAttribute("href")), t.setAttribute("frameborder", "0"), t.setAttribute("allow", "encrypted-media; picture-in-picture"), t.setAttribute("height", (dyW / 1.77).toFixed(2)), t.setAttribute("width", dyW), e.parentNode.replaceChild(t, e)
      }), o.style.display = "grid";
      var i = n + new Number(o.getBoundingClientRect().height.toFixed(2)) - (.7 * document.documentElement.clientWidth + 60 > 460 ? 60 : 20);
      t.style.height = i + "px";
      var c = i + 200;
      document.getElementById("choices_holder").style.height = c + "px"
    }
    animate(document.getElementById("choices_"), "scrollLeft", "", document.getElementById("choices_").scrollLeft, getScrollAmount(t), 400, !0)
  }
  t.classList.add("selectedChoice"), cmTO = setTimeout(function () {
    carouselMoving = !1
  }, 400)
}

function getScrollAmount(e) {
  console.log("document.documentElement.clientWidth: " + document.documentElement.clientWidth), console.log("document.documentElement.clientWidth: " + document.documentElement.clientWidth);
  var t = e.getBoundingClientRect();
  dyW = .7 * document.documentElement.clientWidth + 60 > 460 ? 460 : .7 * document.documentElement.clientWidth + 60;
  var n = .7 * document.documentElement.clientWidth + 60 > 310 ? 310 : .7 * document.documentElement.clientWidth + 60,
    o = e.getAttribute("i"),
    r = 50 * o,
    i = t.width * o,
    c = addedIndexPlaceholders * n + 50 * addedIndexPlaceholders;
  return document.querySelectorAll(".choice_")[0].getBoundingClientRect().left, -1 * ((i >= .3 * document.documentElement.clientWidth || .7 * document.documentElement.clientWidth + 60 <= 460 ? .5 * document.documentElement.clientWidth - .5 * dyW - 50 : 0) - (r + i + c))
}
document.querySelectorAll(".n_iconography_").forEach(function (e) {
  e.style.background = gradient(col_), col_++
}), document.querySelectorAll(".PLI_noJS").forEach(function (e) {
  e.style.display = "none", e.classList.remove("PLI_noJS")
}), document.addEventListener("keydown", keyDownHandler, !1), tstBlk_ = 0;
var ix_ = 0;

function carArr() {
  choices_.getBoundingClientRect().top < .6 * document.documentElement.clientHeight && document.querySelectorAll(".carouselControl").forEach(function (e) {
    e.style.display = "block"
  }), choices_.getBoundingClientRect().bottom < .2 * document.documentElement.clientHeight && document.querySelectorAll(".carouselControl").forEach(function (e) {
    e.style.display = "none"
  }), choices_.getBoundingClientRect().top > .6 * document.documentElement.clientHeight && document.querySelectorAll(".carouselControl").forEach(function (e) {
    e.style.display = "none"
  })
}
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
      var c = document.createElement("i");
      c.setAttribute("class", o[n[i].nodeName]), e.querySelector(".payloadDetail").appendChild(c), r += "auto "
    }
    var l = document.createElement("i");
    l.setAttribute("class", "pIc fas fa-hand-point-up"), e.querySelector(".payloadDetail").appendChild(l), e.querySelector(".payloadDetail").style["grid-template-columns"] = r + "auto 1fr"
  } else e.querySelector(".payloadDetail").style.display = "none";
  ix_++, e.addEventListener("click", function (e) {
    e.preventDefault(), indicationDelivered = !0, carousel(index = this.getAttribute("i"))
  })
}), window.dynamicFTB_bacCom_Listners = function () {
  carArr()
}, carousel(0), carArr(), historyMan();
