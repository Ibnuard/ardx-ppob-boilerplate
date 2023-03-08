import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Center, Input, RenderState, Row, Touchable} from '../../components';
import {useFocusEffect} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import {handleContactList} from '../../utils/utils';
import Icon from 'react-native-vector-icons/Feather';

const ContactScreen = ({navigation, route}) => {
  const [contact, setContact] = React.useState();
  const [noPermission, setNoPermission] = React.useState(true);
  const [keyword, setKeyword] = React.useState('');

  // ======= TARGET
  const TARGET = route?.params?.target;

  // ===== CHECK PERMISSION
  useFocusEffect(
    React.useCallback(() => {
      async function checkPermission() {
        const check = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        if (check) {
          setNoPermission(!check);
          getAllContacts();
        }
      }

      checkPermission();
    }, [noPermission]),
  );

  //===== REQUEST CONTACT PERMISSION
  const requestContactPermission = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'OK',
    })
      .then(res => {
        if (res !== 'denied') {
          setNoPermission(false);
        }
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };

  // ========= GET ALL CONTACT
  const getAllContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        const formatedContact = handleContactList(contacts);
        setContact(formatedContact);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // ========== FILTER CONTACT
  const filterContact = (data = [], key) => {
    return data.filter((item, index) => {
      return (
        item?.name?.toLowerCase().includes(key?.toLowerCase()) ||
        item?.phone?.includes(key)
      );
    });
  };

  //==== RENDER CONTACT CARD
  function _renderContactCard(item, index) {
    return (
      <Touchable
        style={styles.listContent}
        onPress={() => navigation.navigate(TARGET, {phone: item?.phone})}>
        <Row>
          <Center styles={styles.circle}>
            <Icon name="user" size={28} color={Colors.COLOR_DESCRIPTION} />
          </Center>
          <View style={styles.infoContainer}>
            <Text style={styles.textName}>{item?.name}</Text>
            <Text style={styles.textPhone}>{item?.phone}</Text>
          </View>
        </Row>
      </Touchable>
    );
  }

  return (
    <View style={styles.container}>
      <RenderState
        data={contact}
        isLoading={false}
        useModal
        onPermissionButtonPress={() => requestContactPermission()}
        noPermission={noPermission}>
        <Input
          containerStyle={styles.input}
          placeholder="Cari nama atau nomor ponsel"
          showClear={keyword?.length}
          onClearPress={() => {
            setKeyword('');
          }}
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />

        <FlatList
          data={filterContact(contact, keyword)}
          renderItem={({item, index}) => _renderContactCard(item, index)}
          windowSize={64}
          showsVerticalScrollIndicator={false}
        />
      </RenderState>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    paddingHorizontal: Size.SIZE_24,
  },

  circle: {
    height: Size.SIZE_24 + 24,
    width: Size.SIZE_24 + 24,
    borderRadius: 24,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  listContent: {
    borderBottomWidth: 0.5,
    paddingVertical: Size.SIZE_8,
  },

  infoContainer: {
    flex: 1,
    marginHorizontal: Size.SIZE_12,
  },

  inputContainer: {
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
    borderRadius: 8,
    paddingHorizontal: Size.SIZE_10,
    marginBottom: Size.SIZE_14,
  },

  input: {
    paddingHorizontal: Size.SIZE_8,
    borderRadius: Size.SIZE_8,
    marginBottom: Size.SIZE_14,
  },

  clearButton: {
    paddingLeft: Size.SIZE_8,
    marginTop: -Size.SIZE_12,
  },

  // ======== TEXT STYLE

  textName: {
    ...Typo.TextNormalBold,
  },

  textPhone: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
  },
});
