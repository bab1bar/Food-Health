// ✅ 1. Highlight every "بریانی" word in the page
document.body.innerHTML = document.body.innerHTML.replace(
  /بریانی/g,
  '<span class="highlight">بریانی</span>'
);

// ✅ 2. Create an overlay to dim background when zoomed
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.cssText =
  'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.6);display:none;z-index:1000;';
document.body.appendChild(overlay);

// ✅ 3. Handle image zoom in/out
document.querySelectorAll('.pic').forEach((img) => {
  img.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent immediate zoom-out
    // Close any other zoomed images
    document.querySelectorAll('.pic.zoomed').forEach((other) => {
      if (other !== img) other.classList.remove('zoomed');
    });

    // Toggle zoom on this image
    img.classList.toggle('zoomed');

    // Show or hide overlay
    overlay.style.display = img.classList.contains('zoomed')
      ? 'block'
      : 'none';
  });
});

// ✅ 4. Clicking overlay or anywhere outside image unzooms it
function unzoomAll() {
  document.querySelectorAll('.pic.zoomed').forEach((img) =>
    img.classList.remove('zoomed')
  );
  overlay.style.display = 'none';
}

overlay.addEventListener('click', unzoomAll);
document.addEventListener('click', unzoomAll);
