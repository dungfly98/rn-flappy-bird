import { PermissionsAndroid, Platform } from 'react-native';

export class PermissionHelper {
    static async requestStoragePermission(): Promise<
        'granted' | 'denied' | 'never_ask_again'
    > {
        if (Platform.OS === 'ios') return 'granted';

        const granted = await PermissionsAndroid.request(
            'android.permission.WRITE_EXTERNAL_STORAGE'
        );

        return granted;
    }
}
