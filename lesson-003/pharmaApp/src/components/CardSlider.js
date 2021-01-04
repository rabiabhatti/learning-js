import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Platform} from 'react-native';

const window = Dimensions.get('window');

class CardSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfCards: this.props.children.length,
      position: 1,
    };
  }
  scroll = (e) => {
    let offsetX = e.contentOffset.x;
    let page = parseInt(offsetX / window.width);
    if (page === this.state.numOfCards - 1) {
      this.setState({position: 0});
    } else {
      this.setState({position: page + 1});
    }
  };
  render() {
    const {children} = this.props;
    let cards;
    if (children.length > 1) {
      cards = children.map((item, i) => {
        return (
          <View style={styles.card} key={i}>
            {item}
          </View>
        );
      });
    } else {
      cards = <View style={styles.card}>{children}</View>;
    }
    return (
      <ScrollView
        style={styles.scroll}
        onScroll={(e) => this.scroll(e.nativeEvent)}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={20}>
        {cards}
      </ScrollView>
    );
  }
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
});

export default CardSlider;
