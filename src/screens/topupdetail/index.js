import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Card, Center, ExpandableView, Heading} from '../../components';

const TopUpDetailScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Heading>Bank Central Asia</Heading>
        <View style={styles.topCard}>
          <Text style={styles.textCaption}>Nomor VA</Text>
          <Text style={styles.textVA}>1234567890</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <Text style={styles.textInst}>Instruksi Top Up</Text>
      </View>
      <ExpandableView title={'Instruksi 1'} contentStyle={styles.contentStyle}>
        <Text style={styles.textContent}>Halo</Text>
      </ExpandableView>
      <ExpandableView title={'Instruksi 1'} contentStyle={styles.contentStyle}>
        <Text style={styles.textContent}>Halo</Text>
      </ExpandableView>
    </View>
  );
};

export default TopUpDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  containerTop: {
    paddingHorizontal: Size.SIZE_24,
    backgroundColor: Colors.COLOR_WHITE,
    alignItems: 'center',
    marginBottom: Size.SIZE_8,
  },

  containerBottom: {
    backgroundColor: Colors.COLOR_WHITE,
    paddingVertical: Size.SIZE_8,
  },

  topCard: {
    marginVertical: Size.SIZE_8,
    marginBottom: Size.SIZE_14,
    alignItems: 'center',
  },

  contentStyle: {
    backgroundColor: Colors.COLOR_WHITE,
  },

  //text stye

  textCaption: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DESCRIPTION,
  },

  textVA: {
    ...Typo.TextLargeBold,
  },

  textInst: {
    ...Typo.TextNormalMedium,
    marginVertical: Size.SIZE_8,
    paddingHorizontal: Size.SIZE_14,
  },

  textContent: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DESCRIPTION,
    padding: Size.SIZE_14,
  },
});
