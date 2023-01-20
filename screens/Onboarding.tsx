import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import PagerView from 'react-native-pager-view';


export function Onboarding() {

    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [actualPage, setActualPage] = React.useState(1);

    const isEmailValid = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isNameValid = (name) => {
        const re = /^[a-zA-Z]+$/;
        console.log(re.test(name));
        return re.test(name);
    };

    const PagerViewRef = React.useRef(null);

    const goToPage = React.useCallback((page) => {
        PagerViewRef.current.setPage(page);
    }, []);

    const isPageSelected = (page) => {
        console.log('page', PagerViewRef.current?.state?.selectedPage);
        return PagerViewRef.current?.state?.selectedPage === page;
    }



    React.useEffect(() => {
        console.log('name', name);
        console.log('lastName', lastName);
        console.log('email', isEmailValid(email));
    }, [name, lastName, email]);


    return (
        <View>
            <View>
                <Text>Little Lemon</Text>
                {/* Put a logo here */}

            </View>
            <PagerView
                style={styles.pagerView}
                initialPage={0}
                scrollEnabled={false}
                ref={PagerViewRef}
                onPageSelected={(e) => {
                    setActualPage(e.nativeEvent.position);
                }}
            >
                <View key="1">
                    <TextInput placeholder="Name" value={name} onChange={
                        (e) => {
                            setName(e.target.value);
                        }
                    } />
                    <Button title="Next"
                        disabled={!isNameValid(name)}
                        onPress={() => {
                            goToPage(1);
                        }} />
                </View>
                <View key="2">
                    <TextInput placeholder="Last Name" value={lastName} onChange={
                        (e) => {
                            setLastName(e.target.value);
                        }
                    } />
                    <Button title="Next"
                        disabled={!isNameValid(lastName)}
                        onPress={() => {
                            goToPage(2);
                        }} />
                </View>
                <View key="3">
                    <TextInput 
                    autoCapitalize='none'
                    autoComplete='email'
                    keyboardType='email-address'
                    autoCorrect={false}
                    placeholder="e-mail" value={email} onChange={
                        (e) => {
                            console.log(e.nativeEvent.text);
                            setEmail(e.nativeEvent.text);
                        }
                    } />
                    <Button title="Next"
                        disabled={!isEmailValid(email)}
                        onPress={() => {
                            goToPage(3);
                        }} />
                </View>
            </PagerView>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, height: 1}} />
                    <View onPress={() =>
                        goToPage(0)
                    }>
                        <Text style={{ width: 30, textAlign: 'center', fontSize: 45, color: actualPage == 0 ? 'black' : 'gray' }}>•</Text>
                    </View>
                    <View
                    onPress={() =>
                        goToPage(1)
                    }>
                        <Text style={{ width: 30, textAlign: 'center', fontSize: 45, color: actualPage == 1 ? 'black' : 'gray' }}>•</Text>
                    </View>
                    <View
                    onPress={() =>
                        goToPage(2)
                    }>
                        <Text style={{ width: 30, textAlign: 'center', fontSize: 45, color: actualPage == 2 ? 'black' : 'gray' }}>•</Text>
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
});