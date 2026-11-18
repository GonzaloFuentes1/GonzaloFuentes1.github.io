(function () {
  // Correos armados en el navegador para que no queden en el HTML plano.
  var r = function (s) { return s.split('').reverse().join(''); };
  document.querySelectorAll('.js-mail').forEach(function (a) {
    var addr = r(a.dataset.u) + '@' + r(a.dataset.d);
    a.href = 'mailto:' + addr;
    var t = a.querySelector('.addr');
    if (t) t.textContent = addr;
  });

  // Pestañas: muestran una sección a la vez; sin JS se ve todo.
  var sections = Array.prototype.slice.call(document.querySelectorAll('main > section'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs a[href^="#"]'));
  function show(id, focus) {
    if (!sections.some(function (s) { return s.id === id; })) id = sections[0].id;
    sections.forEach(function (s) { s.hidden = s.id !== id; });
    tabs.forEach(function (t) {
      if (t.getAttribute('href') === '#' + id) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    if (focus) {
      var h = document.getElementById(id).querySelector('h2');
      h.setAttribute('tabindex', '-1');
      h.focus({ preventScroll: true });
    }
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      var id = t.getAttribute('href').slice(1);
      history.replaceState(null, '', '#' + id);
      show(id, true);
    });
  });
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), true); });
  show(location.hash.slice(1), false);
  // Con un link directo a una pestaña, partir arriba para que se vea la cabecera.
  if (location.hash) window.addEventListener('load', function () { window.scrollTo(0, 0); });
})();
