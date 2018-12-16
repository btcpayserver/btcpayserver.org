var isMobile, desktopOnlyOffset;
var iframeStageDetection = 0;
var frameWatcher;
var invoiceframe;
var clickWatcher;
var invoiceframeDoc;
var val_;





getMobileStatus();

function getMobileStatus(){
//SET FLAG FOR MOBILE DEVICE
  isMobile = false; 
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){ isMobile = true; }
}



function toggleMobileMenu(){
  document.getElementById('menuContents').style.display = "grid";
}

function closeMenu(){
  document.getElementById('menuContents').removeAttribute("style");
}

function endVideo(){
  document.getElementById('videoContainer').style.display = 'none'
  document.getElementById('videoContainer_video0').innerHTML='';
  // document.querySelectorAll('#videoContainer_video0')[0].pause();
}

function playVideo(){
  var videoContainer_video0 = document.getElementById('videoContainer_video0');
  videoContainer_video0.innerHTML='<iframe id="videoContainerVideoPayload_0" src="https://www.youtube-nocookie.com/embed/ZIfJyq9RimM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  //'<source src="/video/171221_05_Bitcoin.mp4" type="video/mp4">';
  document.getElementById('videoContainer').style.display = 'grid';
  document.getElementById('videoContainerVideoPayload_0').width = videoContainer_video0.clientWidth;
  document.getElementById('videoContainerVideoPayload_0').height = videoContainer_video0.clientWidth/1.529;// + '" height="523"
  // document.querySelectorAll('#videoContainer_video0')[0].play();
}

function setClickWatch(){
  document.querySelectorAll('.payloadItem_').forEach(function(element){
    if(element.getAttribute('i')!='0'){element.style.display='none';}else{element.style.display='grid';}
  });

  document.querySelectorAll('.choice_').forEach(function(element){
    var rootClass= element.getAttribute('class');
    if(element.getAttribute('i')!='0'){element.setAttribute('class', rootClass);}else{element.setAttribute('class', rootClass + ' iconography_hovered_subtle');}
  });


  document.querySelectorAll('.choice_').forEach(function(ele){
    ele.addEventListener("click", function(event){
      event.preventDefault();
      var index = this.getAttribute('i');
      document.querySelectorAll('.payloadItem_').forEach(function(element){
        if(element.getAttribute('i')!=index){element.style.display='none';}
        else{
          if(element.querySelectorAll('.featuresYTVideoLink')[0]){
            var item_ = element.querySelectorAll('.featuresYTVideoLink')[0];
            var new_ = document.createElement('iframe');
            new_.setAttribute('src', item_.getAttribute('href')); 
            new_.setAttribute('frameborder', '0');
            new_.setAttribute('allow', 'accelerometer; encrypted-media; gyroscope; picture-in-picture');
            new_.setAttribute('height', '226');
            new_.setAttribute('width', '400');
            item_.parentNode.replaceChild(new_, item_);
          }
          element.style.display='grid';
          setTimeout(function(){
          desktopOnlyOffset = isMobile!=false?0:180;
          var modBlockH = document.getElementById('modularInformationBlock').clientHeight;
          var choicesH = document.getElementById('choices_').clientHeight; 
          var windowH = screen.height;
          if(modBlockH < windowH){
            desktopOnlyOffset = ((windowH-modBlockH)/2)+choicesH;
          };
          scrollTo(element.getAttribute('id').replace('#',''), desktopOnlyOffset);
        },200);}
      });
      document.querySelectorAll('.choice_').forEach(function(element){
        var rootClass= element.getAttribute('class').replace('iconography_hovered_subtle', '');
        if(element.getAttribute('i')!=index){element.setAttribute('class', rootClass);}else{element.setAttribute('class', rootClass + ' iconography_hovered_subtle');}
      });
    });
  })
}


function linkToOverride(i){
  var index = i;
      document.querySelectorAll('.payloadItem_').forEach(function(element){
        if(element.getAttribute('i')!=index){element.style.display='none';}
        else{
          if(element.querySelectorAll('.featuresYTVideoLink')[0]){
            var item_ = element.querySelectorAll('.featuresYTVideoLink')[0];
            var new_ = document.createElement('iframe');
            new_.setAttribute('src', item_.getAttribute('href')); 
            new_.setAttribute('frameborder', '0');
            new_.setAttribute('allow', 'accelerometer; encrypted-media; gyroscope; picture-in-picture');
            new_.setAttribute('height', '226');
            new_.setAttribute('width', '400');
            item_.parentNode.replaceChild(new_, item_);
          }
          element.style.display='grid';
          setTimeout(function(){
          desktopOnlyOffset = isMobile!=false?0:180;
          var modBlockH = document.getElementById('modularInformationBlock').clientHeight;
          var choicesH = document.getElementById('choices_').clientHeight; 
          var windowH = screen.height;
          if(modBlockH < windowH){
            desktopOnlyOffset = ((windowH-modBlockH)/2)+choicesH;
          };
          scrollTo(element.getAttribute('id').replace('#',''), desktopOnlyOffset);
        },200);}
      });
      document.querySelectorAll('.choice_').forEach(function(element){
        var rootClass= element.getAttribute('class').replace('iconography_hovered_subtle', '');
        if(element.getAttribute('i')!=index){element.setAttribute('class', rootClass);}else{element.setAttribute('class', rootClass + ' iconography_hovered_subtle');}
      });
}




  document.querySelectorAll('a').forEach(function(element){
    try{
      if(element.getAttribute('href').substr(0,1)=="#" && element.getAttribute('href').substr(0,2)!="#_"){ 
      
        element.addEventListener("click", function(event){
          event.preventDefault();
          scrollTo(element.getAttribute('href').replace('#', ''), 50);
          return false;
        })
      }
    }catch(err){
      //console.log(err);
    }
  });



