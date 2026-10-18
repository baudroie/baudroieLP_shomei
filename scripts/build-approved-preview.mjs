import { build } from 'vite';
import {readFile,writeFile,mkdir,rm,cp} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import React from 'react';
import {renderToString} from 'react-dom/server';
const base='/approved-four-pages/';
await build({base,build:{outDir:'approved-dist'}});
await build({base,build:{ssr:'src/main.tsx',outDir:'.approved-ssr',copyPublicDir:false}});
const {App}=await import(pathToFileURL(path.resolve('.approved-ssr/main.js')).href);
const template=await readFile('approved-dist/index.html','utf8');
for(const role of ['','hr','sales','engineer']){
 const content=renderToString(React.createElement(App,{path:'/'+role}));
 const html=template.replace('<div id="root"></div>',`<div id="root">${content}</div>`).replace(/<title>.*?<\/title>/s,`<title>${role||'overview'} | baudroie inc.</title>`);
 await mkdir(`approved-dist/${role}`,{recursive:true});await writeFile(`approved-dist/${role?role+'/':''}index.html`,html);
 await mkdir(`approved-dist/no-js/${role}`,{recursive:true});await writeFile(`approved-dist/no-js/${role?role+'/':''}index.html`,html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
}
await rm('.approved-ssr',{recursive:true,force:true});
// Optional integration with an existing local preview. Standalone builds stay in this checkout.
if (process.env.APPROVED_PREVIEW_COPY_TO) {
 await cp('approved-dist',path.resolve(process.env.APPROVED_PREVIEW_COPY_TO),{recursive:true});
}
console.log('Built approved-dist. Run npm run preview:approved to review locally.');
