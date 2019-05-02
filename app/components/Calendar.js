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
* 3/05/19 - Rheeca Guion - created file, added calendar (renderHeader, renderWeek,
*                          renderDays, onClick, prevMonth, nextMonth)
* 3/07/19 - Rheeca Guion - enabled creation of schedules (addSchedule, deleteSchedule,
*                          displaySchedules)
*                        - saving of dates in the state (datesWithSchedules, the
*                          functions hasDate, getDate)
*
* 03/22/19 - Rheeca Guion - added FlatList for the grid view of calendar
*                        - added editSchedule, updateSchedule, renderCell,
*                          renderWeekCell
*                        - fixed deleteSchedule error: now deletes the correct schedule
*                          but the fix is not yet reflected until updateSchedule is fixed
* 03/27/19 - Rheeca Guion - created the findObjectById function, fixed the functions
*                           editSchedule, updateSchedule so schedules can be updated
* 04/01/19 - Rheeca Guion - fixed saveSchedules and getSchedules so data can be stored in
*                           AsyncStorage
* 04/04/19 - Rheeca Guion - Added TouchableOpacity to the calendar dates
* 04/05/19 - Rheeca Guion - Fixed inconsistencies in handling date
*                         - Edited hasDate to use map rather than for loop
*                         - Fixed warning with key in a List and FlatList
*                         - Selected date is highlighted when selected
* 04/17/19 - Rheeca Guion - Changed 'start' and 'end' to hold an object containing integers 'hour' and 'minute'
* 04/29/19 - Rheeca Guion - Schedules are sorted by start time
* 04/30/19 - Rheeca Guion - The screenProps totalEvents and exp are updated as events are created and deleted
*                         - Days with schedules now have a different color
*/

/*
* File creation date: Mar. 5, 2019
* Development group:
* Client group:
* Purpose: Displays calendar, displays schedules, adds, edits, deletes schedules
* Variables:
*   currentMonth; the current month to display
*   selectedDate; the selected date
*   datesWithSchedules; array in state that saves dates with schedules
*   schedCurrId; id assigned to a new schedule
*   arr; temporary array for editing arrays from state
*   currDate; date object from the datesWithSchedules array that matches selectedDate
*/

import React, {Component} from 'react';
import {
     AsyncStorage,
     FlatList,
     Platform,
     Dimensions,
     Text,
     View,
     TouchableOpacity,
} from 'react-native';

import {
     Body,
     Button,
     Container,
     Content,
     Fab,
     Header,
     Icon,
     Left,
     List,
     ListItem,
     Right,
} from 'native-base';

import moment from 'moment';
import Schedule from './Schedule';
import styles from './Styles';

export default class Calendar extends React.Component {
     constructor(props) {
          super(props);
          let todayStr = moment().format('YYYY-MM-DD');
          let today = moment(todayStr, 'YYYY-MM-DD');
          this.state={
               currentMonth: today,
               selectedDate: today,
               datesWithSchedules: [],
               schedCurrId: 0,
               totalEvents: this.props.screenProps.totalEvents,
               expToAdd: 0,
          };
     }

     componentDidMount (){
          this.getSchedules();
     }

     isEmpty (arr) {
          /*
          * isEmpty
          * Creation date: Mar. 5, 2019
          * Purpose: Returns true if an array is empty
          */
          for (let obj in arr) {
               if(arr.hasOwnProperty(obj)) {
                    return false;
               }
          }
          return true;
     }

     hasDate (date) {
          /*
          * getDate
          * Creation date: Mar. 5, 2019
          * Purpose: Returns true if a dateWithSchedule object exists in
          *          datesWithSchedules whose date = date
          */
          let flag = false;
          let arr = this.state.datesWithSchedules;
          arr.map((dateItem) => {
               if (moment(dateItem.date).isSame(date, 'day')) {
                    flag = true;
               }
          })
          return flag;
     }

