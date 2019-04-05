/*
* MIT License

* Copyright (c) 2019 Datuluna Ali G. Dilangalen, Rheeca S. Guion, Angelo Vincent R. Delos Santos

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

 * 2/07/19 - Datuluna Dilangalen - Added UI
 * 2/07/19 - Rheeca Guion - Added constructor, props, TextInput, and the functions
 *          called on button presses
 * 2/08/19 - Rheeca Guion - add comments, cleanup
 * 4/01/19 - Rheeca Guion - removed textinputs to make component editable only in
 *                          EditMemo, removed state
 * 4/04/19 - Vince Delos Santos - Added styles to cards, buttons, cardItems
 */

/*
 * File creation date: Feb. 3, 2019
 * Development group:
 * Client group:

 * Purpose: Defines the individual instance of a memo

 * Variables:
 *   title: contains memo title
 *   text: contains memo text
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
import styles from './Styles';

export default class Memo extends React.Component {
     constructor (props){
          super(props);
     }

     render (){
          let title = this.props.title;
          if (title == "") {
               title = "Title";
          }
          let text = this.props.text;
          if (text == "") {
               text = "Memo";
          }
          return (
               <Card key={this.props.id} style={styles.memoStyle}>
                    <TouchableOpacity button transparent onPress={this.props.editMethod}>
                         <CardItem header bordered style={styles.memoHeader}>
                              <Text style={{color:'white'}}>{title}</Text>
                         </CardItem>
                         <CardItem style={styles.memoStyle}>
                              <Body>
                                   <Text>{text}</Text>
                              </Body>
                         </CardItem>
                    </TouchableOpacity>
               </Card>
          )
     }
}
