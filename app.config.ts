import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'NafsMutmainna',
    slug: 'nafsmutmainna',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#1B4D3E',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: false,
        bundleIdentifier: 'com.nafsmutmainna.app',
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#1B4D3E',
        },
        package: 'com.nafsmutmainna.app',
    },
    web: {
        favicon: './assets/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        apiUrl: process.env.API_URL ?? 'https://api.nafsmutmainna.com/v1',
        minimaxApiKey: process.env.MINIMAX_API_KEY ?? '',
        eas: {
            projectId: 'nafsmutmainna',
        },
    },
});