import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Button, Modal} from '..';
import Icon from 'react-native-vector-icons/AntDesign';

const RenderState = ({
  children,
  isLoading,
  data,
  useModal,
  noPermission,
  permissionName,
  modalMessage = 'message',
  modalType = 'loading',
  onPermissionButtonPress,
}) => {
  // =========== LOADING STATE
  if (isLoading) {
    return (
      <View style={styles.container}>
        {!useModal ? (
          <ActivityIndicator size={'small'} color={Colors.COLOR_PRIMARY} />
        ) : (
          <Modal visible={isLoading} type={modalType} message={modalMessage} />
        )}
      </View>
    );
  } else {
    // =========== NO PERMISSION
    if (noPermission) {
      return (
        <View style={styles.container}>
          <Icon name={'warning'} size={48} color={Colors.COLOR_DESCRIPTION} />
          <Text style={styles.textTitle}>Tidak Ada Izin Akses</Text>
          <Text style={styles.textDesc}>
            Berikan akses untuk memuat data {permissionName}
          </Text>
          <Button
            w={'half'}
            title={'Minta Akses'}
            mt={14}
            onPress={onPermissionButtonPress}
          />
        </View>
      );
    }

    // ============ NO DATA AFTER LOADING
    if (!data) {
      return (
        <View style={styles.container}>
          <Icon name={'inbox'} size={48} color={Colors.COLOR_DESCRIPTION} />
          <Text style={styles.textTitle}>Belum Ada Data</Text>
        </View>
      );
    }
  }

  // ============== MAIN STATE
  return children;
};

export default RenderState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //TEXT STYLE

  textTitle: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_DESCRIPTION,
    marginTop: Size.SIZE_8,
  },

  textDesc: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
  },
});
