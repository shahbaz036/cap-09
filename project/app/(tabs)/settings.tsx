import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Modal, ScrollView } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react-native';
import { create } from 'zustand';

interface FiltersState {
  showSuccessful: boolean;
  showFailed: boolean;
  selectedYear: number | null;
  setShowSuccessful: (show: boolean) => void;
  setShowFailed: (show: boolean) => void;
  setSelectedYear: (year: number | null) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  showSuccessful: true,
  showFailed: true,
  selectedYear: null,
  setShowSuccessful: (show) => set({ showSuccessful: show }),
  setShowFailed: (show) => set({ showFailed: show }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  resetFilters: () => set({ showSuccessful: true, showFailed: true, selectedYear: null }),
}));

export default function SettingsScreen() {
  const queryClient = useQueryClient();
  const [yearPickerVisible, setYearPickerVisible] = useState(false);
  const { 
    showSuccessful, 
    showFailed, 
    selectedYear,
    setShowSuccessful,
    setShowFailed,
    setSelectedYear,
    resetFilters
  } = useFiltersStore();

  const handleRefresh = () => {
    resetFilters();
    queryClient.invalidateQueries({ queryKey: ['launches'] });
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 2005 + 1 },
    (_, i) => 2005 + i
  ).reverse();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filters</Text>
        
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Show Successful Launches</Text>
          <Switch
            value={showSuccessful}
            onValueChange={setShowSuccessful}
            trackColor={{ false: '#444', true: '#4CAF50' }}
            thumbColor={showSuccessful ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Show Failed Launches</Text>
          <Switch
            value={showFailed}
            onValueChange={setShowFailed}
            trackColor={{ false: '#444', true: '#F44336' }}
            thumbColor={showFailed ? '#fff' : '#f4f3f4'}
          />
        </View>

        <Pressable
          style={styles.yearSelector}
          onPress={() => setYearPickerVisible(true)}>
          <Text style={styles.yearText}>
            {selectedYear ? `Year: ${selectedYear}` : 'All Years'}
          </Text>
          <ChevronDown color="#fff" size={20} />
        </Pressable>
      </View>

      <Pressable style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Reset Filters & Refresh Data</Text>
      </Pressable>

      <Modal
        visible={yearPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setYearPickerVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Year</Text>
            <ScrollView style={styles.yearList}>
              <Pressable
                style={[
                  styles.yearOption,
                  selectedYear === null && styles.selectedYearOption,
                ]}
                onPress={() => {
                  setSelectedYear(null);
                  setYearPickerVisible(false);
                }}>
                <Text
                  style={[
                    styles.yearOptionText,
                    selectedYear === null && styles.selectedYearOptionText,
                  ]}>
                  All Years
                </Text>
              </Pressable>
              {years.map((year) => (
                <Pressable
                  key={year}
                  style={[
                    styles.yearOption,
                    selectedYear === year && styles.selectedYearOption,
                  ]}
                  onPress={() => {
                    setSelectedYear(year);
                    setYearPickerVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.yearOptionText,
                      selectedYear === year && styles.selectedYearOptionText,
                    ]}>
                    {year}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setYearPickerVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    color: '#fff',
  },
  yearSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  yearText: {
    fontSize: 16,
    color: '#fff',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  yearList: {
    maxHeight: 400,
  },
  yearOption: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedYearOption: {
    backgroundColor: '#2196F3',
  },
  yearOptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  selectedYearOptionText: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});