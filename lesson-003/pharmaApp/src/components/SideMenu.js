import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';

const items = [
  {
    heading: 'Notifications',
    routeName: 'Notifications',
    desc: 'Read Notifications',
  },
  {
    heading: 'Special Offers',
    routeName: 'SpecialOffers',
    desc: 'Exclusive discounts just for you',
  },
  {
    heading: 'My Orders',
    routeName: 'Orders',
    desc: 'Reorder/Return',
  },
  {
    heading: 'Orders to Delivery',
    routeName: 'DeliveryOrders',
  },
  {
    heading: 'Gift your friends',
    routeName: 'Refer',
  },
  {
    heading: 'Call to Order',
    routeName: 'Home',
    desc: '9AM to 10PM',
  },
  {
    heading: 'FAQs',
    routeName: 'Help',
    desc: 'Frequently asked questions',
  },
  {
    heading: 'Logout',
    routeName: 'Logout',
  },
];

function SideMenu(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {items.map((item, i) => (
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: '#000',
            fontSize: 27,
            fontWeight: 'bold',
            marginLeft: 15,
          }}
          key={item.routeName}>
          {item.heading}
        </Text>
      ))}
    </ScrollView>
  );
}

export default SideMenu;
