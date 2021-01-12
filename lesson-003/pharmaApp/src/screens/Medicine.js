import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import RNPickerSelect from 'react-native-picker-select';

import variables from '../utils/css-variables';
import {medicines, medicineOverview, disclaimer} from '../utils/data';
import {Wrapper, Button as CustomButton, CardSlider} from '../components';

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

  const renderViewMore = (onPress) => {
    return (
      <Text style={styles.showMore} onPress={onPress}>
        Show more
      </Text>
    );
  };

  const renderViewLess = (onPress) => {
    return (
      <Text style={styles.showMore} onPress={onPress}>
        Show less
      </Text>
    );
  };

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
          <Text style={styles.blueHeading}>Introuduction</Text>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            <Text style={styles.text}>{medicineOverview.introduction}</Text>
          </ViewMoreText>
          <Text style={styles.blueHeading}>Uses of {medicine.name}</Text>
          <ViewMoreText
            numberOfLines={1}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            {medicineOverview.usage.map((item, i) => (
              <View style={styles.column} key={i}>
                <Text style={styles.text}>* {item}</Text>
              </View>
            ))}
          </ViewMoreText>
          <Text style={styles.blueHeading}>Side effects</Text>
          <View style={styles.column}>
            {medicineOverview.sideEffects.map((item, i) => (
              <Text style={styles.text} key={i}>
                * {item}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={[
            styles.container,
            {marginVertical: variables.spacing.extraSmall},
          ]}>
          <View style={styles.bannerRow}>
            <Image source={require('../img/shield.png')} style={styles.img} />
            <Text style={styles.heading}>Safety Advices</Text>
          </View>
          {medicineOverview.safetyAdvices.map((item, i) => (
            <Text style={styles.text} key={i}>
              * {item}
            </Text>
          ))}
        </View>
        <View
          style={[
            styles.container,
            {marginVertical: variables.spacing.extraSmall},
          ]}>
          <View style={styles.bannerRow}>
            <Image source={require('../img/overview.png')} style={styles.img} />
            <Text style={styles.heading}>Brief Description </Text>
          </View>
          <Text style={styles.blueHeading}>Indication</Text>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            <Text style={styles.text}>{medicineOverview.indication}</Text>
          </ViewMoreText>
          <Text style={styles.blueHeading}>How to use</Text>
          {Object.entries(medicineOverview.dosage).map(([key, value]) => (
            <View key={key}>
              <Text style={styles.smallBlueHeading}>* {key}</Text>
              <ViewMoreText
                numberOfLines={3}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}>
                <Text style={styles.text}>{value}</Text>
              </ViewMoreText>
            </View>
          ))}
          <Text style={styles.blueHeading}>Mode of Action</Text>
          <Text style={styles.smallBlueHeading}>* How Does It Work?</Text>
          <ViewMoreText
            numberOfLines={1}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            {medicineOverview.modeOfAction.map((item, i) => (
              <View style={styles.column} key={i}>
                <Text style={styles.text}>* {item}</Text>
              </View>
            ))}
          </ViewMoreText>
          <Text style={styles.blueHeading}>Contraindications</Text>
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            {medicineOverview.contraindications.map((item, i) => (
              <View style={styles.column} key={i}>
                <Text style={styles.text}>* {item}</Text>
              </View>
            ))}
          </ViewMoreText>
          <Text style={styles.blueHeading}>Storage Conditions</Text>
          <ViewMoreText
            numberOfLines={1}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            {medicineOverview.storageConditions.map((item, i) => (
              <View style={styles.column} key={i}>
                <Text style={styles.text}>* {item}</Text>
              </View>
            ))}
          </ViewMoreText>
        </View>
        <View
          style={[
            styles.container,
            {marginVertical: variables.spacing.extraSmall},
          ]}>
          <View style={styles.bannerRow}>
            <Image
              source={require('../img/precaution.png')}
              style={styles.img}
            />
            <Text style={styles.heading}>Precautions</Text>
          </View>
          {Object.entries(medicineOverview.precaution).map(([key, value]) => (
            <View key={key}>
              <Text style={styles.smallBlueHeading}>{key}</Text>
              <ViewMoreText
                numberOfLines={2}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}>
                <Text style={styles.text}>{value}</Text>
              </ViewMoreText>
            </View>
          ))}
        </View>
        <View
          style={[
            styles.container,
            {marginVertical: variables.spacing.extraSmall},
          ]}>
          <View style={styles.bannerRow}>
            <Image source={require('../img/warning.png')} style={styles.img} />
            <Text style={styles.heading}>General Warnings</Text>
          </View>
          <Text style={styles.text}>Talk to your doctor if:</Text>
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            {medicineOverview.quickTips.map((item, i) => (
              <View style={styles.column} key={i}>
                <Text style={styles.text}>* {item}</Text>
              </View>
            ))}
          </ViewMoreText>
        </View>
        <View>
          <View style={styles.bannerRow}>
            <Image
              source={require('../img/disclaimer.png')}
              style={styles.img}
            />
            <Text style={styles.disclaimerHeading}>Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>{disclaimer}</Text>
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
  column: {
    display: 'flex',
    flexDirection: 'column',
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
  disclaimerHeading: {
    fontWeight: 'bold',
    color: variables.colors.red,
    fontSize: variables.fontSize.s,
  },
  disclaimerText: {
    color: variables.colors.grey3,
    fontSize: variables.fontSize.xs,
    marginVertical: variables.spacing.extraSmall,
  },
  img: {
    width: 35,
    height: 35,
    marginRight: variables.spacing.extraSmall,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueHeading: {
    fontWeight: 'bold',
    color: variables.colors.blue,
    fontSize: variables.fontSize.s,
    marginVertical: variables.spacing.extraExtraSmall,
  },
  smallBlueHeading: {
    fontWeight: 'bold',
    color: variables.colors.blue,
    fontSize: variables.fontSize.xs,
    marginVertical: variables.spacing.extraExtraSmall,
  },
  text: {
    color: variables.colors.bodytext,
    marginVertical: variables.spacing.extraExtraExtraSmall,
  },
  showMore: {
    fontWeight: 'bold',
    color: variables.colors.black,
    marginVertical: variables.spacing.extraExtraExtraSmall,
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