     getDate (date){
          /*
          * getDate
          * Creation date: Mar. 5, 2019
          * Purpose: Returns dateWithSchedule object from datesWithSchedules
          *          that corresponds to date
          */
          let arr = this.state.datesWithSchedules;
          let currDate;
          arr.map((dateItem) => {
               if (moment(dateItem.date).isSame(date, 'day')) {
                    currDate = dateItem;
               }
          });
          return currDate;
     }

     findObjectById (array, id){
          /*
          * findObjectById
          * Creation date: Mar. 27, 2019
          * Purpose: Find an object in array given its id
          */
          let object = null;
          array.map((obj) => {
               if (obj.id == id) {
                    object = obj;
               }
          });
          return object;
     }

     displaySchedules (date){
          /*
          * displaySchedules
          * Creation date: Mar. 5, 2019
          * Purpose: Returns Schedule components for all schedules for the
          *          selectedDate
          */
          if (this.hasDate(date)) {
               let currDate = this.getDate(date);
               let schedules = currDate.schedulesArray.map((scheduleItem) => {
                    return <Schedule
                         key={scheduleItem.id}
                         title={scheduleItem.title}
                         start={scheduleItem.start}
                         end={scheduleItem.end}
                         editMethod={ () => this.editSchedule(scheduleItem.id) }
                    />;
               });
               return schedules;
          } else {
               return (
                    <View style={styles.displayNoTasks}>
                         <Text style={styles.displayNoTasksText}>There are no schedules to show.</Text>
                    </View>
               );
          }
     }

     renderHeader (){
          /*
          * renderHeader
          * Creation date: Mar. 5, 2019
          * Purpose: Renders the current month and year at the header
          */
          const dateFormat = "MMMM YYYY";

          return (
               <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={this.prevMonth} transparent>
                         <Icon name='arrow-back' style={{color: '#D5DAE0'}}/>
                    </Button>
                    <Text style={{ color:"#D5DAE0" }}>
                         {moment(this.state.currentMonth).format(dateFormat)}
                    </Text>
                    <Button onPress={this.nextMonth} transparent>
                         <Icon name='arrow-forward' style={{color: '#D5DAE0'}} />
                    </Button>
               </View>
          );
     }

     renderWeekCell = ({ item, index }) => {
          if (item.empty === true) {
               return <View style={[styles.item, styles.itemInvisible]} />;
          }
          return (
               <View
                    style={styles.weekCell}
               >
                    <Text >{item.name}</Text>
               </View>
          );
     };

     renderWeek (){
          /*
          * renderWeek
          * Creation date: Mar. 5, 2019
          * Purpose: Renders the names of the days of the week
          */
          const dateFormat = "ddd";
          const days = [];

          let startDate = moment(this.state.currentMonth).startOf('week');

          for (let i = 0; i < 7; i++) {
               let temp = moment(startDate).add(i, 'days');
               days.push (
                    {name: moment(temp).format(dateFormat)}
               );
          }

          return (
               <FlatList
                    data={days}
                    renderItem={this.renderWeekCell}
                    keyExtractor={(item, index) => item.formDay}
                    numColumns={7}
               />
          );
     }

     renderCell = ({ item, index }) => {
          if (item.empty === true) {
               return <View style={styles.cell} />;
          }
          let style = styles.cell;
          let currDate = this.getDate(item.date);
          if (currDate) {
               if (!this.isEmpty(currDate.schedulesArray)) {
                    style = styles.highlightedCell;
               }
          }
          if (moment(item.date).isSame(item.selected)) {
               style = styles.selectedCell;
          }
          return (
               <TouchableOpacity style={style} onPress={() => this.onDateClick(item.date)}>
                    <Text >{item.formDay}</Text>
               </TouchableOpacity>
          );
     };

