import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {
  Button,
  Card,
  Heading,
  Input,
  PinBottomSheet,
  Row,
  SubHeading,
  Touchable,
} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {formatRupiah, normalizeNumber} from '../../utils/utils';
import {useFocusEffect} from '@react-navigation/native';

const SendScreen = ({navigation, route}) => {
  const [amount, setAmount] = React.useState(formatRupiah(0));
  const [receiver, setReceiver] = React.useState();
  const [message, setMessage] = React.useState();

  //pin
  const [showPin, setShowPin] = React.useState(false);

  // === PARAMS
  const IS_FROM_REQUEST = route?.params?.id;
  const DATA_FROM_REQUEST = route?.params?.data;

  // ========= GET SELECTED CONTACT
  const SELECTED_CONTACT = IS_FROM_REQUEST
    ? DATA_FROM_REQUEST?.name
    : route?.params?.phone ?? '';

  useFocusEffect(
    React.useCallback(() => {
      if (SELECTED_CONTACT?.length) {
        const getNumber = normalizeNumber(SELECTED_CONTACT);
        setReceiver(getNumber);
      }

      if (IS_FROM_REQUEST) {
        const requestAmount = formatRupiah(DATA_FROM_REQUEST?.price);

        //set state
        setAmount(requestAmount);
        setMessage(DATA_FROM_REQUEST?.message ?? '');
      }
    }, [SELECTED_CONTACT]),
  );

  // ========= GOTO DETAIL
  const gotoDetail = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'TransactionDetail',
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Heading>Transfer</Heading>
        <SubHeading>
          {IS_FROM_REQUEST
            ? 'Tranfer dari request'
            : 'Masukan atau pilih nomor ponsel'}
        </SubHeading>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contactContainer}>
        <Row px={IS_FROM_REQUEST ? 0 : 24}>
          <Input
            theme={'material'}
            editable={!IS_FROM_REQUEST}
            label={IS_FROM_REQUEST ? 'Nomor Penerima' : null}
            placeholder={'Masukan Nomor Ponsel'}
            value={receiver}
            keyboardType={'phone-pad'}
            onChangeText={text => setReceiver(text)}
          />
          {!IS_FROM_REQUEST && (
            <Touchable
              style={styles.contactButton}
              onPress={() =>
                navigation.navigate('Contact', {target: 'SendInit'})
              }>
              <Icon name="contacts" size={24} color={Colors.COLOR_DARK_GRAY} />
            </Touchable>
          )}
        </Row>
        <View style={styles.nominalContainer}>
          <Text>Nominal Tranfer</Text>
          <TextInput
            style={styles.input}
            value={amount}
            editable={!IS_FROM_REQUEST}
            keyboardType={'phone-pad'}
            onChangeText={text => setAmount(formatRupiah(text))}
          />
        </View>
        <View style={styles.messageContainer}>
          <Input
            theme={'material'}
            label={'Masukan pesan (opsional)'}
            value={message}
            editable={!IS_FROM_REQUEST}
            onChangeText={text => setMessage(text)}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Button title="Lanjut" onPress={() => setShowPin(true)} />
      </View>
      <PinBottomSheet
        visible={showPin}
        onBackPress={() => setShowPin(false)}
        onFilled={() => {
          setShowPin(false);
          gotoDetail();
        }}
      />
    </View>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    paddingVertical: Size.SIZE_24,
  },

  topContainer: {
    paddingHorizontal: Size.SIZE_24,
  },

  contactContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Size.SIZE_24,
    marginBottom: Size.SIZE_24,
  },

  contactButton: {
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.COLOR_DESCRIPTION,
    paddingHorizontal: Size.SIZE_8,
    paddingVertical: Size.SIZE_16,
    marginLeft: Size.SIZE_12,
  },

  nominalContainer: {
    width: '100%',
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
    padding: Size.SIZE_12,
    borderRadius: 8,
    marginVertical: Size.SIZE_14,
  },

  input: {
    ...Typo.TextLargeRegular,
  },

  messageContainer: {
    width: '100%',
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Size.SIZE_24,
  },
});
