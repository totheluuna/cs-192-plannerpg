/*
* MIT License
* Copyright (c) 2019 Datuluna Ali Dilangalen
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
* AY 2018-2019
*/

/*
* File creation date: March 22, 2019
* Development group:
* Client group:
* Purpose: Display user progress
* Variables:
*      hp
*      max_hp
*      name
*      exp
*      expToLevel
*/

import React, { Component } from 'react';
import {

     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage,
     ProgressBarAndroid,
     StyleSheet,
} from 'react-native';
import {
     Card,
     CardItem,
     Container,
     Content,
     Header,
     Text,
     Title,
     Button,
     Icon,
     View,
} from 'native-base';
import { Avatar } from 'react-native-elements'

export default class ViewProgress extends Component {
     constructor (props){
          super(props);
          this.state = {
               username: 'luna',
               max_hp: 100,
               health: 50,
               exp: 20,
               expToLevel: 100,
          };
     }
     render() {
          let hp = 500, max_hp = 500, name = 'luna', exp = 20, expToLevel = 100
          return (
               <Container style={styles.container}>

                    <Content contentContainerStyle={{alignItems: 'center'}}>

                         <Avatar
                              rounded
                              size="xlarge"
                              overlayContainerStyle={{backgroundColor: '#303030'}}
                              source={{
                                   uri:"https://i.imgur.com/HRp88EK.gif"
                              }}
                              onPress={() => console.log("Works!")}
                              activeOpacity={0.7}
                              containerStyle={{flex: 3, marginTop: 100, flexDirection: 'row'}}
                         />

                    </Content>
                    <Content>

                         <Title>
                              <Text style={{
                                   color: '#fe2030',
                                   fontSize: 20,
                                   fontWeight: 'bold'
                              }}>RAGING CS STUDENT</Text>
                         </Title>
                         <Title>
                              <Text style={{
                                   color: '#ff3020',
                                   fontSize: 15,
                                   fontWeight: 'bold'
                              }}>LV. 9999</Text>
                         </Title>



                         <Text>HP: {this.props.screenProps.taskPoints}/100000000 </Text>
                         <ProgressBarAndroid
                           styleAttr="Horizontal"
                           color='fff300'
                           indeterminate={false}
                           progress={0.01}
                         />

                         <Text>EXP: 999999/10000000</Text>
                         <ProgressBarAndroid
                           animating={true}
                           color='orange'
                           styleAttr="Horizontal"
                           indeterminate={false}
                           progress={9.9}
                         />
                         <Text>Tasks: 2/CS 145</Text>
                         <ProgressBarAndroid
                           animating={true}
                           color='red'
                           styleAttr="Horizontal"
                           indeterminate={false}
                           progress={0.7}
                         />
                         <Text>Events: 5/10 </Text>
                         <ProgressBarAndroid
                           animating={true}
                           color='green'
                           styleAttr="Horizontal"
                           indeterminate={false}
                           progress={0.5}
                         />

                    </Content>
               </Container>
          )
     }
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'space-evenly',
          padding: 30,
          backgroundColor: '#dad7cd'
},


});
