import { lazy } from 'react';

// export const HomePageAsync = lazy(() => new Promise((resolve) => {
//     // @ts-ignore
//     setTimeout(() => resolve(import('./HomePage')), 1500);
// }));

// export const HomePageAsync = lazy(() => import('./HomePage'));
export const HomePageAsync = lazy(() => import('./HomePage'));
