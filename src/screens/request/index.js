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
  Modal,
  PinBottomSheet,
  Row,
  SubHeading,
  Touchable,
} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {formatRupiah, normalizeNumber, wait} from '../../utils/utils';
import {useFocusEffect} from '@react-navigation/native';
import {GET_CURRENT_DATETIME} from '../../utils/moment';

const RequestScreen = ({navigation, route}) => {
  const [amount, setAmount] = React.useState(formatRupiah(0));
  const [receiver, setReceiver] = React.useState();
  const [message, setMessage] = React.useState();

  //other
  const [isLoading, setIsLoading] = React.useState(false);

  // ========= GET SELECTED CONTACT
  const SELECTED_CONTACT = route?.params?.phone ?? '';
  const IS_TRX_CONFIRMED = route?.params?.confirmed;

  useFocusEffect(
    // == HANDLE SELECETD CONTACT
    React.useCallback(() => {
      // === HANDLE PHONE NUMBER
      if (SELECTED_CONTACT?.length) {
        const getNumber = normalizeNumber(SELECTED_CONTACT);
        setReceiver(getNumber);
      }

      // === HANDLE IF TRX CONFIRMED ( PIN )
      if (IS_TRX_CONFIRMED) {
        setIsLoading(true);
        wait(2000).then(() => {
          setIsLoading(false);
          gotoDetail();
        });
      }

      return;
    }, [SELECTED_CONTACT, IS_TRX_CONFIRMED]),
  );

  // === SAMPLE RESPONSE
  const SAMPLE_RESPONSE = {
    nominal: receiver,
    price: amount,
    number: receiver,
    name: 'Request',
    createdDate: GET_CURRENT_DATETIME(),
    sn: '0980-5780-8979-4608',
    status: 'success',
    trxId: 'TRX5646',
  };

  // ========= GOTO DETAIL
  const gotoDetail = () => {
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'TransactionDetail',
          params: {
            data: SAMPLE_RESPONSE,
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Heading>Request</Heading>
        <SubHeading>Masukan atau pilih nomor ponsel</SubHeading>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contactContainer}>
        <Row>
          <Input
            theme={'material'}
            placeholder={'Masukan Nomor Ponsel'}
            value={receiver}
            keyboardType={'phone-pad'}
            onChangeText={text => setReceiver(text)}
            showContact
            onContactPress={() =>
              navigation.navigate('Contact', {target: 'RequestInit'})
            }
          />
        </Row>
        <View style={styles.nominalContainer}>
          <Text>Nominal Request</Text>
          <TextInput
            style={styles.input}
            value={amount}
            keyboardType={'phone-pad'}
            onChangeText={text => setAmount(formatRupiah(text))}
          />
        </View>
        <View style={styles.messageContainer}>
          <Input
            theme={'material'}
            label={'Masukan pesan (opsional)'}
            value={message}
            onChangeText={text => setMessage(text)}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <Button
          title="Lanjut"
          onPress={() =>
            navigation.navigate('PinModal', {
              id: 'TRANSACTION',
              type: 'PIN',
              target: 'RequestInit',
            })
          }
        />
      </View>
      <Modal type={'loading'} visible={isLoading} />
    </View>
  );
};

export default RequestScreen;

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
