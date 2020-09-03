import { DimensionHelper } from 'helpers/dimension-helper';
import EventBus from 'helpers/event-bus';
import * as React from 'react';
import {
    Animated,
    EmitterSubscription,
    Keyboard,
    KeyboardEvent,
    Platform,
    StyleSheet,
    Text
} from 'react-native';
import { Subscription } from 'rxjs';
import { EventBusName, ToastPayloadType } from 'types/event-bus-type';

interface Props {}

interface State {
    keyboardHeight: number;
    isShowing: boolean;
    payload?: ToastProps;
}

export interface ToastProps {
    type?: ToastType;
    message: string;
    durationInMilis?: number;
    withIcon?: boolean;
}

export enum ToastType {
    DEFAULT,
    SUCCESS,
    WARNING,
    ERROR
}

const COLORS = ['#646464', '#61A465', '#FDAF18', '#D92728'];
const ICONS = [];
const DEFAULT_DURATION = 3000;

export default class ToastComponent extends React.PureComponent<Props, State> {
    static show(payload: ToastProps): void {
        EventBus.getInstance().post<ToastPayloadType>({
            type: EventBusName.SHOW_TOAST_EVENT,
            payload
        });
    }

    keyboardDidShowListener?: EmitterSubscription;

    keyboardDidHideListener?: EmitterSubscription;

    subscriptions = new Subscription();

    timeout?: NodeJS.Timeout;

    fadeAnim = new Animated.Value(0);

    constructor(props: Props) {
        super(props);
        this.state = {
            keyboardHeight: 0,
            isShowing: false,
            payload: undefined
        };
    }

    async componentDidMount(): Promise<void> {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide
        );
        this.registerEventBus();
    }

    componentWillUnmount(): void {
        this.keyboardDidShowListener?.remove();
        this.keyboardDidHideListener?.remove();

        this.unregisterEventBus();
    }

    onShowToast(payload: ToastProps): void {
        this.onHideToast(payload.durationInMilis || DEFAULT_DURATION);
        this.setState({ isShowing: true, payload }, this.fadeIn);
    }

    onHideToast(duration: number): void {
        this.removeTimeout();
        this.timeout = setTimeout(() => {
            this.removeTimeout();
            this.fadeOut();
        }, duration);
    }

    getBottom(): number {
        let bottomSpace = DimensionHelper.getBottomSpace();
        if (Platform.OS === 'ios' && this.state.keyboardHeight > 0) {
            bottomSpace = 0;
        }

        return bottomSpace + this.state.keyboardHeight + 20;
    }

    keyboardDidShow = (event: KeyboardEvent): void => {
        this.setState({ keyboardHeight: event.endCoordinates.height });
    };

    keyboardDidHide = (): void => {
        this.setState({ keyboardHeight: 0 });
    };

    fadeIn = (): void => {
        Animated.timing(this.fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    fadeOut = (): void => {
        Animated.timing(this.fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({ isShowing: false, payload: undefined });
        });
    };

    removeTimeout(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    registerEventBus(): void {
        this.subscriptions.add(
            EventBus.getInstance().events.subscribe(
                (data: ToastPayloadType) => {
                    switch (data.type) {
                        case EventBusName.SHOW_TOAST_EVENT:
                            this.onShowToast(data.payload);
                            break;

                        default:
                            break;
                    }
                }
            )
        );
    }

    unregisterEventBus(): void {
        this.subscriptions.unsubscribe();
    }

    public render(): React.ReactNode {
        const { isShowing, payload } = this.state;

        if (!isShowing) return null;

        const bottom = this.getBottom();

        const type = payload?.type?.valueOf() || 0;

        return (
            <Animated.View
                style={[
                    styles.wrapper,
                    {
                        bottom,
                        backgroundColor: COLORS[type],
                        opacity: this.fadeAnim
                    }
                ]}
            >
                <Text style={styles.textStyle}>{payload?.message}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: { fontSize: 16, color: 'white' },
    wrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '80%',
        minWidth: '50%',
        minHeight: 46,
        alignSelf: 'center',
        borderRadius: 23
    }
});
