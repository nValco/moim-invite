(function () {
  var token = location.hash.slice(1);
  var ok = /^[0-9a-f]{64}$/.test(token);
  document.getElementById(ok ? 'ok' : 'bad').hidden = false;
  if (!ok) return;
  var appUrl = 'moimapp://invite/' + token;
  var help = document.getElementById('help');
  document.getElementById('open').addEventListener('click', function () {
    location.href = /Android/i.test(navigator.userAgent)
      ? 'intent://invite/' + token + '#Intent;scheme=moimapp;package=com.nvalco.moimapp;end'
      : appUrl;
    setTimeout(function () {
      if (document.visibilityState === 'visible') {
        help.classList.add('hl');
        help.scrollIntoView({ block: 'center' });
      }
    }, 1500);
  });
  function showFallback() {
    var box = document.getElementById('fallback');
    var input = document.getElementById('url');
    box.hidden = false;
    input.value = appUrl;
    input.focus();
    input.select();
  }
  document.getElementById('copy').addEventListener('click', function () {
    var done = function () { document.getElementById('copied').hidden = false; };
    if (!navigator.clipboard || !navigator.clipboard.writeText) return showFallback();
    navigator.clipboard.writeText(appUrl).then(done, showFallback);
  });
})();