function scrollTo(ele_, offset) {
  var o_ = offset?offset:1;
  var target = document.getElementById(ele_);
  var start_ = window.scrollY?window.scrollY:0;
  animate(document.scrollingElement || document.documentElement, "scrollTop", "", start_, target.offsetTop-o_, 750, true);
};


function animate(elem, style, unit, from, to, time, prop) {
  if (!elem) {
      return;
  }
  var start = new Date().getTime(),
      timer = setInterval(function () {
          var step = Math.min(1, (new Date().getTime() - start) / time);
          if (prop) {
              elem[style] = (from + step * (to - from))+unit;
          } else {
              elem.style[style] = (from + step * (to - from))+unit;
          }
          if (step === 1) {
              clearInterval(timer);
          }
      }, 1);
  if (prop) {
      elem[style] = from+unit;
  } else {
      elem.style[style] = from+unit;
  }
}



function alterHTML(el, str, fn) {
  var div = document.createElement('div');
  div.innerHTML = str;
  switch(fn){
    case "append":
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
    break;
    case "prepend":
    while (div.children.length > 0) {
      el.prepend(div.children[0]);
    }
    break;
  }
}

function setJSEnvironment(){
  try{
    if(!document.querySelectorAll('.mobileCloseOpenNOJS')[0]){
      var mobileClose = '<div class="menuLinkParent"><a class="menuLink mobileOnly mobileCloseOpenNOJS" onclick="closeMenu();"><i class="fas fa-times"></i></a></div>';
      var m_ = document.getElementById('menuContents');
      alterHTML(m_, mobileClose, "prepend");
    }

    m_.setAttribute('class', m_.getAttribute('class').replace('mc_noJS', '') + ' menuContentsMobile');
    document.querySelectorAll('.mobileMenuShortcut')[0].setAttribute('style', '');

    document.getElementById('videoPlayButton').removeAttribute('href', '');
    document.getElementById('videoPlayButton').removeAttribute('target', '');
    document.getElementById('nonJavascriptMessage').style.display='none';

    document.getElementById('valueSelector').style.display='grid';
    document.querySelectorAll('.demoBlockText')[0].style.display='block';
    document.querySelectorAll('.payButtonLiveDemoInvoice')[0].style.display='block';
  }catch(err){}
}

function randomString(length) {
  var result = '';
  var aplhNum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0; --i) result += aplhNum[Math.floor(Math.random() * aplhNum.length)];
  return result;
}
  
  getMobileStatus();
  setClickWatch();
  setJSEnvironment();



  window.onresize = function() {
    getMobileStatus();
    setJSEnvironment();
    closeMenu();
  }
  
  //SCROLL HACKS FOR PARALLAX
  
  window.onscroll = function() {
    var geometry = window.scrollY*-0.2;
    var geometry2 = window.scrollY*-0.3;
    var calcGeo2 = (geometry2+150)<=0? 0: (geometry2+150);
    var rOpa = 1-(geometry/-200);
    var rOpa2 = 1-(geometry/-500);
        var pA_ = document.getElementById('promoArea');
    if(isMobile == false){
        pA_.style.transform='translateY('+ geometry +'px)';
        pA_.style.opacity=rOpa2;
    }else{
      pA_.style.transform='translateY(0px)';
      pA_.style.opacity=1;
    }
  }



  function startTimerInvoice(){
    var realSeconds = 0;
    var mins = 14;
    var time;
    time = 59;
    var timer_ = document.getElementById('countDownTimer');
    var timerDown_ = window.setInterval(function(){;
    function barAdjust(){
      realSeconds++;
      var bar = document.getElementById('timer-row__progress-bar');
      var barParent = document.getElementById("timer-row");
      bar.style.width = barParent.clientWidth-((barParent.clientWidth-50)*((900-realSeconds)/900));
    }
    barAdjust();
      if(time==='00'){time=Number(60);mins--;}
      if(time == 1){time=String('00');}
      if(time != '00'){time--;}
      var preZero = String(time).length>1?'':'0';
      timer_.innerHTML = mins + ':' + preZero + time;
      barAdjust();
    }, 1000);

  }



