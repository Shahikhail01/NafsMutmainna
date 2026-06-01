import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStoreProvider } from '../src/infrastructure/store/AppStoreProvider';

const client = new QueryClient();

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={client}>
                <AppStoreProvider>
                    <StatusBar style="dark" />
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="onboarding" options={{ presentation: 'modal' }} />
                        <Stack.Screen name="chat" options={{ presentation: 'modal' }} />
                    </Stack>
                </AppStoreProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}