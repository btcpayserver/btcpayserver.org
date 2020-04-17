
function scrollTo(o, t) {
    var n = t || 1,
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

try {
    document.querySelectorAll(".nonJavascriptMessage").forEach(function (e) {
        e.style.display = "none"
    }), document.querySelectorAll(".oF_JS_Env").forEach(function (e) {
        e.style.display = ""
    })
} catch (e) { }


try {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
} catch (e) { }


if (document.querySelectorAll(".selector-no-js").length > 0) {
    document.querySelectorAll(".selector-no-js")[0].checked = true;
}


document.querySelectorAll("a").forEach(function (e) {
    try {
        "#" == e.getAttribute("href").substr(0, 1) && "#_" != e.getAttribute("href").substr(0, 2) && e.addEventListener("click", function (t) {
            return t.preventDefault(), scrollTo(document.getElementById(e.getAttribute("href").replace("#", "")), 50), !1
        })
    } catch (e) { }
})


if (window.theme && window.theme !== "light" && window.theme !== "dark") {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (document.querySelectorAll(".i-a").length > 0) {
            document.querySelectorAll(".i-a")[0].setAttribute("src", "/img/server-dark.png");
        }
        if (document.querySelectorAll(".i-b").length > 0) {
            document.querySelectorAll(".i-b")[0].setAttribute("src", "/img/invoice-dark.svg");
        }
    }
}

if (document.querySelectorAll(".selector-no-js").length > 0 && window.innerWidth < 700) {
    var ele = document.querySelectorAll(".selector-no-js");
    for (i = 0; i < ele.length; i++) {
        document.querySelectorAll(".selector-no-js")[i].addEventListener("click", function () {
            var t = this.getBoundingClientRect();
            window.scrollBy({
                top: t.top,
                behavior: 'smooth'
            });
        })
    }
}

var ww;
ww = window.innerWidth;
function alignSVGTEXT() {
    ww = window.innerWidth;
    if (document.querySelectorAll("svg.mobile-only").length > 0 && ww <= 700) {
        var svg = document.querySelectorAll("svg.mobile-only")[0];
        for (i = 0; i < svg.querySelectorAll("text").length; i++) {
            var t = svg.querySelectorAll("text")[i];
            var w = t.getBoundingClientRect().width;
            var r = 340 / (ww * .8);
            var nx = ((ww * .8) - w) * .5;
            nx = nx * r;
            t.setAttribute("x", nx + "px");
        }
    } else {
    }
}

alignSVGTEXT();
window.onresize = function () {
    alignSVGTEXT();
};


if (document.getElementById("backgroundBubbles")) {
    var s = document.getElementById("backgroundBubbles");
    var t;
    t = "#_IM0_1_" + window.theme;
    if (window.theme && window.theme !== "light" && window.theme !== "dark") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { 
            t = "#_IM0_1_dark";
        } else {
            t = "#_IM0_1_light";
        }
    } else {
        t = "#_IM0_1_" + window.theme;
    }
    s.setAttribute("xlink:href", t);
}