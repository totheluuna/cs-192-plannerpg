/*
* MIT License

* Copyright (c) 2019 Angelo Vincent R. Delos Santos, Rheeca S. Guion

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
* 2/16/19 - Angelo Vincent R. Delos Santos - Added constructor, props, TextInput, and the functions
*          called on button presses, checkbox
* 2/22/19 - Rheeca Guion - Added UI, styles
* 4/01/19 - Rheeca Guion - removed textinputs to make component editable only in
*                          EditMemo, removed state
* 4/04/19 - Vince Delos Santos - added styles to card, buttons, and cardItems
*/

/*
* File creation date: Feb. 16, 2019
* Development group:
* Client group:

* Purpose: Defines the individual instance of a task

* Variables:
*   text: contains task text
*/

import React from 'react';
import {
     View,
     TextInput,
     TouchableOpacity,
     TouchableWithoutFeedback,
     Keyboard,
} from 'react-native';

import {
     Container,
     Header,
     Content,
     Card,
     CardItem,
     ListItem,
     CheckBox,
     Text,
     Body,
     Left,
     Right,
     Button,
     Icon
} from 'native-base';
import styles from './Styles';

export default class Task extends React.Component {
     constructor (props){
          super(props);
     }

     renderCheckBox (){
          if (this.props.isChecked) {
               return (
                    <CheckBox
                         checked={true}
                         onPress={this.props.tickMethod}
                         color='black'
                    />
               );
          } else {
               return (
                    <CheckBox
                         checked={false}
                         onPress={this.props.tickMethod}
                         color='black'
                    />
               );
          }
     }

     render (){
          let text = this.props.text;
          if (text == "") {
               text = "Task";
          }
          return (
               <View>
                    <Card bordered flexDirection='row' style={ styles.taskStyle }>
                         <CardItem style={styles.checkboxStyle}>
                              {this.renderCheckBox()}
                         </CardItem>
                         <TouchableOpacity style={{flex:1}} button transparent onPress={this.props.editMethod}>
                              <CardItem style={styles.taskCardStyle}>
                                   <View>
                                        <Text style={styles.taskTextStyle}>{text}</Text>
                                   </View>
                              </CardItem>
                         </TouchableOpacity>
                    </Card>
               </View>
          )
     }
}
