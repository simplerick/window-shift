  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  const stored = localStorage.getItem('theme');
  const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;

  root.dataset.theme = stored ?? (systemDark ? 'dark' : 'light');

  btn.onclick = () => {
    root.dataset.theme =
      root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
  };