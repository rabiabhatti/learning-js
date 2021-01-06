import React, {useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';

import variables from '../utils/css-variables';
import useInterval from '../hooks/useInterval';
import {Wrapper, CardSlider} from '../components';
import {medicines, carousel, TEL_NUMBER} from '../utils/data';

const {width} = Dimensions.get('window');

const categories = [
  'Covid-19 Spacial',
  'Cardiac Care',
  'Diabetes Care',
  'Herbal and others',
];

function Home({navigation}) {
  const [sliderPosition, setSliderPosition] = React.useState(0);
  const slider = useRef('');

  useInterval(
    () => {
      const newVal = (sliderPosition + 1) % (carousel.length || 1);
      setSliderPosition(newVal);
      slider.current.scrollTo({x: width * newVal - 10, y: 0, animated: true});
    },
    4000,
    [sliderPosition, carousel],
  );

  function handleCallPress() {
    const url = `tel:${TEL_NUMBER}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  }

  return (
    <Wrapper style={styles.wrapperStyle}>
      <ScrollView
        contentContainerStyle={styles.scrollviewStyle}
        showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          ref={(c) => (slider.current = c)}
          showsHorizontalScrollIndicator={false}>
          {carousel.map((item, i) => (
            <Image
              resizeMode={'contain'}
              key={i}
              source={item.src}
              style={styles.carouselImage}
            />
          ))}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {carousel.map((item, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    i === sliderPosition ? variables.colors.blue : '#8897a2',
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Prescription')}
          style={styles.linksContainer}>
          <Image
            source={require('../img/prescription.png')}
            style={styles.linksImg}
          />
          <View>
            <Text style={styles.linksText}>Upload Prescription</Text>
            <Text style={styles.linksDimText}>
              Our pharmasists will place your order.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCallPress()}
          style={styles.linksContainer}>
          <Image source={require('../img/call.png')} style={styles.linksImg} />
          <View>
            <Text style={styles.linksText}>Call to Order</Text>
            <Text style={styles.linksDimText}>9AM to 11PM</Text>
          </View>
        </TouchableOpacity>
        {categories.map((c, i) => (
          <View key={i} style={styles.categoryContainer}>
            <Text style={styles.categoryHeading}>{c}</Text>
            <CardSlider medicines={medicines} navigation={navigation} />
          </View>
        ))}
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    paddingHorizontal: variables.spacing.extraSmall,
  },
  scrollviewStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: variables.spacing.extraSmall,
  },
  carouselImage: {
    width: width - 10,
    height: 150,
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: variables.spacing.extraSmall,
  },
  linksContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    width: '100%',
    backgroundColor: variables.colors.white,
    paddingVertical: variables.spacing.small,
    marginBottom: variables.spacing.extraSmall,
    paddingHorizontal: variables.spacing.extraSmall,
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
  linksText: {
    fontWeight: '600',
    paddingBottom: 4,
    fontSize: variables.fontSize.s,
    color: variables.colors.headingtext,
  },
  linksDimText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: variables.colors.grey2,
  },
  linksImg: {
    width: 50,
    height: 50,
    marginRight: variables.spacing.extraSmall,
  },
  categoryContainer: {
    width: '100%',
    marginBottom: variables.spacing.extraSmall,
  },
  categoryHeading: {
    fontWeight: 'bold',
    color: variables.colors.grey3,
    fontSize: variables.fontSize.s,
  },
});

export default Home;
