import { readFile, writeFile, mkdir, cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeURL(value) {
  const url = new URL(value);
  if (!['https:', 'mailto:'].includes(url.protocol)) throw new Error(`Unsupported URL protocol: ${url.protocol}`);
  return escapeHTML(value);
}
export async function build() {
  const data = JSON.parse(await readFile(path.join(root, 'data/profile.json'), 'utf8'));
  const presentation = JSON.parse(await readFile(path.join(root, 'data/presentation.json'), 'utf8'));
  if (!data.profile?.email || !Array.isArray(data.featuredProjects) || !data.featuredProjects.length) throw new Error('Profile must contain an email and featured projects.');
  const ids = new Set();
  const projects = await Promise.all(data.featuredProjects.map(async (p, index) => {
    if (!p.id || ids.has(p.id) || !p.name || !Array.isArray(p.tags)) throw new Error('Each project needs a unique id, name and tags.');
    ids.add(p.id);
    const view = presentation.projects[p.id] ?? {};
    const title = view.title ?? p.name;
    if (view.image) {
      if (!/^\/assets\/[a-z0-9-]+\.(png|jpg|webp|svg)$/.test(view.image)) throw new Error(`Invalid local image: ${view.image}`);
      await access(path.join(root, 'public', view.image));
    }
    const image = view.image ? `<img src="${escapeHTML(view.image)}" alt="${escapeHTML(title)} ${escapeHTML(view.imageKind ?? 'artwork')}" width="${view.imageKind === 'social preview' ? 1280 : 1024}" height="${view.imageKind === 'social preview' ? 640 : 1024}" loading="lazy" decoding="async" class="${view.imageKind === 'social preview' ? 'preview' : ''}">` : `<span class="field-center" aria-hidden="true">↗</span>`;
    return `<article class="project reveal" data-group="${escapeHTML(view.group ?? 'Other')}" aria-labelledby="project-${escapeHTML(p.id)}"><div class="project-image ${escapeHTML(view.tone ?? 'sand')}">${image}<span class="project-num">${String(index+1).padStart(2,'0')} / ${String(data.featuredProjects.length).padStart(2,'0')}</span><span class="image-caption">${escapeHTML(view.imageKind ?? 'project illustration').toUpperCase()} / ${escapeHTML(title).toUpperCase()}</span></div><div class="project-info"><div class="project-meta"><span>${escapeHTML(view.group ?? p.category)}</span>${p.isStar ? '<span class="featured">✳ FLAGSHIP PROJECT</span>' : '<span>OPEN SOURCE</span>'}</div><h3 id="project-${escapeHTML(p.id)}"><a href="${safeURL(p.repo)}">${escapeHTML(title)}<span aria-hidden="true">↗</span></a></h3><p>${escapeHTML(view.summary ?? p.tagline ?? p.description)}</p><div class="tags" role="group" aria-label="Technology stack">${p.tags.slice(0,4).map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div><a class="text-link project-source" href="${safeURL(p.repo)}">View source <span aria-hidden="true">↗</span></a></div></article>`;
  }));
  const contours = Array.from({length:24}, (_,i)=>{
    const rx=27+i*7.4, ry=34+i*4.6;
    return `<ellipse cx="250" cy="190" rx="${rx}" ry="${ry}" transform="rotate(-32 250 190)"/>`;
  }).join('');
  const replacements = {
    CONTOURS:`<svg viewBox="0 0 500 380" fill="none" aria-hidden="true"><g class="contours" stroke="#b74320" stroke-width=".7" opacity=".6">${contours}</g><path d="M45 190H455M250 20V360" stroke="#c3c7b8" stroke-width=".6" stroke-dasharray="3 6"/></svg>`,
    PROJECTS:projects.join('\n'), HEADLINE:escapeHTML(data.statement.headline), ATELIER:escapeHTML(data.statement.atelier), CRAFT:escapeHTML(data.statement.craft), EMAIL:escapeHTML(data.profile.email), YEAR:String(new Date().getFullYear()),
    PRINCIPLES:data.principles.map(p=>`<article class="reveal"><span class="principle-number">/ ${escapeHTML(p.number)}</span><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.summary)}</p></article>`).join(''),
    STACK:Object.entries(data.stack).map(([name,items])=>`<div><h3>${escapeHTML(name.toUpperCase())}</h3><p>${items.map(i=>escapeHTML(i.name)).join(' · ')}</p></div>`).join('')
  };
  let html = await readFile(path.join(root, 'src/index.html'), 'utf8');
  html = html.replace(/\{\{([A-Z]+)\}\}/g, (_,key)=>{ if (!(key in replacements)) throw new Error(`Unknown template key ${key}`); return replacements[key]; });
  await mkdir(path.join(root,'dist'),{recursive:true});
  await cp(path.join(root,'public'),path.join(root,'dist'),{recursive:true});
  await writeFile(path.join(root,'dist/index.html'),html);
  console.log(`Built ${projects.length} projects → dist/`);
  return html;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
