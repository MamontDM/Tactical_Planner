import {useEffect} from "react";
import AppProviders from './components/AppProviders.jsx';
import Layout from './components/Layout.jsx';
import { connectStores } from '@/store/zustand/storeSubs.js';

const App = () => {

  useEffect(() => {

        const unsubscribe = connectStores();
        return () => {
          unsubscribe();
        };
      }, []);

    return (
        <AppProviders>
            <Layout />
        </AppProviders>
    );
};

export default App;