     renderDays (){
          /*
          * renderDays
          * Creation date: Mar. 5, 2019
          * Purpose: Renders days of the month
          */
          const currentMonth = this.state.currentMonth;
          const selectedDate = this.state.selectedDate;
          const monthStart = moment(currentMonth).startOf('month');
          const monthEnd = moment(monthStart).endOf('month');
          const startDate = moment(monthStart).startOf('week');
          const endDate = moment(monthEnd).endOf('week');

          const dateFormat = "D";
          const rows = [];

          let days = [];
          let day = startDate;
          let formattedDate = "";
          let isSelected = false;

          while (day <= endDate) {
               formattedDate = moment(day).format(dateFormat);
               const cloneDay = day;
               days.push(
                    {date: day, formDay: formattedDate, selected: selectedDate}
               );
               day = moment(day).add(1, 'days');
          }

          return (
               <FlatList
                    data={days}
                    renderItem={this.renderCell}
                    keyExtractor={(item, index) => item.formDay}
                    numColumns={7}
               />
          );
     }

     onDateClick = day => {
          this.setState({
               selectedDate: day
          });
     };

     prevMonth = () => {
          this.setState({
               currentMonth: moment(this.state.currentMonth).subtract(1, 'months')
          });
     };

     nextMonth = () => {
          this.setState({
               currentMonth: moment(this.state.currentMonth).add(1, 'months')
          });
     };

     render (){
          return (
               <Container style={styles.tasklistBase}>
                    <Header style={styles.tasklistHeader}>
                         <Left>
                              <Icon type="MaterialCommunityIcons" name="dns" style={{fontSize: 20, color: 'white'}}/>
                         </Left>
                         <Body>
                              <Text style={styles.tasklistHeaderText}>Calendar</Text>
                         </Body>
                         <Right/>
                    </Header>
                    <View style={styles.tasklistBackground}>
                         <View style={{paddingHorizontal: 50, paddingBottom: 20}}>
                              {this.renderHeader()}
                              {this.renderWeek()}
                              {this.renderDays()}
                         </View>
                         <Content>
                              <List>
                                   {this.displaySchedules(this.state.selectedDate)}
                              </List>
                         </Content>
                         <View style={styles.fabPosition}>
                              <Fab onPress={this.addSchedule.bind(this)} position="bottomRight" style={styles.fabColor2}>
                                   <Icon name='add' style={styles.fabStyle}/>
                              </Fab>
                         </View>
                    </View>
               </Container>
          );
     }

     addSchedule (){
          /*
          * addSchedule
          * Creation date: Mar. 5, 2019
          * Purpose: Adds a schedule
          */
          let timeStart = { hour: 8, minute: 0 };
          let timeEnd = { hour: 9, minute: 0 };
          if (this.hasDate(this.state.selectedDate)) {
               // Add schedules to date
               let currDate = this.getDate(this.state.selectedDate);
               let newSchedule = {
                    id: this.state.schedCurrId,
                    title: "",
                    start: timeStart,
                    end: timeEnd,
               };
               currDate.schedulesArray.push(newSchedule);

               let sorted = currDate.schedulesArray.sort((a, b) => {
                    if (a.start.hour == b.start.hour) {
                         return a.start.minute - b.start.minute;
                    } else {
                         return a.start.hour - b.start.hour;
                    }
               });

               let arr = this.state.datesWithSchedules;
               let arr2 = arr.map((dateItem) => {
                    if (moment(dateItem.date).isSame(currDate.date, 'day')) {
                         dateItem.schedulesArray = sorted;
                    }
                    return dateItem;
               });
               this.setState({ schedCurrId: this.state.schedCurrId + 1 });
               this.setState({ datesWithSchedules: arr2 });
          } else {
               // Add new date item to datesWithSchedules
               let newDateWithSched = {
                    date: this.state.selectedDate,
                    schedulesArray: [],
               };
               newDateWithSched.schedulesArray.push({
                    id: this.state.schedCurrId,
                    title: "",
                    start: timeStart,
                    end: timeEnd,
               });
               this.state.schedCurrId += 1;
               let arr = this.state.datesWithSchedules;
               arr.push(newDateWithSched);
               this.setState({ datesWithSchedules: arr });
          }
          this.setState({ totalEvents: this.state.totalEvents + 1 });
          this.setState({ expToAdd: this.state.expToAdd + 1 });
          this.saveSchedules();
     }

