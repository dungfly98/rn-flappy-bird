import * as React from 'react';
import { StyleProp, TouchableOpacity as Button, ViewStyle } from 'react-native';

interface Props {
    activeOpacity?: number;
    onPress?: any;
    style?: StyleProp<ViewStyle>;
    children: any;
}

export const TouchableOpacity = (props: Props) => {
    return (
        <Button
            onPress={props.onPress}
            activeOpacity={props.activeOpacity || 0.8}
            style={props.style}
        >
            {props.children}
        </Button>
    );
};
