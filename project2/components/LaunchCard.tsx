import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import type { Launch } from '../types/api';

interface LaunchCardProps {
  launch: Launch;
}

export function LaunchCard({ launch }: LaunchCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/launch/${launch.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Image
          source={{
            uri: launch.links.patch.small || 'https://images.unsplash.com/photo-1517976487492-5750f3195933',
          }}
          style={styles.patch}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{launch.name}</Text>
          <Text style={styles.date}>
            {format(new Date(launch.date_utc), 'PPP')}
          </Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: launch.success
                    ? '#4CAF50'
                    : launch.upcoming
                    ? '#2196F3'
                    : '#F44336',
                },
              ]}
            />
            <Text style={styles.status}>
              {launch.upcoming
                ? 'Upcoming'
                : launch.success
                ? 'Successful'
                : 'Failed'}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  patch: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 14,
    color: '#888',
  },
});