     editSchedule (id){
          /*
          * editSchedule
          * Creation date: Mar. 21, 2019
          * Purpose: Navigates to EditSchedule screen where schedule is edited
          */
          let currDate = this.getDate(this.state.selectedDate);
          let schedule = this.findObjectById(currDate.schedulesArray, id);
          if (schedule) {
               this.props.navigation.navigate('EditSchedule',
               {
                    id: id,
                    title: schedule.title,
                    start: schedule.start,
                    end: schedule.end,
                    onUpdate: this.updateSchedule.bind(this),
                    onDelete: this.deleteSchedule.bind(this)
               });
          }
     }

     updateSchedule (id, title, start, end) {
          /*
          * updateSchedule
          * Creation date: Mar. 21, 2019
          * Purpose: Updates the schedule in the state
          */
          let currDate = this.getDate(this.state.selectedDate);
          let schedule = this.findObjectById(currDate.schedulesArray, id);
          schedule.title = title;
          schedule.start = start;
          schedule.end = end;

          let arr = this.state.datesWithSchedules;
          let arr2 = arr.map((dateItem) => {
               if (moment(dateItem.date).isSame(currDate.date, 'day')) {
                    dateItem.schedulesArray = dateItem.schedulesArray.map((schedItem) => {
                         if(schedItem.id == id) {
                              schedItem = schedule;
                         }
                         return schedItem;
                    }).sort((a, b) => {
                         if (a.start.hour == b.start.hour) {
                              return a.start.minute - b.start.minute;
                         } else {
                              return a.start.hour - b.start.hour;
                         }
                    });
               }
               return dateItem;
          });
          this.setState({ datesWithSchedules: arr2 });
          this.saveSchedules();
     }

     saveSchedules = async() => {
          /*
           * saveSchedules
           * Creation date: Apr. 1, 2019
           * Purpose: Save schedules in AsyncStorage
           */
          try {
               await AsyncStorage.setItem('datesWithSchedules', JSON.stringify(this.state.datesWithSchedules));
          } catch (error) {
               alert(error);
          }
          try {
               await AsyncStorage.setItem('schedCurrId', JSON.stringify(this.state.schedCurrId));
          } catch (error) {
               alert(error);
          }
          this.props.screenProps.updateTotalEvents(this.state.totalEvents);
          this.props.screenProps.updateExp(this.state.expToAdd);
          this.setState({ expToAdd: 0 });
     }

     getSchedules = async () => {
          /*
           * getSchedules
           * Creation date: Apr. 1, 2019
           * Purpose: Get saved schedules from AsyncStorage
           */
          try {
               let temp = await AsyncStorage.getItem('datesWithSchedules');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({datesWithSchedules: parsed})
               }
          } catch (error) {
               alert(error);
          }
          try {
               let temp = await AsyncStorage.getItem('schedCurrId');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({schedCurrId: parsed})
               }
          } catch (error) {
               alert(error);
          }
     };

     deleteSchedule (id) {
          /*
          * deleteSchedule
          * Creation date: Mar. 5, 2019
          * Purpose: Deletes a schedule
          */
          let currDate = this.getDate(this.state.selectedDate);
          let objectToDelete = this.findObjectById(currDate.schedulesArray, id);
          if (objectToDelete) {
               currDate.schedulesArray.splice( currDate.schedulesArray.indexOf(objectToDelete), 1);
          }

          let arr = this.state.datesWithSchedules;
          let arr2 = arr.map((dateItem) => {
               if (moment(dateItem.date).isSame(currDate.date, 'day')) {
                    dateItem.schedulesArray = currDate.schedulesArray;
               }
               return dateItem;
          });
          this.setState({ datesWithSchedules: arr2 });
          this.setState({ totalEvents: this.state.totalEvents - 1 });
          this.setState({ expToAdd: this.state.expToAdd - 1 });
          this.saveSchedules();
     }
}
