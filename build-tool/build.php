<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function cp($f, $t)
{
  if (is_link($f)) {
    return symlink(readlink($f), $t);
  }
  if (is_file($f)) {
    return copy($f, $t);
  }
  if (is_dir($t)) {
    $a = new RecursiveDirectoryIterator($t, RecursiveDirectoryIterator::SKIP_DOTS);
    $b = new RecursiveIteratorIterator($a, RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($b as $q) {
      if ($q->isDir()) {
        rmdir($q->getRealPath());
      } else {
        unlink($q->getRealPath());
      }
    }
    rmdir($t);
  }
  mkdir($t, 0777);
  $d = dir($f);
  while (false !== $o = $d->read()) {
    if ($o == '.' || $o == '..') {
      continue;
    }
    cp("$f/$o", "$t/$o", 0777);
  }
  $d->close();
  return true;
}

cp(__DIR__ . '/components/fonts', __DIR__ . '/../fonts');
cp(__DIR__ . '/components/img', __DIR__ . '/../img');

$u = file_get_contents(__DIR__ . '/components/template.html', true);
$js = file_get_contents(__DIR__ . '/components/js/scripts.js', true);
$css = file_get_contents(__DIR__ . '/components/css/styles.css', true);
$js = "<script>" . $js . "</script>";
$css = "<style>" . $css . "</style>";
$fa = "<style>" . file_get_contents(__DIR__ . '/components/css/fa_.min.css', true) . "</style>";

foreach (new DirectoryIterator(__DIR__ . '/components/json/') as $f) {
  if ($f->isDot()) continue;
  $n = explode('.json', $f->getFilename())[0];
  $x = json_decode(file_get_contents(__DIR__ . '/components/json/en.json'), true);
  $j = !$n ? $x : json_decode(file_get_contents(__DIR__ . "/components/json/" . $n . ".json"), true);
  $l = '';
  $o = [];

  foreach (new DirectoryIterator(__DIR__ . '/components/json/') as $y) {
    if ($y->isDot()) continue;
    $r = explode('.json', $y->getFilename())[0];
    if ($r != $n) {
      $m = strpos($r, '_') ? explode('_', $r) : $r;
      $k = is_array($m) ? $m[0] : $m;
      $z = is_array($m) ? $m[1] : NULL;
      $v = ucfirst(Locale::getDisplayLanguage($k, $k));
      $g = $z != NULL ? ' (' . strtolower($z) . ')' : '';
      $q = $n != 'en' && $r != 'en' ? '../' : '';
      if ($r == 'en') {
        $o[$k] = '<li><a href="' . $q . '../">' . $v . $g . '</a></li>';
      } else {
        $o[$k] = '<li><a href="' . $q . $r . '/">' . $v . $g . '</a></li>';
      }
    }
  }


  ksort($o);
  foreach ($o as $k => $v) {
    if (is_array($v)) {
      for ($i = 0; $i < count($v); $i++) {
        $l .= $v[$i];
      }
    } else {
      $l .= $v;
    }
  }

  $n = !$n ? 'En' : $n;
  $to = $n != 'he' && $n != 'ar' ? 'ltr' : 'rtl';
  $g = $n != 'he' && $n != 'ar' ? 'stickLeft' : 'stickRight';
  $rl = $n != 'he' && $n != 'ar' ? 'right' : 'left';
  $L_rl = $n != 'he' && $n != 'ar' ? 'l' : 'r';
  $R_rl = $n != 'he' && $n != 'ar' ? 'r' : 'l';
  $sub = ucwords(Locale::getDisplayLanguage($n, $n));
  $enlngfb = $n != 'en' ? '<track src="/video/en.vtt" label="English" kind="subtitles" srclang="en">' : '';

  $css = $n == 'en' ? $css : str_replace("url(img", "url(../img", $css);
  $fa = $n == 'en' ? $fa : str_replace("url(fonts", "url(../fonts", $fa);

  $h0 = strpos($n, '_') ? explode("_", $n)[0] : $n;
  $_h0 = $n != 'en' ? '../video/' . $h0 : 'video/' . $h0;
  if (isset($j[11], $j[71])) {
    $h71 = strpos($j[11], $j[71]) ? explode($j[71], $j[11]) : $j[71];
    $h71 = is_array($h71) ? $h71[0] . $j[71] . $h71[1] : $j[71];
  } else {
    $h71 = '';
  }

  $i0 = $n != 'en' ? '../img/' : 'img/';
  $js = $n == 'en' ? $js : str_replace("img/", $i0, $js);
  $h5624 = isset($j[56], $j[24]) && strpos($j[24], $j[56]) ? explode($j[56], $j[24])[0] : '';
  $h5756 = isset($j[56], $j[57]) && strpos($j[24], $j[56]) ? explode($j[57], explode($j[56], $j[24])[1])[0] : '';
  $h5857 = isset($j[57], $j[58]) && strpos($j[24], $j[57]) ? explode($j[58], explode($j[57], $j[24])[1])[0] : '';
  $h5069 = isset($j[59], $j[60]) && strpos($j[24], $j[59]) ? explode($j[60], explode($j[59], $j[24])[1])[0] : '';
  $h29 = isset($j[29]) ? strpos($j[29], 'FLAT18.CO.UK') ? explode("FLAT18.CO.UK", $j[29])[0] : $j[29] : '';
  $h229 = isset($j[29]) && strpos($j[29], 'FLAT18.CO.UK') ? str_replace('.', '<br>', explode("FLAT18.CO.UK", $j[29])[1]) : '';
  $_donate = isset($j[38]) ? ucfirst(strtolower($j[38])) : '';


  $q = ['img/', '$_h0', '$h0', '$h71', '$h5624', '$h5756', '$h5857', '$h5069', '$h29', '$h229', '$n', '$to', '$g', '$l', '$rl', '$L_rl', '$R_rl', '$js', '$css', '$fa', '$__lang', '$sub', '$enlngfb', '$_donate'];
  $d = [$i0, $_h0, $h0, $h71, $h5624, $h5756, $h5857, $h5069, $h29, $h229, $n, $to, $g, $l, $rl, $L_rl, $R_rl, $js, $css, $fa, $n, $sub, $enlngfb, $_donate];
  if (is_array($j)) {
    for ($i = 0; $i < count($j); $i++) {
      $q[] = '$j[' . $i . ']';
      $d[] = $j[$i];
    }
  }

  $s = str_replace($q, $d, $u);


  if ($n == "en") {
    file_put_contents(__DIR__ . '/../index.html', $s);
  } else {
    if (!is_dir(__DIR__ . '/../' . $n)) {
      mkdir(__DIR__ . '/../' . $n, 0777, true);
    }
    file_put_contents(__DIR__ . '/../' . $n . '/index.html', $s);
  }
}


if (is_dir(__DIR__ . '/../video')) {
  $a = new RecursiveDirectoryIterator(__DIR__ . '/../video', RecursiveDirectoryIterator::SKIP_DOTS);
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
  rmdir(__DIR__ . '/../video');
}
mkdir(__DIR__ . '/../video', 0777, true);


foreach (new DirectoryIterator(__DIR__ . '/components/video/json/') as $f) {
  if ($f->isDot()) continue;
  $n = str_replace('.json', '', $f->getFilename());
  $n = explode('_', $n);
  $q = $f->getFilename();
  $c = [4, 2, 1, 3, 1, 1, 1, 3, 1, 2, 1];
  $p = [];
  $t = json_decode(file_get_contents(__DIR__ . "/components/video/json/" . $q), true);
  if (is_array($t)) {
    for ($i = 0; $i < count($t); $i++) {
      $s = $t[$i];
      $w = strpos($s, ' ') ? count(explode(' ', $s)) : 1;
      $a = explode(' ', $s);
      $d = isset($c[$i]) ? $c[$i] > 0 ? 1 / $c[$i] : 0 : 0;
      $v = $w && $d && !is_nan($w) && !is_nan($d) ? $w * $d : 0;
      $m = isset($c[$i]) ? $c[$i] != 1 ? ceil($v) : 1 : 1;
      if ($m == 1) {
        $p[] = $s;
      } else {
        $h = "";
        $e = " ";
        for ($j = 0; $j < $w; $j++) {
          $h .= isset($a[$j]) && strlen($a[$j]) > 0 ? $a[$j] . $e : "";
          $k = $m > 0 && !is_nan($m) ? ($j) % ($m) : 1;
          if ($k == $m - 1 && strlen(trim($h)) > 0) {
            $p[] = $h;
            $h = "";
          } elseif ($j == ($w - 1) && strlen(trim($h)) > 0) {
            $p[] = $h;
            $h = "";
          }
        }
      }
    }
  }
  $p = array_filter($p);
  $x = [];
  $y = [];
  for ($i = 0; $i < count($p); $i++) {
    $x[] = '$p[' . $i . ']';
  }
  $t = file_exists(__DIR__ . '/components/cc_template.vtt') ? file_get_contents(__DIR__ . '/components/cc_template.vtt', true) : '';
  $z = str_replace($x, $p, $t);
  file_put_contents(__DIR__ . '/../video/' . $n[0] . '.vtt', $z);
}


print "Done<br>
<a target='_new' href='" . dirname(".") . "/../'>View site</a>";
