import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

//Form validation
import {useForm, Controller} from 'react-hook-form';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function App() {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<any>({
    mode: 'onChange', // Enable validation on each change
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data.passwordLength);
    generatePasswordString(data.passwordLength);
    console.log('password:', password);
  };

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  console.log('numbers:', numbers);

  const generatePasswordString = (passwordLength: any) => {
    let charactersList = '';
    const uperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitalChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      charactersList += uperCaseChars;
    }
    if (lowerCase) {
      charactersList += lowerCaseChars;
    }
    if (numbers) {
      charactersList += digitalChars;
    }
    if (symbols) {
      charactersList += specialChars;
    }

    const passwordResult = createPassword(charactersList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
    console.log('reset');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.headerTitle}>Password Generator</Text>
        </View>
        <Text>Enter your password length</Text>

        <View style={{marginBottom: 20}}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              maxLength: {
                value: 2,
                message: 'Password length should be less than 1',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.inputContainer}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Ex: 8"
                keyboardType="numeric"
              />
            )}
            name="passwordLength"
          />
          {errors.passwordLength && (
            <Text>{String(errors.passwordLength.message)}</Text>
          )}
        </View>

        <BouncyCheckbox
          style={{marginBottom: 20}}
          isChecked={true}
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Include Lowercase"
          textStyle={{
            textDecorationLine: 'none',
          }}
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={(isChecked: boolean) => {
            setLowerCase(!lowerCase);
          }}
        />

        <BouncyCheckbox
          style={{marginBottom: 20}}
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Include Uppercase"
          textStyle={{
            textDecorationLine: 'none',
          }}
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={(isChecked: boolean) => {
            setUpperCase(!upperCase);
          }}
        />

        <BouncyCheckbox
          style={{marginBottom: 20}}
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Include Numbers"
          textStyle={{
            textDecorationLine: 'none',
          }}
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={(isChecked: boolean) => {
            setNumbers(!numbers);
          }}
        />

        <BouncyCheckbox
          style={{marginBottom: 20}}
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Include Symbols"
          textStyle={{
            textDecorationLine: 'none',
          }}
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 2}}
          onPress={(isChecked: boolean) => {
            setSymbols(!symbols);
          }}
        />

        <View style={styles.buttonBox}>
          <View style={styles.formButton}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.formButton, styles.colorRed]}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isPassGenerated && (
          <View style={styles.passwordBox}>
            <Text selectable={true} style={styles.passwordText}>
              {String(password)}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  formButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    height: 40,
    width: '48%',
    color: '#ffffff',
    borderRadius: 5,
  },
  colorRed: {
    backgroundColor: '#ff0000',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  passwordBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#070707FF',
    borderRadius: 5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
  },
});
