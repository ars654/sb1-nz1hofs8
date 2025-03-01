import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Search, Filter, BookOpen } from 'lucide-react-native';

// Mock data for guides
const GUIDES = [
  {
    id: '1',
    title: 'Essential Hiking Safety Tips',
    category: 'Safety',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: '2',
    title: 'Identifying Alpine Flora',
    category: 'Nature',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1465919292275-c60ba49da6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
  },
  {
    id: '3',
    title: 'Mountain Weather Patterns',
    category: 'Weather',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  },
  {
    id: '4',
    title: 'Hiking Gear Essentials',
    category: 'Equipment',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
  },
  {
    id: '5',
    title: 'Wildlife Encounters',
    category: 'Nature',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80',
  },
  {
    id: '6',
    title: 'Navigation Techniques',
    category: 'Skills',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  },
];

// Categories for filtering
const CATEGORIES = [
  'All',
  'Safety',
  'Nature',
  'Weather',
  'Equipment',
  'Skills',
];

export default function GuidesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [guides, setGuides] = useState(GUIDES);
  
  // Filter guides based on selected category
  const filteredGuides = selectedCategory === 'All' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);
  
  const renderGuideItem = ({ item }) => (
    <TouchableOpacity style={styles.guideCard}>
      <Image source={{ uri: item.image }} style={styles.guideImage} />
      <View style={styles.guideInfo}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.guideTitle}>{item.title}</Text>
        <View style={styles.guideFooter}>
          <BookOpen size={14} color="#666" />
          <Text style={styles.readTimeText}>{item.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text 
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.categoryButtonTextActive
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hiking Guides</Text>
        <Text style={styles.headerSubtitle}>Learn essential hiking skills and knowledge</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search guides...</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#3E8E7E" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <FlatList
        data={filteredGuides}
        renderItem={renderGuideItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.guideRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.guidesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No guides found</Text>
            <Text style={styles.emptySubtext}>Try selecting a different category</Text>
          </View>
        }
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  headerSubtitle: {
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
    paddingVertical: 10,
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
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
    fontFamily: 'Montserrat-Regular',
  },
  filterButton: {
    padding: 4,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryButtonActive: {
    backgroundColor: '#3E8E7E',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Montserrat-Medium',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  guidesList: {
    paddingBottom: 20,
  },
  guideRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  guideImage: {
    width: '100%',
    height: 120,
  },
  guideInfo: {
    padding: 12,
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Montserrat-Medium',
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  guideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontFamily: 'Montserrat-Regular',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat-Bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});