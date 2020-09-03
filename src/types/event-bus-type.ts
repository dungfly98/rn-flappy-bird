import { ToastProps } from 'libraries/toast/toast.component';

export interface BaseEventType {
    type: EventBusName;
}

export enum EventBusName {
    SHOW_TOAST_EVENT,
    HIDE_TOAST_EVENT
}

export interface ToastPayloadType extends BaseEventType {
    payload: ToastProps;
}
