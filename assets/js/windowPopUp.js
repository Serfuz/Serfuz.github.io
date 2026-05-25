document.addEventListener("DOMContentLoaded", () => {

  let popup = document.createElement("div");

  popup.style.position = "fixed";
  popup.style.background = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.padding = "8px";
  popup.style.borderRadius = "6px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  popup.style.display = "none";
  popup.style.zIndex = "9999";
  popup.style.width = "500px";

  document.body.appendChild(popup);


  let hoverTimeout = null;
  let hideTimeout = null;
  let currentLink = null;
  


document.addEventListener("mousemove", (e) => {
  const link = e.target.closest(".windowPopUp");

  // ✅ If we moved onto a new link
  if (link !== currentLink) {

    // ✅ cancel previous hover
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }

    currentLink = link;

    // ✅ only start timer if on a link
    if (link) {

      const rect = link.getBoundingClientRect();
      const x = rect.right;
      const y = rect.top;

      hoverTimeout = setTimeout(() => {
        // ✅ still same link?
        if (currentLink !== link) return;

        const url = link.href;

        const maxX = window.innerWidth - 520;
        const maxY = window.innerHeight - 380;

        popup.style.left = Math.min(x + 15, maxX) + "px";
        popup.style.top = Math.min(y + 15, maxY) + "px";

        popup.innerHTML = `
          <div style="font-weight:bold; margin-bottom:5px;">
            ${url}
          </div>
          <iframe 
            src="${url}" 
            style="width:100%; height:350px; border:none;"
          ></iframe>
        `;

        popup.style.display = "block";

      }, 500); // ✅ TRUE hover intent
    }
  }
});


document.addEventListener("mouseleave", () => {
  currentLink = null;

  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }

  popup.style.display = "none";
});


popup.addEventListener("mouseenter", () => {
  currentLink = "popup";
});

popup.addEventListener("mouseleave", () => {
  currentLink = null;
  popup.style.display = "none";
});


  // ✅ HOVER OFF
  document.addEventListener("mouseout", (e) => {
    const leavingLink = e.target.closest(".windowPopUp");
    const goingTo = e.relatedTarget;

    // if leaving a link
    if (leavingLink) {

      // if going into popup → DON'T hide
      if (popup.contains(goingTo)) return;

      hideTimeout = setTimeout(() => {
        popup.style.display = "none";
      }, 200);
    }
  });

  // ✅ also keep popup visible if hovering it
  popup.addEventListener("mouseenter", () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  });

  popup.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      popup.style.display = "none";
    }, 200);
  });

});