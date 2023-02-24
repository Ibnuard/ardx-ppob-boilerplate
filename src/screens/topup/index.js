import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Size, Typo} from '../../styles';
import {Card, ExpandableView, Heading, Row, SubHeading} from '../../components';

const TopUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Heading>Top Up</Heading>
      <SubHeading>Pilih bank untuk melakukan top up</SubHeading>
      <Card
        mv={8}
        px={14}
        pv={8}
        onPress={() => navigation.navigate('TopUpDetail')}>
        <Row>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png',
            }}
            style={styles.logo}
            resizeMode={'contain'}
          />
          <Text style={styles.textBankName}>Bank Central Asia</Text>
        </Row>
      </Card>
    </View>
  );
};

export default TopUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  logo: {
    height: Size.SIZE_24 + 8,
    width: Size.SIZE_24 + 8,
    marginRight: Size.SIZE_14,
  },

  //Text Style

  textBankName: {
    ...Typo.TextNormalMedium,
  },
});
