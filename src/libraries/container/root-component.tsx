import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import { setI18nConfig } from 'res/languages';

interface Props {}

interface State {}

export default class RootComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        setI18nConfig();
        RNLocalize.addEventListener('change', this.localizationChange);
    }

    private localizationChange = (): void => {
        setI18nConfig();
        this.forceUpdate();
    };

    public render(): React.ReactNode {
        return <View style={styles.container}>{this.props.children}</View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
