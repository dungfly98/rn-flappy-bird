import { NavigationContainerRef } from '@react-navigation/core';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: object): void {
    navigationRef.current?.navigate(name, params);
}

export function goBack(): void {
    navigationRef.current?.goBack();
}

export function resetStack(name: string, params?: object): void {
    navigationRef.current?.reset({
        index: 0,
        routes: [{ name }]
    });
}
