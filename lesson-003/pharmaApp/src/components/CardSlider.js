import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';

import variables from '../utils/css-variables';

const window = Dimensions.get('window');

function CardSlider(props) {
  return (
    <ScrollView
      style={styles.scroll}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={20}>
      {props.medicines.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() =>
            props.navigation.navigate('Medicine', {medicine: item})
          }>
          <View style={styles.cardContainer}>
            <Image
              resizeMode="contain"
              source={{uri: `${item.url}`}}
              style={styles.cardImage}
            />
            <Text style={styles.categoryMedicine} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.linksDimText}>Rs. {item.price}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    overflow: 'visible',
    ...Platform.select({
      ios: {
        width: window.width - 20,
      },
      android: {
        width: window.width - 40,
      },
    }),
  },
  card: {
    width: window.width / 2.2,
  },
  cardContainer: {
    padding: 10,
    marginLeft: 0,
    marginRight: 7,
    shadowRadius: 1,
    borderRadius: 4,
    width: window.width / 2.2,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: variables.spacing.extraSmall,
    ...Platform.select({
      ios: {
        shadowColor: '#b0b0b0',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.75,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardImage: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
  categoryMedicine: {
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    color: variables.colors.headingtext,
  },
});

export default CardSlider;
