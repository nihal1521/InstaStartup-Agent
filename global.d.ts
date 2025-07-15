// Module declarations for packages without built-in TypeScript types
declare module 'graphql-type-json';
declare module 'graphql-yoga';
declare module 'ws';
declare module 'express';
declare module 'framer-motion';
declare module 'react-hook-form' {
  import * as React from 'react';
  // Basic types
  export type FieldValues = Record<string, any>;
  export type FieldPath<T> = string;
  export type ControllerProps<
    TFieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  > = any;
  // Components and hooks
  export const Controller: React.ComponentType<any>;
  export const FormProvider: React.ComponentType<any>;
  export function useFormContext(): any;
}

// Stub firebase/firestore module exports
declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function connectFirestoreEmulator(db: any, host: string, port: number): void;
  export function collection(db: any, path: string, ...pathSegments: string[]): any;
  export function addDoc(collectionRef: any, data: any): Promise<any>;
  export function doc(db: any, path: string, ...pathSegments: string[]): any;
  export function getDoc(docRef: any): Promise<any>;
}
