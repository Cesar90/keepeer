import { Suspense } from 'react';
// import { AppMainContent } from './providers/maincontent';

const App = () => {
    debugger;
    return (
        <Suspense fallback="">
            <h1>This is just a test</h1>
            <h1>This is just a test</h1>
        </Suspense>
    );
};

export default App;
