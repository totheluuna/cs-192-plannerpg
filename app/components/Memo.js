/*
* MIT License

* Copyright (c) 2019 Datuluna Ali G. Dilangalen, Rheeca S. Guion

* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.

* This is a course requirement for CS 192 Software Engineering II under the
* supervision of Asst. Prof. Ma. Rowena C. Solamo of the Department of Computer
* Science, College of Engineering, University of the Philippines, Diliman for the
* AY 2015-2016
*/
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
                                   onChangeText={(text) => this.setState({memoText: text})}/>
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
