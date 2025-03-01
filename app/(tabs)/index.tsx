import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, MapPin, Star } from 'lucide-react-native';
import { Link } from 'expo-router';

// Mock data for nearby trails
const TRAILS = [
  {
    id: '1',
    name: 'Mont Blanc Circuit',
    location: 'Chamonix, France',
    distance: '170 km',
    duration: '11 days',
    difficulty: 'Difficult',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '2',
    name: 'GR20',
    location: 'Corsica, France',
    distance: '180 km',
    duration: '15 days',
    difficulty: 'Very Difficult',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '3',
    name: 'Tour du Mont Blanc',
    location: 'Alps (France, Italy, Switzerland)',
    distance: '170 km',
    duration: '11 days',
    difficulty: 'Moderate',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
  },
  {
    id: '4',
    name: 'Sentier des Douaniers',
    location: 'Brittany, France',
    distance: '1800 km',
    duration: '90 days',
    difficulty: 'Easy to Moderate',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

// Featured categories
const CATEGORIES = [
  { id: '1', name: 'Mountain Trails', icon: '🏔️' },
  { id: '2', name: 'Coastal Paths', icon: '🌊' },
  { id: '3', name: 'Forest Walks', icon: '🌲' },
  { id: '4', name: 'Historical Routes', icon: '🏛️' },
  { id: '5', name: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyTrails, setNearbyTrails] = useState(TRAILS);

  // Filter trails based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = TRAILS.filter(trail => 
        trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trail.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setNearbyTrails(filtered);
    } else {
      setNearbyTrails(TRAILS);
    }
  }, [searchQuery]);

  const renderTrailItem = ({ item }) => (
    <Link href={`/trail/${item.id}`} asChild>
      <TouchableOpacity style={styles.trailCard}>
        <Image source={{ uri: item.image }} style={styles.trailImage} />
        <View style={styles.trailInfo}>
          <Text style={styles.trailName}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.trailDetails}>
            <Text style={styles.detailText}>{item.distance}</Text>
            <Text style={styles.detailText}>•</Text>
            <Text style={styles.detailText}>{item.difficulty}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Discover Trails</Text>
        <Text style={styles.subtitleText}>Find your next adventure</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search trails, locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      <Text style={styles.sectionTitle}>Nearby Trails</Text>
      <FlatList
        data={nearbyTrails}
        renderItem={renderTrailItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.trailsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Montserrat-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Montserrat-Medium',
  },
  trailsList: {
    paddingBottom: 20,
  },
  trailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trailImage: {
    width: '100%',
    height: 180,
  },
  trailInfo: {
    padding: 12,
  },
  trailName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Montserrat-Regular',
  },
  trailDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
    fontFamily: 'Montserrat-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Medium',
  },
});