const DEFAULT_STATE = Object.freeze({
  scene: 'colosseum',
  faction: 'random',
  timeControl: 'rapid',
  side: 'random',
});

/**
 * Creates the fullscreen menu and exposes an accessor for selected settings.
 * @param {HTMLElement} mountNode
 */
export function createMenu(mountNode) {
  const state = { ...DEFAULT_STATE };

  mountNode.innerHTML = `
    <div class="h-full w-full text-slate-100 opacity-0 transition-opacity duration-500" id="menu-shell">
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70"></div>

      <div class="relative z-10 h-full overflow-y-auto p-4 sm:p-6 lg:p-10">
        <div class="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md shadow-2xl shadow-black/50">
          <header class="border-b border-white/10 p-6 sm:p-8">
            <p class="text-xs uppercase tracking-[0.4em] text-amber-200/90">Enter the Arena</p>
            <h1 class="mt-2 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[0.08em] text-white">COLOSSEUM CLASH</h1>
          </header>

          <section class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="space-y-6">
              ${createOptionGroup('Scene Selection', 'scene', [
                ['colosseum', 'Colosseum', 'Roman glory, flame-lit stone and roaring crowd'],
                ['nature', 'Nature', 'Waterfall mist, wild forest, drifting light'],
              ])}

              ${createOptionGroup('Faction Selection', 'faction', [
                ['cod', 'COD', 'Modern tactical soldiers with hard steel silhouette'],
                ['kingdom', 'Kingdom', 'Royal armor, capes, blades, and heraldry'],
                ['tribe', 'Tribe', 'Savage warpaint, bone armor, primal force'],
                ['random', 'Random', 'Let fate assign your champions'],
              ])}

              <div class="grid gap-4 sm:grid-cols-2">
                ${createOptionGroup('Time Control', 'timeControl', [
                  ['blitz', 'Blitz', 'Fast and ruthless'],
                  ['rapid', 'Rapid', 'Balanced pacing'],
                  ['classical', 'Classical', 'Deep strategic battles'],
                ])}

                ${createOptionGroup('Side Selection', 'side', [
                  ['white', 'White', 'Take the first move'],
                  ['black', 'Black', 'Counter and punish'],
                  ['random', 'Random', 'Let destiny decide'],
                ])}
              </div>
            </div>

            <aside class="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
              <h2 class="text-sm uppercase tracking-[0.2em] text-slate-300">Faction Preview</h2>
              <div class="rounded-xl border border-white/10 bg-gradient-to-b from-slate-600/20 to-black/30 p-4 min-h-52">
                <div id="preview-box" class="h-full rounded-lg border border-dashed border-white/15 grid place-items-center text-center text-slate-300/75">
                  <p class="max-w-xs text-sm">Select a faction to preview your warband style.</p>
                </div>
              </div>

              <button
                id="enter-button"
                type="button"
                class="group relative mt-3 w-full overflow-hidden rounded-xl border border-amber-300/50 bg-amber-400/15 px-5 py-4 text-lg font-bold tracking-[0.12em] text-amber-100 transition duration-300 hover:border-amber-200 hover:bg-amber-300/20 hover:shadow-[0_0_35px_rgba(251,191,36,0.32)]"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-200/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
                <span class="relative">ENTER THE ARENA</span>
              </button>

              <footer class="pt-3">
                <button id="how-to-play" type="button" class="text-xs tracking-[0.14em] uppercase text-slate-300/70 hover:text-slate-100 transition">
                  How to Play Chess
                </button>
              </footer>
            </aside>
          </section>
        </div>
      </div>
    </div>
  `;

  wireSelectionHandlers(mountNode, state);
  updatePreview(mountNode, state.faction);

  requestAnimationFrame(() => {
    mountNode.querySelector('#menu-shell')?.classList.remove('opacity-0');
  });

  return {
    getState: () => ({ ...state }),
  };
}

function createOptionGroup(title, key, options) {
  return `
    <fieldset class="rounded-xl border border-white/10 bg-white/5 p-4">
      <legend class="px-2 text-xs uppercase tracking-[0.2em] text-slate-300">${title}</legend>
      <div class="mt-3 grid gap-3 ${options.length <= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}">
        ${options
          .map(
            ([value, label, hint]) => `
              <button
                type="button"
                data-key="${key}"
                data-value="${value}"
                class="option-card rounded-lg border border-white/15 bg-slate-950/35 p-3 text-left transition duration-200 hover:border-amber-200/60 hover:bg-slate-900/55"
              >
                <p class="font-semibold tracking-wide text-slate-100">${label}</p>
                <p class="mt-1 text-xs text-slate-300/75">${hint}</p>
              </button>
            `,
          )
          .join('')}
      </div>
    </fieldset>
  `;
}

function wireSelectionHandlers(root, state) {
  const optionCards = root.querySelectorAll('.option-card');

  optionCards.forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.dataset.key;
      const value = card.dataset.value;
      state[key] = value;

      root.querySelectorAll(`.option-card[data-key="${key}"]`).forEach((item) => {
        setCardSelected(item, item === card);
      });

      if (key === 'faction') {
        updatePreview(root, value);
      }
    });
  });

  // Apply default selected state on first render.
  Object.entries(DEFAULT_STATE).forEach(([key, value]) => {
    const defaultCard = root.querySelector(`.option-card[data-key="${key}"][data-value="${value}"]`);
    if (defaultCard) {
      setCardSelected(defaultCard, true);
    }
  });

  root.querySelector('#how-to-play')?.addEventListener('click', () => {
    alert(
      'Chess basics: control the center, protect your king, and capture by landing on enemy squares. Checkmate wins the match.',
    );
  });

  root.querySelector('#enter-button')?.addEventListener('click', () => {
    const selected = JSON.stringify(state, null, 2);
    console.info('[Colosseum Clash] Start request with:', state);
    alert(`Arena boot sequence ready!\n\nSelected setup:\n${selected}`);
  });
}

function setCardSelected(card, isSelected) {
  card.classList.toggle('border-amber-200', isSelected);
  card.classList.toggle('bg-amber-200/10', isSelected);
  card.classList.toggle('shadow-[0_0_18px_rgba(251,191,36,0.22)]', isSelected);
}

function updatePreview(root, faction) {
  const preview = root.querySelector('#preview-box');
  if (!preview) return;

  const labels = {
    cod: 'COD // Tactical unit locked in. Rifles primed.',
    kingdom: 'Kingdom // Royal guard assembled. Blades drawn.',
    tribe: 'Tribe // War drums rising. Axes ready.',
    random: 'Random // Fate chooses your battlefield bloodline.',
  };

  preview.innerHTML = `<p class="text-sm leading-relaxed text-slate-200">${labels[faction]}</p>`;
}
