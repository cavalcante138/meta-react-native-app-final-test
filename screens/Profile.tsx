import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ButtonLemon } from '../components/ButtonLemon';
import { CheckBoxLemon } from '../components/CheckBoxLemon';
import { ImagePickerLemon } from '../components/ImagePickerLemon';
import { InputLemon } from '../components/InputLemon';


export const Profile = (navigation) => {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailNotification, setEmailNotification] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true
  });
  const [profileImage, setProfileImage] = useState(null)

  const onChangeEmailNotification = (key) => {
    setEmailNotification({
      ...emailNotification,
      [key]: !emailNotification[key]
    });
  };

  const Logout = () => {
    AsyncStorage.removeItem('isOnBoard');
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.imagePickerContainer}>
      <ImagePickerLemon 
        image={profileImage}
        setImage={setProfileImage}
      />
      </View>
      <View style={styles.inputContainer}>
        <InputLemon label="Name" placeholder="Type your name"
          value={name} onChange={setName} />
      </View>
      <View style={styles.inputContainer}>
        <InputLemon label="Last Name" placeholder="Type your last name"
          value={lastName} onChange={setLastName} />
      </View>
      <View style={styles.inputContainer}>
        <InputLemon label="Email" placeholder="Type your email"
          value={email} onChange={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <InputLemon label="Phone" placeholder="Type your phone"
          value={phone} onChange={setPhone} />
      </View>
      <Text style={styles.title}>Email Notifications</Text>
      <View style={styles.inputContainer}>
        <CheckBoxLemon label="Order Statuses" isSelected={emailNotification.orderStatuses} setSelection={() => { 
          onChangeEmailNotification('orderStatuses')
        }} />
      </View>
      <View style={styles.inputContainer}>
        <CheckBoxLemon label="Password Changes" isSelected={emailNotification.passwordChanges} setSelection={() => { 
          onChangeEmailNotification('passwordChanges')
        }} />
      </View>
      <View style={styles.inputContainer}>
        <CheckBoxLemon label="Special Offers" isSelected={emailNotification.specialOffers} setSelection={() => { 
          onChangeEmailNotification('specialOffers')
        }} />
      </View>
      <View style={styles.inputContainer}>
        <CheckBoxLemon label="Newsletter" isSelected={emailNotification.newsletter} setSelection={() => { 
          onChangeEmailNotification('newsletter')
        }} />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonLemon title="Log Out" 
        backgroundColor='#f4ce15'
        pressedBgColor='#f4cf15eb'
        color='#000'
        pressedColor='#000'
        borderColor='#deaf4d'
        onPress={Logout} />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonLemon title="Discard changes"
          backgroundColor='#FFFFFF'
          pressedBgColor='#ffffff2e'
          color='#000'
          pressedColor='#000'
          onPress={() => { }} />

        <ButtonLemon title="Save changes"
          onPress={() => { }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Karla_700Bold',
    marginBottom: 10
  },
  inputContainer: {
    marginBottom: 10
  },
  buttonContainer: {
    marginTop: 10
  },
  imagePickerContainer: {
    marginBottom: 10,
    marginTop: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 30
  }
});
