/*
* MIT License
* Copyright (c) 2019 Datuluna Ali Dilangalen, Rheeca Guion
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

 * 3/22/19 - Datuluna Dilangalen - Created file
 * 4/30/19 - Rheeca Guion - Created function calculateTaskProgress
 *                        - Exp, tasks, and events points calculations for the progress bars
*/

/*
* File creation date: March 22, 2019
* Development group:
* Client group:
* Purpose: Display user progress
* Variables:
*      hp
*      max_hp
*      name
*      exp
*      expToLevel
*/

import React, { Component } from 'react';
import {

     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage,
     ProgressBarAndroid,
     StyleSheet,
} from 'react-native';
import {
     Card,
     CardItem,
     Container,
     Content,
     Header,
     Text,
     Title,
     Button,
     Icon,
     View,
} from 'native-base';
import { Avatar } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

export default class ViewProgress extends Component {
     constructor (props){
          super(props);
     }

     calculateTaskProgress() {
          /*
          * calculateTaskProgress
          * Creation date: Apr. 30, 2019
          * Purpose: Calculates completedTasks to totalTasks ratio
          */
          let totalTasks = this.props.screenProps.totalTasks;
          let completedTasks = this.props.screenProps.completedTasks;
          if (completedTasks > 0) {
               return completedTasks/totalTasks;
          }
          return 0;
     }

     render() {
          let lvl = Math.floor((this.props.screenProps.exp/10))+1
          let hp = 100
          let max_hp = 100
          let name = 'Artorias the Acads Slayer'
          let exp = this.props.screenProps.exp%10
          let expToLevel = 10
          return (
               <Container style={styles.container}>

                    <Content contentContainerStyle={{alignItems: 'center', paddingTop: 50}}>
                            <Image
                                style={{flex: 1,width: 400, height: 200}}
                                source={{uri: 'http://66.media.tumblr.com/52ea9ca1b6d4cfd8c97b5ee64236b5a2/tumblr_n0u2vtdmbZ1r6sk6wo1_400.gif'}}/>
                    </Content>

                    <Content>
                         <Title>
                              <Text style={{
                                   color: '#aa3d3d',
                                   fontSize: 24,
                                   fontWeight: 'bold'
                              }}>{name}</Text>
                         </Title>
                         <Title>
                              <Text style={{
                                   color: '#707070',
                                   fontSize: 18,
                                   fontWeight: 'bold'
                              }}>LV. {lvl}</Text>
                         </Title>



                         <Text style={styles.text}>HP: {hp}/{max_hp} </Text>
                         <ProgressBar
                           width={null}
                           height={14}
                           styleAttr="Horizontal"
                           color='#8D6BEA'
                           indeterminate={false}
                           progress={hp/max_hp}
                         />

                         <Text style={styles.text}>EXP: {exp}/{expToLevel}</Text>
                         <ProgressBar
                             width={null}
                             height={14}
                           animating={true}
                           color='#8D6BEA'
                           indeterminate={false}
                           progress={exp/expToLevel}
                         />
                         <Text style={styles.text}>Tasks: {this.props.screenProps.completedTasks}/{this.props.screenProps.totalTasks}</Text>
                         <ProgressBar
                             width={null}
                             height={14}
                           animating={true}
                           color='#8D6BEA'
                           indeterminate={false}
                           progress={this.calculateTaskProgress()}
                         />
                         <Text style={styles.text}>Events: {this.props.screenProps.totalEvents}/100 </Text>
                         <ProgressBar
                         width={null}
                         height={14}
                           animating={true}
                           color='#8D6BEA'
                           indeterminate={false}
                           progress={this.props.screenProps.totalEvents/100}
                         />
                    </Content>
               </Container>
          )
     }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#313131',
      flex: 1,
      justifyContent: 'space-evenly',
      padding: 30,

    },
    text: {
        fontWeight:'bold',
        color: '#828282'
    }
});