function invoiceframePaybuttonSublitAndFlyIntoFrameView(btn){
  var fVal_ = document.querySelectorAll('.finalValue_')[0].getAttribute('value');
  var retrNum = Number(fVal_);
  retrNum = retrNum <= 2 ? 2 : retrNum;
  val_ = retrNum;
  document.getElementById('donationCTA').innerHTML = '<h2>Experience BTCPay Server and help Support the Project</h2><svg version="1.1" class="spinnerAnimated" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="283.46px" height="283.46px" viewBox="0 0 283.46 283.46" enable-background="new 0 0 283.46 283.46" xml:space="preserve"><circle fill="none" stroke="#329f65" stroke-width="30" stroke-linecap="round" stroke-miterlimit="10" cx="141.73" cy="141.73" r="106.762"/></svg><p class="genIn_">Generating your invoice...</p>';



  if(!invoiceframe){
    var value_ = !val_?5:val_;
    invoiceHolder = document.createElement('div');
    invoiceHolder.setAttribute('id', 'invoiceHolder_');
    invoiceframe = document.createElement("iframe");
    invoiceframe.setAttribute("class", "iframe_");
    invoiceframe.setAttribute("id", "modalIframeReusable");
    invoiceframe.setAttribute("onLoad", "window.informOfProgress(event, this)");
    invoiceframe.setAttribute("srcdoc", '<!doctype html><html><body><form method="POST" id="invoiceframePaybutton" action="https://mainnet.demo.btcpayserver.org/api/v1/invoices"><input type="hidden" name="storeId" value="EErYwCthBNfJUpuU1etH1uhg3x1YVH1q1F2zez7u1AAX" /><input type="hidden" name="price" value="' + value_ + '" /><input type="hidden" name="currency" value="USD" /><input type="image" src="" name="submit" style="width:209px"></form></body></html>');
    document.getElementById('don_Par_sPa').appendChild(invoiceHolder);
    document.getElementById('invoiceHolder_').appendChild(invoiceframe);
  }





frameWatcher = setInterval(function(){
  if(iframeStageDetection ==2){
    clearInterval(frameWatcher);
    // history.replaceState(null, null, '/#BTCPay_Server');
    document.getElementById('donationCTA').setAttribute('class', 'flyAwayCTA01');
    setTimeout(function(){
      var sF_ = 0.75;
      var sH_ = 720;
      document.getElementById('donationCTA').style.display='none';
      var ifH_ = document.getElementById('invoiceHolder_');
      ifH_.style.opacity = '1';
      ifH_.style.transform = 'translateY(0px)scale(' + sF_ + ')';
      ifH_.style['transform-origin'] = '50% 0%';
      invoiceframe.style['min-height'] = sH_ + 'px';
      ifH_.style['min-height'] = sH_ + 'px';
      document.getElementById('don_Par_sPa').style.height = (sF_*sH_) + 'px';
    },300);
    // history.replaceState(null, null, '/index.php');
  }
  if(iframeStageDetection ==1){
    if(!clickWatcher){
      invoiceframe = document.getElementById("modalIframeReusable");
      invoiceframeDoc = invoiceframe.contentDocument;
      if(invoiceframeDoc.getElementById("invoiceframePaybutton")){
        invoiceframeDoc.getElementById("invoiceframePaybutton").submit();
        // history.replaceState(null, null, '/index.php');
        clickWatcher = 1;
      }
    }
  }
},500);



}


window.informOfProgress = function(e,t){
  iframeStageDetection++;
  try{
    if(t.contentWindow.location.href === 'about:srcdoc' && iframeStageDetection>=3){
      window.location='/';
    }
    console.log(t.contentWindow.location.href);
  }catch(err){this.console.log(err);}
  // history.replaceState('/', null, '/index.php');
}


function adjustValue(d, e){
  var fVal_ = document.querySelectorAll('.finalValue_')[0].getAttribute('value');
  var retrNum = Number(fVal_);
  retrNum = retrNum <= 2 ? 2 : retrNum;

  var onclickStr = " onkeyup=\"adjustValue('verify', event)\"";

  if(d=='minus'){
    document.querySelectorAll('.finalValue_')[0].outerHTML = '<input class="finalValue_" value="' + ( retrNum-1) + '" type="text" placeholder="' + ( retrNum-1) + '"'+ onclickStr +'/>';
  }
  if(d=='plus'){
    document.querySelectorAll('.finalValue_')[0].outerHTML = '<input class="finalValue_" value="' + ( retrNum+1) + '" type="text" placeholder="' + ( retrNum+1) + '"'+ onclickStr +'/>';
  }
  if(d=='verify'){
    if(isNaN(Number(e.key)) != false){
      document.querySelectorAll('.finalValue_')[0].outerHTML = '<input class="finalValue_" value="' + (5) + '" type="text" placeholder="' + (5) + '"'+ onclickStr +'/>';
      document.querySelectorAll('.finalValue_')[0].focus();
    }
  }

  if(retrNum<1){
    document.querySelectorAll('.finalValue_')[0].innerHTML = ( 1);
  }
}