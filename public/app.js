const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = [...document.querySelectorAll('.reveal')];
let revealObserver;
function configureMotion() {
  revealObserver?.disconnect();
  document.documentElement.classList.toggle('motion-enabled', !motionPreference.matches);
  revealElements.forEach(element => element.classList.remove('pending'));
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  revealElements.forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('pending');
      revealObserver.observe(element);
    }
  });
}
configureMotion();
motionPreference.addEventListener('change', configureMotion);
const field = document.querySelector('.field');
if (field && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => field.classList.toggle('animation-paused', !entry.isIntersecting)).observe(field);
}
document.addEventListener('visibilitychange', () => document.body.classList.toggle('animation-paused', document.hidden));
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project')];
const grid = document.querySelector('.project-grid');
if (filters && grid) {
  filters.hidden = false;
  const buttons = [...filters.querySelectorAll('button')];
  buttons[0].querySelector('span').textContent = String(projects.length).padStart(2, '0');
  buttons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    grid.classList.toggle('filtered', filter !== 'All');
    projects.forEach(project => {
      project.hidden = filter !== 'All' && project.dataset.group !== filter;
      project.classList.remove('pending');
      revealObserver?.unobserve(project);
    });
    const count = projects.filter(project => !project.hidden).length;
    document.querySelector('#filter-status').textContent = `${count} projects shown${filter === 'All' ? '' : ` in ${filter}`}.`;
  }));
}
const clock = document.querySelector('#local-time');
function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Ljubljana', hour:'2-digit', minute:'2-digit', hour12:false }).format(new Date()) + ' LOCAL';
  clock.dateTime = new Date().toISOString();
}
updateClock();
setInterval(updateClock, 60000);
