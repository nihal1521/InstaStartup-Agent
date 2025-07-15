// Wrapper for Firebase Firestore to ensure correct exports
import {
    addDoc as originalAddDoc,
    collection as originalCollection,
    connectFirestoreEmulator as originalConnectFirestoreEmulator,
    doc as originalDoc,
    getDoc as originalGetDoc,
    getFirestore as originalGetFirestore
} from 'firebase/firestore';

export const getFirestore = originalGetFirestore;
export const connectFirestoreEmulator = originalConnectFirestoreEmulator;
export const collection = originalCollection;
export const addDoc = originalAddDoc;
export const doc = originalDoc;
export const getDoc = originalGetDoc;
