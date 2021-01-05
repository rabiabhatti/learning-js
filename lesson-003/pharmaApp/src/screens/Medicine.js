import * as React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Wrapper} from '../components';
import variables from '../utils/css-variables';

function Medicine(props) {
  const {medicine} = props.route.params;
  // console.log('props', medicine);
  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewStyle}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerHeadingContainer}>
            <Text style={styles.bannerHeading}>{medicine.name}</Text>
            <Text style={styles.bannerHeadingSup}> {medicine.strength}</Text>
          </View>
          <View style={styles.prescriptionContainer}>
            <Text style={{textTransform: 'capitalize'}}>{medicine.type}</Text>
            {medicine.rx_req && (
              <View style={styles.prescriptionNote}>
                <Image
                  source={require('../img/rx.png')}
                  style={{width: 25, height: 25}}
                />
                <Text style={styles.prescriptionNoteText}>
                  Prescription Required
                </Text>
              </View>
            )}
          </View>
          <View style={styles.row}>
            <Text>Generic:</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Generic', {
                  generic: medicine.composition,
                })
              }>
              <Text style={styles.link}>{medicine.composition}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text>Manufacturer:</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Brand', {
                  brand: 'GlaxoSmithKline',
                })
              }>
              <Text style={styles.link}>GlaxoSmithKline</Text>
            </TouchableOpacity>
          </View>
          {medicine.url && (
            <Image
              resizeMode="contain"
              source={{uri: medicine.url}}
              style={styles.bannerImg}
            />
          )}
          {/* <Button onPress={() => props.navigation.goBack()} title="Go back home" /> */}
        </View>
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    width: '100%',
    padding: variables.spacing.extraSmall,
    backgroundColor: variables.colors.white,
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
  scrollviewStyle: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    padding: variables.spacing.extraSmall,
  },
  bannerHeading: {
    fontWeight: 'bold',
    color: variables.colors.blue,
    fontSize: variables.fontSize.m,
    paddingBottom: variables.spacing.extraExtraExtraSmall,
  },
  prescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerHeadingSup: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: variables.colors.grey2,
  },
  bannerHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: variables.spacing.extraSmall,
  },
  bannerImg: {
    width: 170,
    height: 150,
    alignSelf: 'center',
    marginVertical: variables.spacing.extraSmall,
  },
  prescriptionNote: {
    width: '50%',
    borderRadius: 30,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
    backgroundColor: variables.colors.grey1,
  },
  prescriptionNoteText: {
    marginLeft: 7,
    fontSize: 13,
    color: variables.colors.blue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: variables.spacing.extraSmall,
  },
  link: {
    fontWeight: 'bold',
    color: variables.colors.blue,
    marginLeft: variables.spacing.extraSmall,
  },
});

export default Medicine;
