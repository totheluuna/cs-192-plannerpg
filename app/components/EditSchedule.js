/*
* MIT License

* Copyright (c) 2019 Rheeca S. Guion

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
 * Code History

 * 03/20/19 - Rheeca Guion - Created file, added textinputs for editing schedule
 * 03/27/19 - Rheeca Guion - Fixed calls to onDelete and onUpdate
 * 04/17/19 - Rheeca Guion - Added TimePickerAndroid, and the functions timeToString and showPicker
 */

/*
 * File creation date: Mar. 20, 2019
 * Development group:
 * Client group:

 * Purpose: A screen where details of a schedule are edited

 * Variables:
 *   scheduleTitle: contains schedule title
 *   scheduleStart: contains start time of schedule
 *   scheduleEnd: contains end time of schedule
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
     TimePickerAndroid,
} from 'react-native';

import {
     Container,
     Header,
     Content,
     Text,
     Body,
     Left,
     Right,
     List,
     ListItem,
     Button,
     Icon,
     Footer,
} from 'native-base';
import styles from './Styles';

export default class EditSchedule extends React.Component {
     constructor (props){
          super(props);
          this.state = {
               scheduleId: this.props.navigation.getParam('id', 0),
               scheduleTitle: this.props.navigation.getParam('title', 0),
               scheduleStart: this.props.navigation.getParam('start', 0),
               scheduleEnd: this.props.navigation.getParam('end', 0),
          };
     }

     timeToString (hour, minute){
          /*
          * timeToString
          * Creation date: Apr. 17, 2019
          * Purpose: Returns the string form of the input
          */
          let hourNum = hour;
          if (hourNum > 12) {
               hourNum -= 12;
          }
          let m = (minute<10)?"0"+minute:minute;
          let h = (hourNum<10)?"0"+hourNum:hourNum;
          let string = h+":"+m;
          string = (hour<11)?string+" AM":string+" PM";
          return string;
     }

     async showPicker(stateKey, options) {
          const TimePickerModule = require('NativeModules').TimePickerAndroid;
          try {
               const {action, hour, minute} = await TimePickerAndroid.open(options);
               if (action !== TimePickerAndroid.dismissedAction) {
                    if (stateKey == 'start') {
                         this.setState({ scheduleStart: {hour: hour, minute: minute} });
                    } else if (stateKey == 'end') {
                         this.setState({ scheduleEnd: {hour: hour, minute: minute} });
                    }
               }
          } catch (error) {
               alert(error);
          }
     }

     render (){
          return (
               <View style={styles.editSchedule}>
                    <List>
                         <ListItem>
                              <TextInput
                                   style={{flex:1}}
                                   multiline = {true}
                                   placeholder='Title'
                                   value={this.state.scheduleTitle}
                                   onChangeText={(text) => this.setState({scheduleTitle: text})}/>
                         </ListItem>
                         <ListItem>
                              <TouchableOpacity onPress={this.showPicker.bind(this, 'start', {
                                   hour: this.state.scheduleStart.hour,
                                   minute: this.state.scheduleStart.minute,
                                   is24Hour: true,
                              })}>
                                   <Text>{this.timeToString(this.state.scheduleStart.hour, this.state.scheduleStart.minute)}</Text>
                              </TouchableOpacity>
                         </ListItem>
                         <ListItem>
                              <TouchableOpacity onPress={this.showPicker.bind(this, 'end', {
                                   hour: this.state.scheduleEnd.hour,
                                   minute: this.state.scheduleEnd.minute,
                                   is24Hour: false,
                              })}>
                                   <Text>{this.timeToString(this.state.scheduleEnd.hour, this.state.scheduleEnd.minute)}</Text>
                              </TouchableOpacity>
                         </ListItem>
                         <ListItem>
                              <TouchableOpacity style={{marginRight: 20}} button transparent onPress={() => {
                                        this.props.navigation.state.params.onDelete(this.state.scheduleId);
                                        this.props.navigation.goBack();
                                   }}>
                                   <Icon name='trash' style={{color: '#000'}}/>
                              </TouchableOpacity>
                              <TouchableOpacity button transparent onPress={() => {
                                        this.props.navigation.state.params.onUpdate(
                                             this.state.scheduleId,
                                             this.state.scheduleTitle,
                                             this.state.scheduleStart,
                                             this.state.scheduleEnd,
                                        );
                                        this.props.navigation.goBack();
                                   }}>
                                   <Icon name='checkmark' style={{color: '#000'}}/>
                              </TouchableOpacity>
                         </ListItem>
                    </List>
               </View>
          )
     }
}
