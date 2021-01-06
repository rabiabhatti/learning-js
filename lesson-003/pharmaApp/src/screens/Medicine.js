import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {Wrapper, Button as CustomButton, CardSlider} from '../components';
import variables from '../utils/css-variables';
import {medicines} from '../utils/data';

const items = [
  {label: 'Qty 1', value: 1},
  {label: 'Qty 2', value: 2},
  {label: 'Qty 3', value: 3},
  {label: 'Qty 4', value: 4},
  {label: 'Qty 5', value: 5},
  {label: 'Qty 6', value: 6},
  {label: 'Qty 7', value: 7},
  {label: 'Qty 8', value: 8},
  {label: 'Qty 9', value: 9},
  {label: 'Qty 10', value: 10},
];

function Medicine(props) {
  const {medicine} = props.route.params;
  const [quantity, setQuantity] = useState(1);
  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollviewStyle}>
        <View style={styles.container}>
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
          <Text style={styles.price}>Rs. {medicine.price * quantity}</Text>
          <View style={styles.pickerContainer}>
            <View>
              <Text style={styles.medicineQty}>{medicine.unit}</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                placeholder={{}}
                style={{...pickerSelectStyles}}
                value={quantity}
                onValueChange={(q) => setQuantity(q)}
                items={items}
              />
            </View>
            <CustomButton
              title="ADD TO CART"
              onPress={() => console.log('hello')}
            />
          </View>
        </View>
        <View style={styles.similarMeds}>
          <Text style={styles.heading}>Similar Products</Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Generic', {
                generic: medicine.composition,
              })
            }>
            <Text style={styles.link}>View all</Text>
          </TouchableOpacity>
        </View>
        <CardSlider
          medicines={medicines.slice(0, 5)}
          navigation={props.navigation}
        />
        <View
          style={[
            styles.container,
            {marginVertical: variables.spacing.extraSmall},
          ]}>
          <View style={styles.bannerRow}>
            <Image source={require('../img/overview.png')} style={styles.img} />
            <Text style={styles.heading}>Medicine Overview</Text>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderRadius: variables.borderRadius,
    padding: variables.spacing.extraSmall,
    backgroundColor: variables.colors.white,
    marginBottom: variables.spacing.extraSmall,
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
    marginBottom: variables.spacing.extraSmall,
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
  similarMeds: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    fontWeight: 'bold',
    color: variables.colors.blue,
    marginLeft: variables.spacing.extraSmall,
  },
  price: {
    fontSize: variables.fontSize.xl,
    marginBottom: variables.spacing.extraSmall,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medicineQty: {
    color: variables.colors.bodytext,
    marginBottom: variables.spacing.extraSmall,
  },
  heading: {
    fontWeight: 'bold',
    color: variables.colors.grey3,
    fontSize: variables.fontSize.s,
  },
  img: {
    width: 40,
    height: 40,
    marginRight: variables.spacing.extraSmall,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 100,
    fontSize: 15,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
    color: variables.colors.grey3,
    borderRadius: variables.borderRadius,
    borderColor: variables.colors.border,
    backgroundColor: variables.colors.white,
  },
  inputAndroid: {
    width: 100,
    fontSize: 15,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
    color: variables.colors.grey3,
    borderRadius: variables.borderRadius,
    borderColor: variables.colors.border,
    backgroundColor: variables.colors.white,
  },
});

export default Medicine;
