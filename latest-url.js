const repo = 'simplerick/window-shift';
const file_prefix = "WindowShift"
const file_ext = "zip"

const downloadButton = document.getElementById('download-button');
const downloadUnavailable = document.getElementById('download-unavailable');
const heroMeta = document.querySelector('.hero-meta');

fetch(`https://api.github.com/repos/${repo}/releases/latest`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    return response.json();
  })
  .then(release => {
    const asset = release.assets.find(asset =>
      asset.name.startsWith(file_prefix) &&
      asset.name.endsWith(`.${file_ext}`) &&
      asset.browser_download_url
    );
    if (!asset) {
      throw new Error('Asset not found');
    }
    downloadButton.href = asset.browser_download_url;
    downloadButton.hidden = false;
    heroMeta.classList.add('is-visible');
  })
  .catch(error => {
    console.error('Failed to load latest release:', error);
    downloadUnavailable.hidden = false;
  });