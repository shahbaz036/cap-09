import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getLaunch, getRocket } from '../../lib/api';
import { Youtube, Link as LinkIcon, IndianRupee as Wikipedia } from 'lucide-react-native';

export default function LaunchDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: launch, isLoading: isLoadingLaunch } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => getLaunch(id),
  });

  const { data: rocket, isLoading: isLoadingRocket } = useQuery({
    queryKey: ['rocket', launch?.rocket],
    queryFn: () => getRocket(launch!.rocket),
    enabled: !!launch?.rocket,
  });

  if (isLoadingLaunch || isLoadingRocket) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!launch || !rocket) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: launch.name,
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }}
      />
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri: launch.links.patch.large || 'https://images.unsplash.com/photo-1517976487492-5750f3195933',
          }}
          style={styles.patch}
        />

        <View style={styles.content}>
          <Text style={styles.date}>
            {format(new Date(launch.date_utc), 'PPP')}
          </Text>

          {launch.details && (
            <Text style={styles.details}>{launch.details}</Text>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rocket</Text>
            <Text style={styles.rocketName}>{rocket.name}</Text>
            <Text style={styles.rocketDetails}>{rocket.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Links</Text>
            <View style={styles.links}>
              {launch.links.webcast && (
                <Pressable 
                  onPress={() => Linking.openURL(launch.links.webcast!)}
                  style={styles.iconButton}
                >
                  <Youtube color="#fff" size={24} />
                </Pressable>
              )}
              {launch.links.article && (
                <Pressable 
                  onPress={() => Linking.openURL(launch.links.article!)}
                  style={styles.iconButton}
                >
                  <LinkIcon color="#fff" size={24} />
                </Pressable>
              )}
              {launch.links.wikipedia && (
                <Pressable 
                  onPress={() => Linking.openURL(launch.links.wikipedia!)}
                  style={styles.iconButton}
                >
                  <Wikipedia color="#fff" size={24} />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  patch: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 18,
    color: '#888',
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  rocketName: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  rocketDetails: {
    fontSize: 16,
    color: '#888',
    lineHeight: 24,
  },
  links: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
});