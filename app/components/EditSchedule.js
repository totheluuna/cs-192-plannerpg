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

 * 03/20/19 - Rheeca Guion - created file, added textinputs for editing schedule
 * 03/27/19 - Rheeca Guion - fixed calls to onDelete and onUpdate
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
import TimePicker from 'react-native-simple-time-picker';

export default class EditSchedule extends React.Component {
     constructor (props){
          super(props);
          this.state = {
               scheduleId: this.props.navigation.getParam('id', 0),
               scheduleTitle: this.props.navigation.getParam('title', 0),
               scheduleStart: this.props.navigation.getParam('start', 0),
               scheduleEnd: this.props.navigation.getParam('end', 0),
               startHours: 0,
               startMinutes: 0,
          };
     }

     render (){
          const { startHours, startMinutes } = this.state;
          return (
               <View style={styles.editSchedule}>
                    <List>
                         <ListItem>
                              <Text>{this.state.scheduleId}</Text>
                         </ListItem>
                         <ListItem>
                              <TextInput
                                   multiline = {true}
                                   placeholder='Schedule'
                                   value={this.state.scheduleTitle}
                                   onChangeText={(text) => this.setState({scheduleTitle: text})}/>
                         </ListItem>
                         <ListItem>
                              <TextInput
                                   placeholder='Start'
                                   value={this.state.scheduleStart}
                                   onChangeText={(text) => this.setState({scheduleStart: text})}/>
                         </ListItem>
                         <ListItem>
                              <TextInput
                                   placeholder='End'
                                   value={this.state.scheduleEnd}
                                   onChangeText={(text) => this.setState({scheduleEnd: text})}/>
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
