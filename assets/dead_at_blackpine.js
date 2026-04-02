  function showPage(id) {
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
