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
* AY 2018-2019
*/

/*
 * Code History

 * 2/7/19 - Datuluna Dilangalen - Added UI
 * 2/7/19 - Rheeca Guion - Added constructor, props, TextInput, and the functions
 *          called on button presses
 * 2/8/19 - Rheeca Guion - add comments, cleanup
 */

/*
 * File creation date: Feb. 3, 2019
 * Development group:
 * Client group:

 * Purpose: Defines the individual instance of a memo

 * Variables:
 *   memoTitle: contains memo title
 *   memoText: contains memo text
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

export default class MemoForm extends React.Component {
     constructor (props){
          super(props);
          this.doneEdit = this.doneEdit.bind(this)
          this.state = {
               memoId: 0,
               memoTitle: "",
               memoText: "",
          };
     }

     doneEdit() {
        this.props.doneEditing;
     }



     render (){
          const { title, text, id, onDoneAddItem, deleteItem, isSaved, addButtonPressed} = this.props;
          return (
               <Card>
                    <CardItem header >
                    <TextInput
                         multiline = {true}
                         placeholder='Title'
                         value={title}
                         onChangeText={(input) => this.setState({title: input})}/>
                    </CardItem>
                    <CardItem>
                         <Body>
                              <TextInput
                                   multiline = {true}
                                   placeholder='Memo'
                                   value={text}
                                   onChangeText={(input) => this.setState({text: input})}/>
                         </Body>
                    </CardItem>
                    <CardItem>
                         { !isSaved ? (
                              <TouchableOpacity button transparent onPressOut={this.doneEdit}>
                                   <Icon name='checkmark' style={{color: '#000'}}/>
                              </TouchableOpacity>
                         ): (
                              <TouchableOpacity button transparent onPress={()=>deleteItem(id)}>
                                   <Icon name='trash' style={{color: '#000'}}/>
                              </TouchableOpacity>
                         )}


                    </CardItem>
               </Card>
          )
     }
}
