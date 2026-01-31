import { Layout } from './components/layout';
import {
    Hero,
    About,
    Career,
    Projects,
    Services,
    Contact,
} from './components/sections';
import { SEO } from './components/ui';
import './index.css';

function App() {
    return (
        <>
            <SEO />
            <Layout>
                <Hero />
                <About />
                <Career />
                <Projects />
                <Services />
                <Contact />
            </Layout>
        </>
    );
}

export default App;
