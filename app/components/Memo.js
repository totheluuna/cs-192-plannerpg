import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import {Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Button, Icon} from 'native-base';

const width=100;
const height=150;

export default class Memo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memoTitle: "",
      memoText: "",
      x: 0,
      y: 0,
      array: [0,1,2,3],
    };
  }

  render() {
    return (
      <Card key={this.props.keyval}>
        <CardItem header >
          <Text>CS 192 Memo Title</Text>
        </CardItem>
        <CardItem>
          <Body>
            <TextInput
              multiline = {true}
              style={{height: height-60, width: width-20}}
              placeholder='Input text'
              value={this.state.memoText}
              onChangeText={(text) => this.setState({memoText: text})}
            />
          </Body>
        </CardItem>
        <CardItem>
            <TouchableOpacity button transparent onPress={this.props.saveMethod}>
              <Icon name='heart-empty' style={{color: '#000'}}/>
            </TouchableOpacity>
            <TouchableOpacity button transparent onPress={this.props.deleteMethod}>
              <Icon name='trash' style={{color: '#000'}}/>
            </TouchableOpacity>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  memoContainer: {
    backgroundColor: 'powderblue',
    width: width,
    height: height,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000000',
  }
});
