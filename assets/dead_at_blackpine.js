  const PAGE_CODES = {
    host: 'PATATE',
    actions: 'PATATE',
    clues: 'PATATE',
    maggie: 'MADO-49',
    owen: 'LUC-54',
    sylvia: 'SYLVIE-48',
    rex: 'REMI-44',
    nadia: 'NADINE-31',
    tom: 'DENIS-61',
    solution: 'PATATE'
  };

  const MASTER_PASSWORD = 'PATATE';

function getStorage() {
  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
}

function loadUnlockedPages() {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  try {
    return JSON.parse(storage.getItem('unlockedPages') || '[]');
  } catch (error) {
    return [];
  }
}

function saveUnlockedPages() {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem('unlockedPages', JSON.stringify([...unlockedPages]));
  } catch (error) {
    // Ignore storage issues on browsers with restricted storage access.
  }
}

function normalizeCode(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/\s+/g, '')
    .toUpperCase();
}

const unlockedPages = new Set(loadUnlockedPages());

  function showPage(id) {
    const expectedCode = PAGE_CODES[id];

    if (expectedCode && !unlockedPages.has(id)) {
      const entered = window.prompt('Entrez le code pour acceder a cette fiche :');
      if (!entered) {
        return;
      }

      const normalized = normalizeCode(entered);
      if (
        normalized !== normalizeCode(expectedCode) &&
        normalized !== normalizeCode(MASTER_PASSWORD)
      ) {
        window.alert('Code invalide.');
        return;
      }

      unlockedPages.add(id);
      saveUnlockedPages();
    }

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    document.getElementById('tab-' + id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function revealSolution() {
    const el = document.getElementById('solution-content');
    el.classList.add('revealed');
    document.querySelector('.reveal-btn').style.display = 'none';
    document.querySelector('.reveal-note').style.display = 'none';
  }
