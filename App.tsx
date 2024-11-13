import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

//Form validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Too Short! min 4')
    .max(50, 'Too Long! max 50')
    .required('No password provided!'),
});
export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Text>App</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
