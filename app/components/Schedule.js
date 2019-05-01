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

 * 03/05/19 - Rheeca Guion - Created file
 * 03/27/19 - Rheeca Guion - Removed textinputs to make component editable only in
 *                           EditSchedule
 * 04/17/19 - Rheeca Guion - Added timeToString
 */

/*
 * File creation date: Mar. 5, 2019
 * Development group:
 * Client group:

 * Purpose: Defines the individual instance of a schedule

 * Variables:
 *   title: contains schedule title
 *   start: contains start time of schedule
 *   end: contains end time of schedule
 */

import React from 'react';
import {
     View,
     TouchableOpacity,
} from 'react-native';

import {
     List,
     ListItem,
     Text,
} from 'native-base';

export default class Schedule extends React.Component {
     constructor (props){
          super(props);
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

     render (){
          let title = this.props.title;
          if (title == "") {
               title = "Title";
          }
          let startHour = this.props.start.hour;
          let startMinute = this.props.start.minute;
          let endHour = this.props.end.hour;
          let endMinute = this.props.end.minute;
          return (
               <ListItem style={{backgroundColor:"#138200"}}>
                    <TouchableOpacity onPress={this.props.editMethod}>
                         <Text>
                              {title}
                         </Text>
                         <Text style={{ opacity: 0.2 }}>
                              {this.timeToString(startHour, startMinute)} - {this.timeToString(endHour, endMinute)}
                         </Text>
                    </TouchableOpacity>
               </ListItem>
          )
     }
}
