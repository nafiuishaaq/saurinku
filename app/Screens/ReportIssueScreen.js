import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ReportIssueScreen = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [attachments, setAttachments] = useState([]);

  const handleBack = () => {
    console.log('Navigate back to Support Screen');
  };

  const handlePickImage = async () => {
    if (attachments.length >= 5) {
      Alert.alert('Maximum Attachments', 'You can only attach up to 5 files.');
      return;
    }

    // Simulating image picker
    // In real app, use expo-image-picker or react-native-image-picker
    const mockImage = {
      id: Date.now().toString(),
      uri: `https://picsum.photos/200/200?random=${Date.now()}`,
    };
    
    setAttachments([...attachments, mockImage]);
    
    // Real implementation would be:
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsMultipleSelection: true,
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   setAttachments([...attachments, ...result.assets]);
    // }
  };

  const handleRemoveAttachment = (id) => {
    setAttachments(attachments.filter(item => item.id !== id));
  };

  const validateForm = () => {
    if (!subject.trim()) {
      Alert.alert('Required Field', 'Please enter a subject for your issue.');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Required Field', 'Please describe your issue.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Show success message
    Alert.alert(
      'Ticket Submitted',
      'Your support ticket has been submitted successfully. Our team will get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to Support Screen
            console.log('Navigate to Support Screen');
            handleBack();
          },
        },
      ]
    );

    // Clear form
    setSubject('');
    setDescription('');
    setAttachments([]);
    setContactMethod('email');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Subject Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Late Delivery Inquiry"
            placeholderTextColor="#999"
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        {/* Description Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Describe your issue</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please provide as much detail as possible, including your order number if you have it."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Attachments Section */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Attachments (Optional)</Text>
          <View style={styles.attachmentsContainer}>
            {attachments.map((attachment) => (
              <View key={attachment.id} style={styles.attachmentItem}>
                <Image 
                  source={{ uri: attachment.uri }} 
                  style={styles.attachmentImage}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveAttachment(attachment.id)}
                >
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
            
            {attachments.length < 5 && (
              <TouchableOpacity 
                style={styles.addAttachmentButton}
                onPress={handlePickImage}
              >
                <Ionicons name="add" size={24} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.helperText}>
            You can attach up to 5 images
          </Text>
        </View>

        {/* Contact Method */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>How should we contact you?</Text>
          <View style={styles.contactMethodContainer}>
            <TouchableOpacity
              style={[
                styles.contactMethodButton,
                contactMethod === 'email' && styles.contactMethodButtonActive,
              ]}
              onPress={() => setContactMethod('email')}
            >
              <View style={styles.radioOuter}>
                {contactMethod === 'email' && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text
                style={[
                  styles.contactMethodText,
                  contactMethod === 'email' && styles.contactMethodTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.contactMethodButton,
                contactMethod === 'phone' && styles.contactMethodButtonActive,
              ]}
              onPress={() => setContactMethod('phone')}
            >
              <View style={styles.radioOuter}>
                {contactMethod === 'phone' && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text
                style={[
                  styles.contactMethodText,
                  contactMethod === 'phone' && styles.contactMethodTextActive,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Ticket</Text>
        </TouchableOpacity>
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
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    color: '#333',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  attachmentItem: {
    position: 'relative',
    width: 70,
    height: 70,
  },
  attachmentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  addAttachmentButton: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  contactMethodContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  contactMethodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFF',
  },
  contactMethodButtonActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  contactMethodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  contactMethodTextActive: {
    color: '#2563EB',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportIssueScreen;