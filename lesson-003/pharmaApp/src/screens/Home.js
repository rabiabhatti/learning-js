import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

import {Button, Wrapper} from '../components';
import variables from '../utils/css-variables';
import {medicines, carousel} from '../utils/data';
import useInterval from '../hooks/useInterval';

const {width} = Dimensions.get('window');

const TEL_NUMBER = '1234567890';

function Home({navigation}) {
  const [count, setCount] = useState(0);
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
        <Text>You clicked {count} times</Text>
        <Button title="Click me" onPress={() => setCount(count + 1)} />
        <Button
          onPress={() => navigation.navigate('Medicine')}
          title="Go to Medicine"
        />
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
    elevation: 8,
    backgroundColor: variables.colors.white,
    paddingVertical: variables.spacing.small,
    marginBottom: variables.spacing.extraSmall,
    paddingHorizontal: variables.spacing.extraSmall,
  },
  linksText: {
    color: '#4F585E',
    fontWeight: '600',
    paddingBottom: 4,
    fontSize: variables.fontSize.s,
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
});

export default Home;
