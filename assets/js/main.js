(function(){
  // Mark current nav link as active
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('[data-nav]').forEach(a => {
    if(a.getAttribute('href') === path){
      a.setAttribute('aria-current','page');
    }
  });

  // Copy email helper (optional)
  const copyBtn = document.getElementById("copyEmail");
  if(copyBtn){
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.email || "";
      try{
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Email copié ✓";
        setTimeout(()=> copyBtn.textContent = "Copier l’email", 1400);
      }catch(e){
        alert("Impossible de copier automatiquement. Email : " + email);
      }
    });
  }

  // Project filter (on projets.html)
  const filterSelect = document.getElementById("projectFilter");
  if(filterSelect){
    const cards = Array.from(document.querySelectorAll("[data-project]"));
    const apply = () => {
      const v = filterSelect.value;
      cards.forEach(card => {
        const tags = (card.dataset.tags || "").split(",").map(s=>s.trim()).filter(Boolean);
        const ok = (v === "all") || tags.includes(v);
        card.style.display = ok ? "" : "none";
      });
    };
    filterSelect.addEventListener("change", apply);
    apply();
  }
})();
