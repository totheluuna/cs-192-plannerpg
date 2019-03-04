import React, {Component} from 'react';
import {
     AsyncStorage,
     FlatList,
     Platform,
     Dimensions,
     Text,
     View,
} from 'react-native';

import {
     Button,
     Container,
     Header,
     Icon,
} from 'native-base';

import moment from "moment";
import styles from './Styles';

export default class Calendar extends Component {
     constructor(props) {
          super(props);
          this.state={
               currentMonth: new Date(),
               selectedDate: new Date(),
               scheduleArray: [],
               currId: 0,
          };
     }

     renderHeader (){
          const dateFormat = "MMMM YYYY";

          return (
               <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onPress={this.prevMonth} transparent>
                         <Icon name='arrow-back' style={{color: '#445C70'}}/>
                    </Button>
                    <Text>
                         {moment(this.state.currentMonth).format(dateFormat)}
                    </Text>
                    <Button onPress={this.nextMonth} transparent>
                         <Icon name='arrow-forward' style={{color: '#445C70'}} />
                    </Button>
               </View>
          );
     }

     renderWeek (){
          const dateFormat = "ddd";
          const days = [];

          let startDate = moment(this.state.currentMonth).startOf('week');

          for (let i = 0; i < 7; i++) {
               let temp = moment(startDate).add(i, 'days');
               days.push (
                    <Text>
                         {moment(temp).format(dateFormat)}
                    </Text>
               );
          }

          return (
               <View>
                    <Text>
                         {days}
                    </Text>
               </View>
          );
     }

     renderDays (){
          const { currentMonth, selectedDate } = this.state;
          const monthStart = moment(currentMonth).startOf('month');
          const monthEnd = moment(monthStart).endOf('month');
          const startDate = moment(monthStart).startOf('week');
          const endDate = moment(monthEnd).endOf('week');

          const dateFormat = "D";
          const rows = [];

          let days = [];
          let day = startDate;
          let formattedDate = "";

          while (day <= endDate) {
               for (let i = 0; i < 7; i++) {
                    formattedDate = moment(day).format(dateFormat);
                    const cloneDay = day;
                    days.push(
                         <Text>
                              {formattedDate}
                         </Text>
                    );
                    day = moment(day).add(1, 'days');
               }
               rows.push(
                    <Text>
                         {days}
                    </Text>
               );
               days = [];
          }

          return (
               <View>
                    <Text>
                         {rows}
                    </Text>
               </View>
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
               <Container>
                    <View>
                         {this.renderHeader()}
                         {this.renderWeek()}
                         {this.renderDays()}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                         <Button transparent >
                              <Icon name='add' style={{color: '#E2858D'}}/>
                         </Button>
                    </View>
               </Container>
          );
     }
}
