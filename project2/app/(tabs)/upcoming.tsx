import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getLaunches } from '../../lib/api';
import { LaunchCard } from '../../components/LaunchCard';
import { useFiltersStore } from './settings';

export default function UpcomingScreen() {
  const { showSuccessful, showFailed, selectedYear } = useFiltersStore();

  const { data: launches, isLoading } = useQuery({
    queryKey: ['launches', { upcoming: true, showSuccessful, showFailed, selectedYear }],
    queryFn: () => getLaunches({ 
      upcoming: true,
      success: showSuccessful ? (showFailed ? undefined : true) : (showFailed ? false : null),
      year: selectedYear
    }),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={launches}
        renderItem={({ item }) => <LaunchCard launch={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    padding: 16,
  },
});