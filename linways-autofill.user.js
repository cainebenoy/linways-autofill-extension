// ==UserScript==
// @name         Linways Faculty Evaluation Autofill
// @namespace    https://github.com/cainebenoy/linways-autofill-extension
// @version      1.0.0
// @description  Auto-fill Linways faculty evaluation forms (all teachers) with Excellent, Very Good or Random (4-5).
// @match        *://*.linways.com/*
// @run-at       document-idle
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
  'use strict';

  // --- UI Panel ---
  function createPanel() {
    if (document.getElementById('linways-autofill-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'linways-autofill-panel';
    panel.style.cssText = `
      position: fixed; right: 16px; bottom: 16px; z-index: 999999;
      background: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.12); padding: 12px; width: 220px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #333;
    `;

    const title = document.createElement('div');
    title.textContent = 'Linways Autofill';
    title.style.cssText = 'font-weight:600; font-size:14px; margin-bottom:8px;';

    const hint = document.createElement('div');
    hint.innerHTML = '<small>Open the teacher list page, then choose an option:</small>';
    hint.style.cssText = 'color:#666; margin-bottom:8px;';

    const btnExcellent = makeBtn('Auto All → Excellent', '#27ae60');
    const btnVeryGood = makeBtn('Auto All → Very Good', '#27ae60');
    const btnRandom   = makeBtn('Auto All → Random',   '#27ae60');

    btnExcellent.onclick = () => start('excellent');
    btnVeryGood.onclick  = () => start('verygood');
    btnRandom.onclick    = () => start('random');

    panel.append(title, hint, btnExcellent, btnVeryGood, btnRandom);
    document.body.appendChild(panel);
  }

  function togglePanel() {
    let panel = document.getElementById('linways-autofill-panel');
    if (!panel) { createPanel(); panel = document.getElementById('linways-autofill-panel'); }
    if (!panel) return;
    const isHidden = panel.style.display === 'none';
    panel.style.display = isHidden ? 'block' : 'none';
  }

  function makeBtn(label, color) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText = `
      display:block; width:100%; margin:6px 0; padding:8px 10px; border:none;
      border-radius:8px; background:${color}; color:#fff; cursor:pointer; font-weight:600;
    `;
    btn.onmouseenter = () => btn.style.opacity = '0.9';
    btn.onmouseleave = () => btn.style.opacity = '1';
    return btn;
  }

  function start(action) {
    if (!confirm(`This will automatically fill forms for all teachers with: ${action.toUpperCase()}\n\nContinue?`)) return;
    autoFillAllTeachers(action);
  }

  // --- Core Logic (ported from extension) ---
  function fillForm(action) {
    const options = { excellent: 5, verygood: 4, good: 3 };

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const questionGroups = {};

    radioButtons.forEach((radio) => {
      const name = radio.name || radio.id;
      if (!name) return;
      (questionGroups[name] ||= []).push(radio);
    });

    let filledCount = 0;
    Object.keys(questionGroups).forEach((groupName) => {
      const radios = questionGroups[groupName];
      let targetValue = action === 'random' ? (Math.random() > 0.5 ? 5 : 4) : options[action];

      let clicked = false;
      radios.forEach((radio) => {
        if (clicked) return;
        const label = document.querySelector(`label[for="${radio.id}"]`) || radio.closest('label');
        const labelText = label ? (label.textContent || '').trim() : '';

        let isMatch = false;
        if (targetValue === 5) {
          isMatch = /\bExcellent\b/i.test(labelText) || ['5','excellent','Excellent'].includes(radio.value);
        } else if (targetValue === 4) {
          isMatch = /\bVery\s*Good\b/i.test(labelText) || ['4','verygood','Very Good'].includes(radio.value);
        } else if (targetValue === 3) {
          isMatch = (/\bGood\b/i.test(labelText) && !/Very\s*Good/i.test(labelText)) || ['3','good','Good'].includes(radio.value);
        }

        if (isMatch) {
          radio.click();
          if (!radio.checked && label) label.click();
          if (!radio.checked) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
            radio.dispatchEvent(new Event('click', { bubbles: true }));
            radio.dispatchEvent(new Event('input', { bubbles: true }));
          }
          if (radio.checked) { clicked = true; filledCount++; }
        }
      });
    });

    return filledCount;
  }

  async function autoFillAllTeachers(action) {
    let proceedElements = Array.from(document.querySelectorAll('*')).filter(el => {
      return el.textContent && el.textContent.trim().toLowerCase() === 'click to proceed';
    });
    proceedElements = proceedElements.filter(el => {
      const parent = el.closest('div');
      const hasCompleted = parent && parent.textContent.includes('completed');
      return !hasCompleted;
    });

    if (proceedElements.length === 0) {
      alert('No pending teachers found!\n\nPlease make sure you are on the teacher list page.');
      return;
    }

    const totalTeachers = proceedElements.length;
    let processedCount = 0;

    for (let i = 0; i < totalTeachers; i++) {
      try {
        let currentElements = Array.from(document.querySelectorAll('*')).filter(el => {
          return el.textContent && el.textContent.trim().toLowerCase() === 'click to proceed';
        });
        currentElements = currentElements.filter(el => {
          const parent = el.closest('div');
          const hasCompleted = parent && parent.textContent.includes('completed');
          return !hasCompleted;
        });
        if (currentElements.length === 0) break;

        const el = currentElements[0];
        el.click();
        await sleep(1500);

        const attendButton = Array.from(document.querySelectorAll('button')).find(btn =>
          btn.textContent.trim() === 'Attend' || btn.textContent.includes('Attend')
        );
        if (attendButton) { attendButton.click(); await sleep(2000); }

        const filled = fillForm(action);
        await sleep(500);

        const finishButton = Array.from(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')).find(btn => {
          const txt = (btn.textContent || btn.value || '').trim().toLowerCase();
          return txt.includes('finish') || txt.includes('✓') || txt === 'finish';
        });
        if (finishButton) { finishButton.click(); await sleep(1200); }

        const yesButton = Array.from(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')).find(btn => {
          const txt = (btn.textContent || btn.value || '').trim().toLowerCase();
          return txt === 'yes' || txt.includes('yes');
        });
        if (yesButton) { yesButton.click(); await sleep(1800); }

        const backButton = Array.from(document.querySelectorAll('button, a')).find(btn =>
          btn.textContent.includes('Back') || btn.textContent.includes('BACK')
        );
        if (backButton) backButton.click(); else window.history.back();
        await sleep(1500);

        processedCount++;
      } catch (e) {
        console.error('Error processing teacher:', e);
      }
    }

    alert(`✓ Automation completed!\n\nSuccessfully filled forms for ${processedCount} out of ${totalTeachers} teachers.`);
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // Initialize panel when DOM is ready
  const ready = () => {
    createPanel();
    // Safety: re-try a few times in case of SPA navigation or late DOM paint
    let tries = 0;
    const id = setInterval(() => {
      if (document.getElementById('linways-autofill-panel')) { clearInterval(id); return; }
      createPanel();
      if (++tries > 10) clearInterval(id);
    }, 500);

    // Shortcut: Alt+L to toggle panel
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        togglePanel();
      }
    }, { passive: false });

    // Tampermonkey menu command
    try { if (typeof GM_registerMenuCommand === 'function') GM_registerMenuCommand('Toggle Panel (Alt+L)', togglePanel); } catch {}
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
