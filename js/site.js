// Empty until a real address is set. The contact page shows a mailto link only then.
const CONTACT_EMAIL = "";

document.documentElement.classList.add("js");

(function () {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");

  function setOpen(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.classList.toggle("is-open", open);
    toggle.textContent = open ? "Close" : "Menu";
  }

  if (toggle && panel) {
    setOpen(false);
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
      if (open) {
        const first = panel.querySelector("a");
        if (first) first.focus();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  const email = validEmail(CONTACT_EMAIL);
  const mail = document.querySelector("[data-mail]");
  const noMail = document.querySelector("[data-no-mail]");
  if (email && mail) {
    const link = document.createElement("a");
    link.href = "mailto:" + email + "?subject=" + encodeURIComponent("Contract work with Amber Roberts");
    link.textContent = "Write to " + email;
    mail.appendChild(link);
    mail.hidden = false;
    if (noMail) noMail.remove();
  } else if (mail) {
    mail.remove();
  }

  const copyButton = document.querySelector("[data-copy-brief]");
  const brief = document.querySelector("[data-brief]");
  const status = document.querySelector("[data-copy-status]");
  if (copyButton && brief) {
    copyButton.addEventListener("click", function () {
      const text = brief.innerText.replace(/\n{3,}/g, "\n\n").trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (status) status.textContent = "Copied.";
        }).catch(function () {
          selectBrief(brief, status);
        });
      } else {
        selectBrief(brief, status);
      }
    });
  }

  function selectBrief(node, statusNode) {
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
    if (statusNode) statusNode.textContent = "Selected. Copy it from here.";
  }

  function validEmail(value) {
    const trimmed = String(value || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) return "";
    return trimmed;
  }
})();
