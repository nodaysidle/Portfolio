import { writeFile } from 'node:fs/promises';
const url = 'https://raw.githubusercontent.com/nodaysidle/nodaysidle/main/data/profile.json';
const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
if (!response.ok) throw new Error(`GitHub returned ${response.status}; local content was not changed.`);
const data = await response.json();
if (!data.profile?.name || !data.profile?.email || !Array.isArray(data.featuredProjects) || !data.statement || !Array.isArray(data.principles) || !data.stack) throw new Error('Upstream profile schema changed; local content was not changed.');
await writeFile(new URL('../data/profile.json', import.meta.url), JSON.stringify(data,null,2)+'\n');
console.log('Updated upstream profile. Review changes, then run npm run build. Presentation overrides remain untouched.');
