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

 * 03/05/19 - Rheeca Guion - created file
 */

/*
 * File creation date: Mar. 5, 2019
 * Development group:
 * Client group:

 * Purpose: Defines the individual instance of a schedule

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
     List,
     ListItem,
     Text,
     Body,
     Left,
     Right,
     Button,
     Icon,
     Footer,
} from 'native-base';

export default class Schedule extends React.Component {
     constructor (props){
          super(props);
          this.state = {
               scheduleTitle: props.title,
               scheduleStart: props.start,
               scheduleEnd: props.end,
          };
     }

     render (){
          let title = this.state.scheduleTitle;
          if (title == "") {
               title = "Title";
          }
          let start = this.state.scheduleStart;
          if (start == "") {
               start = "Start";
          }
          let end = this.state.scheduleEnd;
          if (end == "") {
               end = "End";
          }
          return (
               <ListItem key={this.state.scheduleId}>
                    <TouchableOpacity button transparent onPress={this.props.editMethod}>
                         <Header>
                              <Text>{title}</Text>
                         </Header>
                         <Body>
                              <Text>{start}</Text>
                              <Text>{end}</Text>
                         </Body>
                    </TouchableOpacity>
               </ListItem>

          )
     }
}
