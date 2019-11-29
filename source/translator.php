<?php
$start = strtotime('now');
error_reporting(E_ALL);
ini_set('display_errors', 1);
// COMPOSER : MatthiasMullie\Minify
// include('/var/www/apps.local/minifier/vendor/autoload.php');
// SIMPLY COMMENT OUT THE MINIFIED REFERENCES BELOW TO BUILD WITHOUT MINIFYING THE CSS AND HTML FILES

//THE BUILT SITE IS MOVED TO `FORGITHUB` FOLDER 
//SCRIPT CAN BE EXPANDED TO EXECUTE COPY TO GIT FOLDER AND EXEC GIT COMMIT WITH SSH KEYS ETC.

use MatthiasMullie\Minify;

function recurse_copy($src,$dst) { 
  $dir = opendir($src); 
  while(false !== ( $file = readdir($dir)) ) { 
      if (( $file != '.' ) && ( $file != '..' )) { 
          if ( is_dir($src . '/' . $file) ) { 
              recurse_copy($src . '/' . $file,$dst . '/' . $file); 
          } 
          else { 
              copy($src . '/' . $file,$dst . '/' . $file); 
          } 
      } 
  } 
  closedir($dir); 
} 
function get_string_between($string, $start, $end)
{
  $string = ' ' . $string;
  $ini = strpos($string, $start);
  if ($ini == 0) return '';
  $ini += strlen($start);
  $len = strpos($string, $end, $ini) - $ini;
  return substr($string, $ini, $len);
}

function wipeDirectory($directory)
{
  if (is_dir(__DIR__ . $directory)) {
    $a = new RecursiveDirectoryIterator(__DIR__ . $directory, RecursiveDirectoryIterator::SKIP_DOTS);
    $b = new RecursiveIteratorIterator(
      $a,
      RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($b as $q) {
      if ($q->isDir()) {
        rmdir($q->getRealPath());
      } else {
        unlink($q->getRealPath());
      }
    }
    rmdir(__DIR__ . $directory);
  }
  mkdir(__DIR__ . $directory, 0777, true);
}

function download($url)
{ //SHOULDN'T BE NECESSARY FOR LOCAL SOURCE BUILDS
  //RETAINED FOR POSSIBLE REUSE ELSEWHERE
  $ght = "PASS";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_HEADER, false); 
  curl_setopt($ch, CURLOPT_USERPWD, 'Authorization' . ':' . $ght);
  $result = curl_exec($ch);
  if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
  }
  curl_close($ch);
  echo "downloading: " . $url . " <br>";
  echo "result (short): " . substr($result, 0, 100) . "... <br><br>";
  return $result;
}

