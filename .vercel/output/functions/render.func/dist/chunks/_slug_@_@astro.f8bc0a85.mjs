export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import './astro.7bf5232d.mjs';
import 'cookie';
import 'kleur/colors';
import 'mime';
import 'string-width';
import 'html-escaper';
import 'react';
import 'react-dom/server';

const page = () => import('./pages/_slug_.astro.f53fd95b.mjs').then(n => n.c);

export { page };
