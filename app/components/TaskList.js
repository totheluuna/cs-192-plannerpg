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
* AY 2015-2016
*/

/*
 * Code History
 * 2/7/19 - Datuluna Dilangalen - Added UI
 * 2/7/19 - Rheeca Guion - Added constructor, addMemo, editMemo, deleteMemo, saveMemos,
            getMemos, functions called on button presses, memos array to display
            memos
 * 2/8/19 - Rheeca Guion - add comments, cleanup
*/

/*
 * File creation date: Feb. 3, 2019
 * Development group:
 * Client group:
 * Purpose: Displays corkboard, displays memos, contains functions to add, edit,
 * delete memos, and save, get memos from storage
 * Variables:
 *   memoArray; array of memos saved in state and in AsyncStorage
 *   memos; array of memos from AsyncStorage to be displayed
 *   key; unique key to identify memos
 *   newMemo; holds new memo to be pushed into memoArray
 *   arr; temporary array for editing memoArray
 */

import React, { Component } from 'react';
import {
     Text,
     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage
} from 'react-native';
import { Container, Content, Header, Body, Left, Right, Title, Button, Icon, Fab, View } from 'native-base';
import Task from './Task';
export default class ViewCorkboard extends Component {
     constructor (props){
          super(props);
          this.state = {
              taskArray: [],
              currId: 0,
          };
     }

     componentDidMount (){
          this.getTasks();
     }

     render (){
          let tasks = this.state.taskArray.map((key) => {
               return <Task key={key}
               deleteMethod={ () => this.deleteTask(key) }
               saveMethod={ () => this.saveTasks }/>
          });
          return (
               <Container>
                    <Header>
                         <Left>
                              <Button transparent>
                              <Icon name='arrow-back' />
                              </Button>
                         </Left>
                         <Body>
                              <Title>Tasklist</Title>
                         </Body>
                              <Right>
                                   <Button onPress={ this.addTask.bind(this) }>
                                        <Icon name='add' />
                                   </Button>
                              </Right>
                         </Header>
                  <Content>
                  {tasks}
                  </Content>
               </Container>
          );
     }

     addTask (){
       /*
        * addMemo
        * Creation date: Feb. 5, 2019
        * Purpose: Adds a new blank memo
        */
       let newTask = this.state.currId;
       let arr = this.state.taskArray;
       arr.push(newTask);
       this.setState({ currId: this.state.currId+1 });
       this.setState({ taskArray: arr });
     }

     editTask (key, val){
       /*
        * editMemo
        * Creation date: Feb. 5, 2019
        * Purpose: Edits a memo
        */
     }

     deleteTask (key){
          /*
           * deleteMemo
           * Creation date: Feb. 5, 2019
           * Purpose: Deletes a memo
           */
          this.state.taskArray.splice( this.state.taskArray.indexOf(key) , 1);
          this.setState({taskArray: this.state.taskArray});
     }

     saveTasks = async() => {
          /*
           * saveMemos
           * Creation date: Feb. 5, 2019
           * Purpose: Save memos in AsyncStorage
           */
          try {
               await AsyncStorage.setItem('taskArray', JSON.stringify(this.state.taskArray));
               alert("Saved!");
          } catch (error) {
               alert(error);
          }
     };

     getTasks = async () => {
          /*
           * getMemos
           * Creation date: Feb. 5, 2019
           * Purpose: Get saved memos from AsyncStorage
           */
          try {
               let temp = await AsyncStorage.getItem('taskArray');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({taskArray: parsed})
               }
               //alert(parsed);
          } catch (error) {
               alert(error);
          }
     };
}