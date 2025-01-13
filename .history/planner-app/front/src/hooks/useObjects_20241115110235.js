import {useContext} from 'react';
import { ObjectContext} from '../components/contexts/ObjectContext';

export function useObjects() {
    const context = useContext(ObjectContext);

    if(!context){
        throw new Error("useObjects dont Work");
    }
    return context;
}