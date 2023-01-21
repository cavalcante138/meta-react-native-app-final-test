import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { ButtonLemon } from '../components/ButtonLemon';
import { InputLemon } from '../components/InputLemon';
import { useAuth } from '../hooks/auth';
import { isEmailValid, isNameValid } from '../utils/utils';


export function Onboarding() {

    const [name, setName] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [buttonEnabled, setButtonEnabled] = React.useState(false);

    const { singIn } = useAuth()
    const toast = useToast()


    const handleSignIn = () => {
        singIn({
            name,
            lastname,
            email
        })
        toast.show("Welcome " + name, {
            type: "success",
            placement: "top",
            duration: 2000,
            animationType: "slide-in",
          });
    }

    React.useEffect(() => {
        if(isEmailValid(email) && isNameValid(name) && isNameValid(lastname)) {
            setButtonEnabled(true);
        }else{
            setButtonEnabled(false);
        }
    },[email, name, lastname]);

    return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputLemon label="First Name" placeholder="Type your name"
          value={name} onChange={setName} />
      </View>
      <View style={styles.inputContainer}>
        <InputLemon label="Last Name" placeholder="Type your name"
          value={lastname} onChange={setLastname} />
      </View>
      <View style={styles.inputContainer}>
        <InputLemon label="Email" placeholder="Type your email"
          value={email} onChange={setEmail} />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonLemon 
        title="Sign In" 
        disabled={!buttonEnabled}
        onPress={handleSignIn} />
      </View>
    </ScrollView>
    );
}

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