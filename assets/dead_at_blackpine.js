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

  const unlockedPages = new Set(
    JSON.parse(sessionStorage.getItem('unlockedPages') || '[]')
  );

  function showPage(id) {
    const expectedCode = PAGE_CODES[id];

    if (expectedCode && !unlockedPages.has(id)) {
      const entered = window.prompt('Entrez le code pour acceder a cette fiche :');
      if (!entered) {
        return;
      }

      const normalized = entered.trim().toUpperCase();
      if (normalized !== expectedCode && normalized !== MASTER_PASSWORD) {
        window.alert('Code invalide.');
        return;
      }

      unlockedPages.add(id);
      sessionStorage.setItem('unlockedPages', JSON.stringify([...unlockedPages]));
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
