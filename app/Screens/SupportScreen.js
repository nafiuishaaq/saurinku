import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const HelpSupportScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      title: 'Managing My Order',
      iconFamily: 'Ionicons',
      iconName: 'cube-outline',
      answer: 'You can manage your order by going to "My Orders" section. There you can track, modify, or cancel your orders.',
    },
    {
      id: 2,
      title: 'Payment & Pricing',
      iconFamily: 'Ionicons',
      iconName: 'card-outline',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods. Pricing includes all applicable taxes.',
    },
    {
      id: 3,
      title: 'Account & Profile',
      iconFamily: 'Ionicons',
      iconName: 'person-outline',
      answer: 'You can update your profile information, change password, and manage preferences in the Account Settings.',
    },
    {
      id: 4,
      title: 'Delivery Issues',
      iconFamily: 'Ionicons',
      iconName: 'location-outline',
      answer: 'If you experience delivery issues, please contact our support team with your order number for immediate assistance.',
    },
  ];

  const handleBack = () => {
    console.log('Navigate back');
  };

  const handleChatWithUs = () => {
    console.log('Open chat');
  };

  const handleCallUs = () => {
    console.log('Initiate call');
  };

  const handleCreateTicket = () => {
    console.log('Create support ticket');
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search help topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Get Instant Help Section */}
        <Text style={styles.sectionTitle}>Get Instant Help</Text>
        <View style={styles.instantHelpContainer}>
          <TouchableOpacity style={styles.helpCard} onPress={handleChatWithUs}>
            <View style={styles.iconContainer}>
              <Ionicons name="chatbubble-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.helpCardTitle}>Chat with Us</Text>
            <Text style={styles.helpCardSubtitle}>Available 24/7</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.helpCard} onPress={handleCallUs}>
            <View style={styles.iconContainer}>
              <Ionicons name="call-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.helpCardTitle}>Call Us</Text>
            <Text style={styles.helpCardSubtitle}>Mon - Sun 7am</Text>
          </TouchableOpacity>
        </View>

        {/* Create Support Ticket Button */}
        <TouchableOpacity style={styles.ticketButton} onPress={() => {
          navigator.navigate('ReportIssue');
        }}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FFF" />
          <Text style={styles.ticketButtonText}>Create a Support Ticket</Text>
        </TouchableOpacity>

        {/* Frequently Asked Questions */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqData.map((faq) => {
            const isExpanded = expandedFAQ === faq.id;
            const IconComponent = faq.iconFamily === 'Ionicons' ? Ionicons : MaterialIcons;

            return (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleFAQ(faq.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqLeft}>
                    <View style={styles.faqIconContainer}>
                      <IconComponent name={faq.iconName} size={20} color="#333" />
                    </View>
                    <Text style={styles.faqTitle}>{faq.title}</Text>
                  </View>
                  {isExpanded ? (
                    <Ionicons name="chevron-down" size={20} color="#666" />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                  )}
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  instantHelpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  helpCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  helpCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  helpCardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  ticketButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  ticketButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  faqContainer: {
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faqIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  faqTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingLeft: 44,
  },
});

export default HelpSupportScreen;