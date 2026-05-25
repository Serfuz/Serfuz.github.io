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

  // ✅ HOVER ON
  document.addEventListener("mouseover", (e) => {
    const link = e.target.closest(".windowPopUp");
    if (!link) return;

    // ❗ cancel hiding if moving between link + popup
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    if (hoverTimeout) clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(() => {
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
    }, 300); // ✅ small delay improves UX
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