import { Tabs } from 'expo-router';
import { Rocket, Calendar, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: '#00ff00',
        tabBarInactiveTintColor: '#888',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Launches',
          tabBarIcon: ({ size, color }) => (
            <Rocket size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: 'Upcoming',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}