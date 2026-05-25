document.addEventListener("DOMContentLoaded", () => {

  let popup = document.createElement("div");

  popup.style.position = "absolute";
  popup.style.background = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.padding = "8px";
  popup.style.borderRadius = "6px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  popup.style.display = "none";
  popup.style.zIndex = "9999";
  popup.style.width = "500px";

  document.body.appendChild(popup);

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  // ✅ attach to all popup links
  document.querySelectorAll(".windowPopUp").forEach(link => {

    link.addEventListener("click", (e) => {
      e.preventDefault();

      const url = link.href;

      // ✅ place near cursor (once)
      popup.style.left = (mouseX + 15) + "px";
      popup.style.top = (mouseY + 15) + "px";

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
    });

  });

  // ✅ click outside → close
  document.addEventListener("click", (e) => {
    if (popup.contains(e.target)) return;

    if (e.target.classList.contains("windowPopUp")) return;

    popup.style.display = "none";
  });

});