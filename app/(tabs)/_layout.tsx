// Main Tab Navigation

import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../src/shared/constants';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    backgroundColor: isDark ? '#1A1A1A' : COLORS.surface,
                    borderTopColor: isDark ? '#333' : '#E0E0E0',
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="emotions"
                options={{
                    title: 'Feelings',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="toolkit"
                options={{
                    title: 'Toolkit',
                    tabBarIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="learn"
                options={{
                    title: 'Learn',
                    tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="journal"
                options={{
                    title: 'Journal',
                    tabBarIcon: ({ color, size }) => <Ionicons name="journal-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}