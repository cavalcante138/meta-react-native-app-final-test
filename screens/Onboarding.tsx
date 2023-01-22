import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, StatusBar } from 'react-native';
import PagerView from 'react-native-pager-view';
import { InputLemon } from '../components/InputLemon';
import { useAuth } from '../hooks/auth';
import { isEmailValid, isNameValid } from '../utils/utils';
import { ButtonLemon } from '../components/ButtonLemon';
import { useToast } from 'react-native-toast-notifications';
export function Onboarding() {

  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [actualPage, setActualPage] = React.useState(1);

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


  const PagerViewRef = React.useRef(null);

  const goToPage = React.useCallback((page) => {
    PagerViewRef.current.setPage(page);
  }, []);

  const isPageSelected = (page) => {
    console.log('page', PagerViewRef.current?.state?.selectedPage);
    return PagerViewRef.current?.state?.selectedPage === page;
  }





  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={false}
        ref={PagerViewRef}
        onPageSelected={(e) => {
          setActualPage(e.nativeEvent.position);
        }}
      >
        <View
          key="1"
          style={styles.page}
        >
          <Text style={styles.title}>Let us get to know you</Text>
          <InputLemon
            placeholder="Name"
            value={name}
            onChange={setName}
            autoCapitalize='words'
            label="Name"
          />
          <View style={styles.separator}></View>
          <View style={styles.buttonContainer}>
          <ButtonLemon title="Next"
            disabled={!isNameValid(name)}
            onPress={() => {
              goToPage(1);
            }} />
          </View>
        </View>
        <View key="2"
          style={styles.page}
        >
          <Text style={styles.title}>Let us get to know you</Text>
          <InputLemon
            placeholder="Last Name"
            value={lastname}
            onChange={setLastname}
            autoCapitalize='words'
            label={'Last Name'}
          />
          <View style={styles.separator}></View>
          <View style={styles.buttonContainer}>
          <ButtonLemon title="Next"
            disabled={!isNameValid(lastname)}
            onPress={() => {
              goToPage(2);
            }} />
          </View>
        </View>
        <View key="3"
          style={styles.page}
        >
          <Text style={styles.title}>Let us get to know you</Text>
          <InputLemon
            label="Email"
            placeholder="Type your email"
            value={email}
            onChange={setEmail} />
          <View style={styles.separator}></View>
          <View style={styles.buttonContainer}>
          <ButtonLemon title="Next"
            disabled={!isEmailValid(email)}
            onPress={() => {
              handleSignIn();
            }} />
          </View>
        </View>
      </PagerView>
      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          <View>
            <Text style={{ ...styles.indicators, color: actualPage == 0 ? '#495e57' : '#bdbdbd' }}>•</Text>
          </View>
          <View>
            <Text style={{ ...styles.indicators, color: actualPage == 1 ? '#495e57' : '#bdbdbd' }}>•</Text>
          </View>
          <View>
            <Text style={{ ...styles.indicators, color: actualPage == 2 ? '#495e57' : '#bdbdbd' }}>•</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    padding: 20
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  indicators: {
    width: 30,
    textAlign: 'center',
    fontSize: 45,
  },
  indicatorContainer: {
    flexDirection: 'row'
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    color: '#495e57',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Karla_700Bold'
  },
  buttonContainer: {
    marginBottom: 90
  }
});