function getAvailableTransifex($resource_slug)
{
  $resource_slug = !$resource_slug ? "en-json" : $resource_slug;
  $transifexToken = "token";
  $transifexGetJSON = "https://www.transifex.com/api/2/project/btcpayserver-website/resource/" . $resource_slug . "/stats/";

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLOPT_URL, $transifexGetJSON);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

  curl_setopt($ch, CURLOPT_USERPWD, 'api' . ':' . $transifexToken);

  $result = curl_exec($ch);
  if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
  }
  curl_close($ch);

  $output = json_decode($result, true);
  $keys = array_keys($output);
  $completed_ = [];
  foreach ($keys as $k) {
    str_replace("%", "", $output[$k]['completed']) >= 80 && array_push($completed_, $k);
  }
  return $completed_;
}
function getResourceFile($resource_slug, $lng)
{
  if (!is_dir(__DIR__ . "/json")) {
    mkdir((__DIR__ . "/json"), 0777);
  }
  if (!is_dir(__DIR__ . "/json/" . $resource_slug)) {
    mkdir((__DIR__ . "/json/" . $resource_slug), 0777);
  }
  $djft = "/json/" . $resource_slug . "/";

  $resource_slug = !$resource_slug ? "en-json" : $resource_slug;
  $lng = !$lng ? "en_GB" : $lng;
  $transifexToken = "1/e5ce3430adf6f018626a6c269b2ef582b4348aed";
  $transifexGetJSON = "https://www.transifex.com/api/2/project/btcpayserver-website/resource/" . $resource_slug . "/translation/" . $lng . "/";

  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $transifexGetJSON);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

  curl_setopt($ch, CURLOPT_USERPWD, 'api' . ':' . $transifexToken);

  $result = curl_exec($ch);
  if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
  }
  curl_close($ch);

  $output = json_decode($result, true);
  $lng = $lng != "en_GB" ? $lng : "en";
  $output && file_put_contents(__DIR__ . $djft . $lng . ".json", $output['content']);
  $output = json_decode($output['content'], true);
  return $output;
}
function deleteWebsiteData()
{
  foreach (new DirectoryIterator(__DIR__ . '/../') as $f) {
    if ($f->isDot()) continue;
    if (is_dir(__DIR__ . '/../' . $f)) {
      if ($f != "source") {
        $a = new RecursiveDirectoryIterator(__DIR__ . '/../' . $f, RecursiveDirectoryIterator::SKIP_DOTS);
        $b = new RecursiveIteratorIterator($a, RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($b as $q) {
          if ($q->isDir()) {
            rmdir($q->getRealPath());
          } else {
            unlink($q->getRealPath());
          }
        }
        rmdir(__DIR__ . '/../' . $f);
      }
    }
  }
}
// HTML Minifier
function minify_html($input)
{
  if (trim($input) === "") return $input;
  $input = preg_replace_callback('#<([^\/\s<>!]+)(?:\s+([^<>]*?)\s*|\s*)(\/?)>#s', function ($matches) {
    return '<' . $matches[1] . preg_replace('#([^\s=]+)(\=([\'"]?)(.*?)\3)?(\s+|$)#s', ' $1$2', $matches[2]) . $matches[3] . '>';
  }, str_replace("\r", "", $input));
  return preg_replace(
    array(
      '#<(img|input)(>| .*?>)#s',
      '#(<!--.*?-->)|(>)(?:\n*|\s{2,})(<)|^\s*|\s*$#s',
      '#(<!--.*?-->)|(?<!\>)\s+(<\/.*?>)|(<[^\/]*?>)\s+(?!\<)#s', 
      '#(<!--.*?-->)|(<[^\/]*?>)\s+(<[^\/]*?>)|(<\/.*?>)\s+(<\/.*?>)#s',
      '#(<!--.*?-->)|(<\/.*?>)\s+(\s)(?!\<)|(?<!\>)\s+(\s)(<[^\/]*?\/?>)|(<[^\/]*?\/?>)\s+(\s)(?!\<)#s', 
      '#(<!--.*?-->)|(<[^\/]*?>)\s+(<\/.*?>)#s', 
      '#<(img|input)(>| .*?>)<\/\1>#s', 
      '#(&nbsp;)&nbsp;(?![<\s])#',
      '#(?<=\>)(&nbsp;)(?=\<)#', 
      '#\s*<!--(?!\[if\s).*?-->\s*|(?<!\>)\n+(?=\<[^!])#s'
    ),
    array(
      '<$1$2</$1>',
      '$1$2$3',
      '$1$2$3',
      '$1$2$3$4$5',
      '$1$2$3$4$5$6$7',
      '$1$2$3',
      '<$1$2',
      '$1 ',
      '$1',
      ""
    ),
    $input
  );
}

if (isset($_GET['wh'])) { }
if (isset($_GET['source'])) {

  deleteWebsiteData();

  $build_source = trim($_GET['source']);

  wipeDirectory('/../forGitHub');
  wipeDirectory('/../donate');

  switch ($build_source) {
    case "flat18":
      $bs_ = __DIR__;
      break;

    case "github":
      $bs_ = "https://raw.githubusercontent.com/btcpayserver/btcpayserver.github.io/master/source";
      $tmpl = download($bs_ . '/src/html/tmpl.html');
      $donate_tmpl = file_get_contents($bs_ . '/src/html/donate/tmpl.html', true);
      $ftblk = file_get_contents($bs_ . '/src/html/footer-tmpl.html', true);
      $donations = file_get_contents($bs_ . '/src/json/donations.json', true);
      $video_tmpl_ = download($bs_ . '/src/vtt/video_tmpl.vtt');
      $js = download($bs_ . '/src/js/scripts.js');
      $css = download($bs_ . '/src/css/styles.css');
      $pagecss = file_get_contents($bs_ . '/src/css/page-styles.css', true);
      $fa = download($bs_ . '/src/css/fa_.min.css');
      $bs_ = __DIR__ . '/github-source';
      break;

    case "github-local":
      $bs_ = __DIR__ . '/github-source';
      break;

    case 'action':
      $bs_ = __DIR__ . '/temp-github-actions';
      $gh_ = "https://raw.githubusercontent.com/btcpayserver/btcpayserver.github.io/master/source";
      wipeDirectory($bs_);
      if (!is_dir($bs_)) {
        mkdir($bs_);
      }

      $dir = __DIR__ . '/temp-github-actions';
      $url = "https://raw.githubusercontent.com/btcpayserver/btcpayserver.github.io/master/source/src/";
      $urls = [
        "css/fa_.min.css",
        "css/page-styles.css",
        "css/styles.css",
        "html/footer-tmpl.html",
        "html/tmpl.html",
        "html/donate/tmpl.html",
        "js/scripts.js",
        "json/donations.json",
        "vtt/video_tmpl.vtt",
        "img/clip602.gif",
        "img/community5.png",
        "img/demo2-01.png",
        "img/docs2-01.png",
        "img/dots.svg",
        "img/favicon.png",
        "img/git-01.png",
        "img/pay-2.png",
        "img/vidph.svg",
        "fonts/fa_/fa-brands-400.eot",
        "fonts/fa_/fa-brands-400.svg",
        "fonts/fa_/fa-brands-400.ttf",
        "fonts/fa_/fa-brands-400.woff",
        "fonts/fa_/fa-brands-400.woff2",
        "fonts/fa_/fa-regular-400.eot",
        "fonts/fa_/fa-regular-400.svg",
        "fonts/fa_/fa-regular-400.ttf",
        "fonts/fa_/fa-regular-400.woff",
        "fonts/fa_/fa-regular-400.woff2",
        "fonts/fa_/fa-solid-900.eot",
        "fonts/fa_/fa-solid-900.svg",
        "fonts/fa_/fa-solid-900.ttf",
        "fonts/fa_/fa-solid-900.woff",
        "fonts/fa_/fa-solid-900.woff2",
        "fonts/Open_Sans/Open_Sans_Regular.woff2",
        "fonts/Open_Sans/UFUK0Udc1GAK6bt6o.woff2",
        "fonts/Open_Sans/UFUK0Vdc1GAK6bt6o.woff2",
        "fonts/Open_Sans/UFUK0Wdc1GAK6bt6o.woff2",
        "fonts/Open_Sans/UFUK0Xdc1GAK6bt6o.woff2",
        "fonts/Open_Sans/UFUK0Zdc1GAK6b.woff2",
        "fonts/Open_Sans/UFUK0adc1GAK6bt6o.woff2",
        "fonts/Open_Sans/UFUK0ddc1GAK6bt6o.woff2",
        "fonts/Open_Sans/UFUZ0bf8pkAp6a.woff2",
        "fonts/Open_Sans/UFVZ0bf8pkAg.woff2",
        "fonts/Open_Sans/UFVp0bf8pkAp6a.woff2",
        "fonts/Open_Sans/UFW50bf8pkAp6a.woff2",
        "fonts/Open_Sans/UFWJ0bf8pkAp6a.woff2",
        "fonts/Open_Sans/UFWZ0bf8pkAp6a.woff2",
        "fonts/Open_Sans/UFWp0bf8pkAp6a.woff2",
        "fonts/Open_Sans/UN7rgOUehpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN7rgOUuhpKKSTjw.woff2",
        "fonts/Open_Sans/UN7rgOVuhpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN7rgOX-hpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN7rgOXOhpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN7rgOXehpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN7rgOXuhpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN8rsOUehpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN8rsOUuhpKKSTjw.woff2",
        "fonts/Open_Sans/UN8rsOVuhpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN8rsOX-hpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN8rsOXOhpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN8rsOXehpKKSTj5PW.woff2",
        "fonts/Open_Sans/UN8rsOXuhpKKSTj5PW.woff2"
      ];

      if (!is_dir($dir . '/src')) {
        mkdir($dir . '/src', 0777, false);
      }
      if (!is_dir($dir . '/src/html')) {
        mkdir($dir . '/src/html', 0777, false);
      }
      if (!is_dir($dir . '/src/html/donate')) {
        mkdir($dir . '/src/html/donate', 0777, false);
      }
      if (!is_dir($dir . '/src/css')) {
        mkdir($dir . '/src/css', 0777, false);
      }
      if (!is_dir($dir . '/src/js')) {
        mkdir($dir . '/src/js', 0777, false);
      }
      if (!is_dir($dir . '/src/json')) {
        mkdir($dir . '/src/json', 0777, false);
      }
      if (!is_dir($dir . '/src/vtt')) {
        mkdir($dir . '/src/vtt', 0777, false);
      }
      if (!is_dir($dir . '/src/fonts')) {
        mkdir($dir . '/src/fonts', 0777, false);
      }
      if (!is_dir($dir . '/src/img')) {
        mkdir($dir . '/src/img', 0777, false);
      }
      if (!is_dir($dir . '/src/fonts')) {
        mkdir($dir . '/src/fonts', 0777, false);
      }
      if (!is_dir($dir . '/src/fonts/fa_')) {
        mkdir($dir . '/src/fonts/fa_', 0777, false);
      }
      if (!is_dir($dir . '/src/fonts/Open_Sans')) {
        mkdir($dir . '/src/fonts/Open_Sans', 0777, false);
      }

      function file_get_contents_curl($url, $retries = 10)
      {
        $ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36';
        if (extension_loaded('curl') === true) {
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
          curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
          curl_setopt($ch, CURLOPT_USERAGENT, $ua);
          curl_setopt($ch, CURLOPT_FAILONERROR, TRUE);
          curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
          curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
          curl_setopt($ch, CURLOPT_TIMEOUT, 10);
          curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
          $result = curl_exec($ch);
          curl_close($ch);
        } else {
          $result = file_get_contents($url);
        }
        if (empty($result) === true) {
          $result = false;
          if ($retries >= 1) {
            sleep(1);
            return file_get_contents_curl($url, --$retries);
          }
        }
        return $result;
      }

      for ($i = 0; $i < count($urls); $i++) {
        if (file_exists($dir . $urls[$i])) unlink($dir . $urls[$i]);
        $file = $url . $urls[$i];
        $name = $urls[$i];

        $page = file_get_contents_curl($file);

        file_put_contents($dir . "/src/" . $name, $page);
      }

      $tmpl = file_get_contents($bs_ . '/src/html/tmpl.html');
      $donate_tmpl = file_get_contents($bs_ . '/src/html/donate/tmpl.html');
      $ftblk = file_get_contents($bs_ . '/src/html/footer-tmpl.html');
      $donations = file_get_contents($bs_ . '/src/json/donations.json');
      $video_tmpl_ = file_get_contents($bs_ . '/src/vtt/video_tmpl.vtt');
      $js = file_get_contents($bs_ . '/src/js/scripts.js');
      $css = file_get_contents($bs_ . '/src/css/styles.css');
      $pagecss = file_get_contents($bs_ . '/src/css/page-styles.css');
      $fa = file_get_contents($bs_ . '/src/css/fa_.min.css');
      break;
      case "git":
        //PHP FILE CONTAINING GIT CLASSES FOR PHP TO EXECUTE GIT COMMANDS
      require_once(__DIR__."/git.php");

      exec("cd ".__DIR__);
      
      if(!is_dir("btcpayserver.github.io")){
      exec("git clone https://github.com/btcpayserver/btcpayserver.github.io");
      echo "cloning git...<br>";
      exec("cd btcpayserver.github.io");
      }else{
        exec("cd btcpayserver.github.io");
        exec("git pull");
        echo "pulling git...<br>";
      }
      $bs_ = __DIR__ . '/btcpayserver.github.io/source';
      $tmpl = file_get_contents($bs_ . '/src/html/tmpl.html');
      $donate_tmpl = file_get_contents($bs_ . '/src/html/donate/tmpl.html');
      $ftblk = file_get_contents($bs_ . '/src/html/footer-tmpl.html');
      $donations = file_get_contents($bs_ . '/src/json/donations.json');
      $video_tmpl_ = file_get_contents($bs_ . '/src/vtt/video_tmpl.vtt');
      $js = file_get_contents($bs_ . '/src/js/scripts.js');
      $css = file_get_contents($bs_ . '/src/css/styles.css');
      $pagecss = file_get_contents($bs_ . '/src/css/page-styles.css');
      $fa = file_get_contents($bs_ . '/src/css/fa_.min.css');
      break;

    default:
      $bs_ = __DIR__ . '/github-source';
  }

  $tmpl = $tmpl ? $tmpl : file_get_contents($bs_ . '/src/html/tmpl.html', true);
  $donate_tmpl = $donate_tmpl ? $donate_tmpl : file_get_contents($bs_ . '/src/html/donate/tmpl.html', true);

  $ftblk = $ftblk ? $ftblk : file_get_contents($bs_ . '/src/html/footer-tmpl.html', true);
  //PRETREAT TEMPLATE FILES WITH FOOTER BEFORE TRANSLATION LOOPS BELOW
  $pretreatMarkers = ['$ftblk'];
  $treatment = [$ftblk];

  $tmpl = str_replace($pretreatMarkers, $treatment, $tmpl);
  $donate_tmpl = str_replace($pretreatMarkers, $treatment, $donate_tmpl);

  $scrmm = ['<a alt="$j[83]" href="donate">$_donate</a>'];
  $donate_tmpl = str_replace($scrmm, "", $donate_tmpl);

  //END OF PRETREAT
  $donations = $donations ? $donations : file_get_contents($bs_ . '/src/json/donations.json', true);
  $video_tmpl_ = $video_tmpl_ ? $video_tmpl_ : file_get_contents($bs_ . '/src/vtt/video_tmpl.vtt', true);
  $js = $js ? $js : file_get_contents($bs_ . '/src/js/scripts.js', true);
  $css = $css ? $css : file_get_contents($bs_ . '/src/css/styles.css', true);
  $pagecss = $pagecss ? $pagecss : file_get_contents($bs_ . '/src/css/page-styles.css', true);
  $fa = $fa ? $fa : file_get_contents($bs_ . '/src/css/fa_.min.css', true);


  $tmpl = minify_html($tmpl);
  $donate_tmpl = minify_html($donate_tmpl);
  $js = new Minify\JS($js);
  $js = $js->minify();
  $js = "<script>" . $js . "</script>";
  $css = new Minify\CSS($css);
  $css = $css->minify();
  $css = "<style>" . $css . "</style>";
  $pagecss = "<style>" . $pagecss . "</style>";
  $fa = "<style>" . $fa . "</style>";

  //TEST
  $jsonDonations = $donations;
  $donations = json_decode($donations);
  $donationsBlock = "";
  for ($i = 0; $i < count($donations); $i++) {
    $donationsBlock .= '<a href="' . $donations[$i][1] . '" class="ind-icon"><div class="in-img"></div><span class="in-nom">' . $donations[$i][0] . '</span></a>';
  }
  //END TEST

  wipeDirectory("/../img");
  wipeDirectory("/../fonts");
  //
  //
  //TEMPORARY MEASURE FOR USING LOCAL RESOURCES UNTIL WE ARE ABLE TO MORE EASILY COPY GITHUB FOLDERS INTO THE LOCAL ROOT DIRECTORY
  //
  //
  shell_exec('cp -R ' . $bs_ . '/src/img ../');
  shell_exec('cp -R ' . $bs_ . '/src/fonts ../');

  shell_exec('cp -R ' . $bs_ . '/src/img ../forGitHub/');
  shell_exec('cp -R ' . $bs_ . '/src/fonts ../forGitHub/');

  $onlineSiteJSON = getAvailableTransifex("en-json");
  foreach ($onlineSiteJSON as $json_file_name) {
    $o = getResourceFile("en-json", $json_file_name);
    $json_file_name = $json_file_name == "en_GB" ? "en" : $json_file_name;


    $raw = $json_file_name;
    $j = $o;

    $lngOpts = '';
    $lngDrDoOo = [];

    $lngOptsDonate = '';
    $lngDrDoOoDonate = [];

    foreach ($onlineSiteJSON as $fileInfo) {

      $r = $fileInfo != "en_GB" ? $fileInfo : "en";
      if ($r) {
        if ($r != $raw) {
          $jfr = strpos($r, '_') ? explode('_', $r) : $r;
          $k = is_array($jfr) ? $jfr[0] : $jfr;
          $z = is_array($jfr) ? $jfr[1] : NULL;
          $native = ucfirst(Locale::getDisplayLanguage($k, $k));
          $reg = $z != NULL ? ' (' . strtolower($z) . ')' : '';
          if ($r == 'en') {
            $lngDrDoOo[$k] = '<li class="nullTrans"><a class="nullTrans" href="/">' . $native . $reg . '</a></li>';
            $lngDrDoOoDonate[$k] = '<li class="nullTrans"><a class="nullTrans" href="/donate">' . $native . $reg . '</a></li>';
          } else {
            $lngDrDoOo[$k] = '<li class="nullTrans"><a class="nullTrans" href="/' . $r . '/">' . $native . $reg . '</a></li>';
            $lngDrDoOoDonate[$k] = '<li class="nullTrans"><a class="nullTrans" href="/' . $r . '/donate">' . $native . $reg . '</a></li>';
          }
        }
      }
    }







    ksort($lngDrDoOo);
    ksort($lngDrDoOoDonate);

    foreach ($lngDrDoOo as $key => $val) {
      if (is_array($val)) {
        for ($i = 0; $i < count($val); $i++) {
          $lngOpts .= $val[$i];
        }
      } else {
        $lngOpts .= $val;
      }
    }

    foreach ($lngDrDoOoDonate as $key => $val) {
      if (is_array($val)) {
        for ($i = 0; $i < count($val); $i++) {
          $lngOptsDonate .= $val[$i];
        }
      } else {
        $lngOptsDonate .= $val;
      }
    }

    $raw = !$raw ? 'En' : $raw;
    $to = $raw != 'he' && $raw != 'ar' ? 'ltr' : 'rtl';
    $align = $raw != 'he' && $raw != 'ar' ? 'stickLeft' : 'stickRight';
    $rl = $raw != 'he' && $raw != 'ar' ? 'right' : 'left';
    $L_rl = $raw != 'he' && $raw != 'ar' ? 'l' : 'r';
    $R_rl = $raw != 'he' && $raw != 'ar' ? 'r' : 'l';
    $lnstr = $raw; //explode("_", $raw)[0];
    $sub = ucwords(Locale::getDisplayLanguage($raw, $raw));
    $enlngfb = $raw != 'en' ? '<track src="/vtt/en.vtt" label="English" kind="subtitles" srclang="en">' : '';

    $exp0 = strpos($raw, '_') ? explode("_", $raw)[0] : $raw;
    if (isset($j[11], $j[71])) {
      $exp71 = strpos($j[11], $j[71]) ? explode($j[71], $j[11]) : $j[71];
      $exp71 = is_array($exp71) ? $exp71[0] . $j[71] . $exp71[1] : $j[71];
    } else {
      $exp71 = '';
    }


    $exp5624 = isset($j[56], $j[24]) && strpos($j[24], $j[56]) ? explode($j[56], $j[24])[0] : '';
    $exp5756 = isset($j[56], $j[57]) && strpos($j[24], $j[56]) ? explode($j[57], explode($j[56], $j[24])[1])[0] : '';
    $exp5857 = isset($j[57], $j[58]) && strpos($j[24], $j[57]) ? explode($j[58], explode($j[57], $j[24])[1])[0] : '';
    $exp5069 = isset($j[59], $j[60]) && strpos($j[24], $j[59]) ? explode($j[60], explode($j[59], $j[24])[1])[0] : '';
    $exp29 = isset($j[29]) ? strpos($j[29], 'FLAT18.CO.UK') ? explode("FLAT18.CO.UK", $j[29])[0] : $j[29] : '';
    $exp229 = isset($j[29]) && strpos($j[29], 'FLAT18.CO.UK') ? str_replace('.', '<br>', explode("FLAT18.CO.UK", $j[29])[1]) : '';
    $_donate = isset($j[38]) ? ucfirst(strtolower($j[38])) : '';
    $_blog = ucfirst(strtolower($j[2]));


    $placeholders = ['$exp0', '$exp71', '$exp5624', '$exp5756', '$exp5857', '$exp5069', '$exp29', '$exp229', '$raw', '$to', '$align', '$lngOpts', '$lDngOptsDonate', '$rl', '$L_rl', '$R_rl', '<script src="/js/scripts.js"></script>', '<link rel="stylesheet" type="text/css" href="/css/styles.css">', '<link rel="stylesheet" type="text/css" href="/css/fa_.min.css">', '<link rel="stylesheet" type="text/css" href="/source/github-source/src/css/page-styles.css">', '$__lang', '$sub', '$lnstr', '$enlngfb', '$_donate', '$_blog', '$jsonDonations', '$donationsBlock'];
    $payload = [$exp0, $exp71, $exp5624, $exp5756, $exp5857, $exp5069, $exp29, $exp229, $raw, $to, $align, $lngOpts, $lngOptsDonate, $rl, $L_rl, $R_rl, $js, $css, $fa, $pagecss, $raw, $sub, $lnstr, $enlngfb, $_donate, $_blog, $jsonDonations, $donationsBlock];

    for ($i = 0; $i < count($j); $i++) {
      $placeholders[] = '$j[' . $i . ']';
      $payload[] = $j[$i];
    }

    $translatedPage = str_replace($placeholders, $payload, $tmpl);

    $translatedDonationPage = str_replace($placeholders, $payload, $donate_tmpl);




    if ($raw == "en") {
      file_put_contents(__DIR__ . '/../index.html', $translatedPage);
      file_put_contents(__DIR__ . '/../forGitHub/index.html', $translatedPage);
      if (!is_dir(__DIR__ . '/../donate')) {
        mkdir(__DIR__ . '/../donate');
      }
      mkdir(__DIR__ . '/../forGitHub/donate');
      file_put_contents(__DIR__ . '/../donate/index.html', $translatedDonationPage);
      file_put_contents(__DIR__ . '/../forGitHub/donate/index.html', $translatedDonationPage);
    } else {
      if (is_dir(__DIR__ . '/../' . $raw)) {
        $a = new RecursiveDirectoryIterator(__DIR__ . '/../' . $raw, RecursiveDirectoryIterator::SKIP_DOTS);
        $b = new RecursiveIteratorIterator(
          $a,
          RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($b as $q) {
          if ($q->isDir()) {
            rmdir($q->getRealPath());
          } else {
            unlink($q->getRealPath());
          }
        }
        rmdir(__DIR__ . '/../' . $raw);
      }
      mkdir(__DIR__ . '/../' . $raw, 0777, true);
      mkdir(__DIR__ . '/../' . $raw . '/donate', 0777, true);
      mkdir(__DIR__ . '/../forGitHub/' . $raw, 0777, true);
      mkdir(__DIR__ . '/../forGitHub/' . $raw . '/donate', 0777, true);
      file_put_contents(__DIR__ . '/../' . $raw . '/index.html', $translatedPage);
      file_put_contents(__DIR__ . '/../' . $raw . '/donate/index.html', $translatedDonationPage);
      file_put_contents(__DIR__ . '/../forGitHub/' . $raw . '/index.html', $translatedPage);
      file_put_contents(__DIR__ . '/../forGitHub/' . $raw . '/donate/index.html', $translatedDonationPage);
    }

    echo "Transifex: <b>" . $raw . "</b><br>";
  }





//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////






  wipeDirectory('/../forGitHub/vtt');
  wipeDirectory('/../vtt');
  //MAKE GITHUB-READY COLLECTION OF JSON

  $video_slug = "video_en_json";
  $available_video_json = getAvailableTransifex("video_en_json");

  foreach ($available_video_json as $video_json_file_name) {
    $o_video = getResourceFile("video_en_json", $video_json_file_name);
    $n = explode('_', $video_json_file_name);
    $na = ucfirst(Locale::getDisplayLanguage($n[0], $n[0]));
    $nam = $video_json_file_name != "en_GB" && $video_json_file_name != "en" ? $video_json_file_name : "en";
    //$nam names the vtt file below so needs to represent en as shown above

    $s = [4, 2, 1, 3, 1, 1, 1, 3, 1, 2, 1];

    $p = [];

    $t = $o_video;
    for ($i = 0; $i < count($t); $i++) { // for each sentence
      $ts = $t[$i];
      $w = count(explode(' ', $ts));
      $aw = explode(' ', $ts);
      $d = 1 / $s[$i];
      $m = $s[$i] != 1 ? ceil($w * $d) : 1;
      $se = [];
      if ($m == 1) {
        $p[] = $ts;
      } else {

        $this_phrase = "";
        $tsp = " ";

        for ($j = 0; $j < $w; $j++) { // for each word in this sentence
          $this_phrase .= $aw[$j] && strlen($aw[$j]) > 0 ? $aw[$j] . $tsp : "";
          $cps = ($j) % ($m);
          if ($cps == $m - 1 && strlen(trim($this_phrase)) > 0) {
            $p[] = $this_phrase;
            $this_phrase = "";
          }
          if ($j == $w - 1 && strlen(trim($this_phrase)) > 0) {
            $p[] = $this_phrase;
            $this_phrase = "";
          }
        }
      }
    }
    $p = array_filter($p);

    $ph = [];
    $pl = [];

    for ($i = 0; $i < count($p); $i++) {
      $ph[] = '$p[' . $i . ']';
    }

    $trans = str_replace($ph, $p, $video_tmpl_);

    file_put_contents(__DIR__ . '/../vtt/' . $nam . '.vtt', $trans);
    file_put_contents(__DIR__ . '/../forGitHub/vtt/' . $nam . '.vtt', $trans);

    echo "---------------------------------------------------------------------<br>";
  }
}


if (isset($_GET['test']) && trim($_GET['test']) == "download") {
  $url = isset($_GET['url']) ? trim($_GET['url']) : 'https://raw.githubusercontent.com/btcpayserver/btcpayserver.github.io/master/source/src/js/scripts.js';
  download($url);
}

if (isset($_GET['test']) && trim($_GET['test']) == "resource") {
  $r = isset($_GET['resource']) ? trim($_GET['resource']) : NULL;
  echo "trying resource";
  echo json_encode(getAvailableTransifex($r));
}

if($build_source=="git"){

  recurse_copy("/var/www/btcpayserver.flat18.co.uk/forGitHub", "/var/www/btcpayserver.flat18.co.uk/source/btcpayserver.github.io/");
  exec("cd ".__DIR__."btcpayserver.github.io");
}

$elapsed = strtotime('now') - $start;
echo "<h1 style='position:sticky'>" . $elapsed . "s</h1>";
