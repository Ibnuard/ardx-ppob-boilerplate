import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Input, RenderState, Touchable} from '../../components';
import {Colors, Size, Typo} from '../../styles';

const PDAMRegionScreen = ({navigation, route}) => {
  // == STATE
  const [isLoading, setIsLoading] = React.useState();
  const [regionList, setRegionList] = React.useState([1]);
  const [keyword, setKeyword] = React.useState('');
  // === TARGET SCREEN
  const TARGET = route?.params?.target;

  // === DUMMY DATA
  const DUMMY = [
    {
      code: 'ABCD',
      name: 'PDAM AETRA - JAKARTA',
    },
    {
      code: 'BCDE',
      name: 'PDAM CILACAP',
    },
    {
      code: 'CDEF',
      name: 'PDAM BANDUNG',
    },
  ];

  // ==FILTER FUNCTION
  const filterRegion = (data = []) => {
    return data.filter((item, index) => {
      return item?.name?.toLowerCase().includes(keyword.toLowerCase());
    });
  };

  // === RENDER REGION LIST CARD
  function _renderCardList(item, index) {
    return (
      <Touchable
        style={styles.cardList}
        onPress={() => navigation.navigate(TARGET, {region: item})}>
        <Text style={styles.textCardTitle}>{item?.name}</Text>
      </Touchable>
    );
  }

  return (
    <RenderState data={regionList} isLoading={isLoading}>
      <View style={styles.container}>
        <Input
          containerStyle={styles.inputContainer}
          placeholder={'Cari wilayah atau tempat'}
          showClear={keyword?.length}
          onClearPress={() => setKeyword('')}
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />

        <FlatList
          data={filterRegion(DUMMY)}
          renderItem={({item, index}) => _renderCardList(item, index)}
        />
      </View>
    </RenderState>
  );
};

export default PDAMRegionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  inputContainer: {
    paddingHorizontal: Size.SIZE_14,
    marginHorizontal: Size.SIZE_14,
    marginBottom: Size.SIZE_14,
    borderRadius: 8,
  },

  cardList: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.COLOR_DESCRIPTION,
    paddingVertical: Size.SIZE_14,
  },

  // ==text

  textCardTitle: {
    ...Typo.TextNormalBold,
    paddingHorizontal: Size.SIZE_14,
  },
});
