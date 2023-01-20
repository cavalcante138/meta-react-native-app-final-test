import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ButtonLemon } from './ButtonLemon';

interface Props {
  image: string | null;
  setImage: (image: string | null) => void;
}

export function ImagePickerLemon(
  { image, setImage }: Props
) {


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const removeImage = () => {
    setImage(null);
  };

  return (
    <View>
      <Text style={styles.label}>Avatar</Text>
      <View style={styles.container}>
        {image ? <Image source={{ uri: image }} style={styles.avatarImage} /> :
          <Pressable style={styles.avatarPlaceholder} onPress={pickImage}>
            <Text style={styles.avatarText}>LC</Text>
          </Pressable>
        }
        <ButtonLemon
          title={image ? "Change" : "Upload image"}
          onPress={pickImage} />
        {image &&
          <View style={styles.buttonRemoveContainer}>
            <ButtonLemon
              title="Remove"
              backgroundColor='#f5f5f5'
              color="#495e57"
              onPress={removeImage} />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Karla_400Regular',
    marginLeft: 7
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#62d6c4',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Karla_700Bold'
  },
  buttonRemoveContainer: {
    marginLeft: 10
  },
  label: {
    fontSize: 14,
    color: '#5b5b5b',
    fontWeight: 'bold',
    fontFamily: 'Karla_700Bold',
    marginBottom: 5
  }
});