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
*
* 4/01/19 - Rheeca Guion - created file, added textinputs for editing task
*
*/

/*
* File creation date: Apr. 1, 2019
* Development group:
* Client group:

* Purpose: A screen where details of a task are edited

* Variables:
*   taskId: contains task idea
*   taskIsChecked: contains boolean value whether task is done or not 
*   taskText: contains task text
*/

import React from 'react';
import {
     View,
     TextInput,
     TouchableOpacity,
     TouchableWithoutFeedback,
     Keyboard,
     AsyncStorage,
} from 'react-native';

import {
     Container,
     Header,
     Content,
     List,
     ListItem,
     CheckBox,
     Text,
     Button,
     Icon
} from 'native-base';
import styles from './Styles';

export default class Task extends React.Component {
     constructor (props){
          super(props);
          this.state = {
               taskId: this.props.navigation.getParam('id', 0),
               taskIsChecked: this.props.navigation.getParam('isChecked', 0),
               taskText: this.props.navigation.getParam('text', 0),
          };
     }

     render (){
          return (
               <View style={styles.editTask}>
                    <List>
                         <ListItem>
                              <Text>{this.state.taskId}</Text>
                         </ListItem>
                         <ListItem>
                              <TextInput
                                   multiline = {true}
                                   placeholder='Task'
                                   value={this.state.taskText}
                                   onChangeText={(text) => this.setState({taskText: text})}
                              />
                         </ListItem>
                         <ListItem>
                              <TouchableOpacity style={{marginRight: 20}} button transparent onPress={() => {
                                        this.props.navigation.state.params.onDelete(this.state.taskId);
                                        this.props.navigation.goBack();
                                   }}>
                                   <Icon name='trash' style={{color: '#000'}}/>
                              </TouchableOpacity>
                              <TouchableOpacity button transparent onPress={() => {
                                        this.props.navigation.state.params.onUpdate(
                                             this.state.taskId,
                                             this.state.taskIsChecked,
                                             this.state.taskText,
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
