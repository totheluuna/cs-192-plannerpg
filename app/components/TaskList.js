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
* 2/16/19 - Angelo Vincent R. Delos Santos - Added constructor, addTask, editTask,
deleteTask, saveTasks, getTasks, functions called on button presses,
tasks array to display, tasks
* 2/22/19 - Rheeca Guion - Added UI, styles
*/

/*
* File creation date: Feb. 16, 2019
* Development group:
* Client group:
* Purpose: Displays tasklist, displays tasks, contains functions to add, edit,
* delete tasks, and save, get tasks from storage
* Variables:
*   taskArray; array of tasks saved in state and in AsyncStorage
*   tasks; array of tasks from AsyncStorage to be displayed
*   num; unique key to identify tasks
*   newTask; holds new task to be pushed into taskArray
*   arr; temporary array for editing taskArray
*   currId; id assigned to a new task
*/

import React, { Component } from 'react';
import {
     Text,
     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage
} from 'react-native';
import {
     Container,
     Content,
     Header,
     Title,
     Button,
     Icon,
     View
} from 'native-base';
import Task from './Task';
import styles from './Styles';

export default class TaskList extends Component {
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

     displayTasks (tasks) {
          if (tasks && tasks.length > 0) {
               return (
                    tasks
               );
          } else {
               return (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                         <Text style={{ color: '#445C70' }}>There are no tasks to show.</Text>
                    </View>
               );
          }
     }

     render (){
          let tasks = this.state.taskArray.map((key) => {
               return <Task key={key}
               deleteMethod={ () => this.deleteTask(key) }
               saveMethod={ () => this.saveTasks }/>
          });
          return (
               <Container style={styles.bg}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                         <Button onPress={ this.addTask.bind(this) } transparent >
                              <Icon name='add' style={{color: '#E2858D'}}/>
                         </Button>
                    </View>
                    <Content>
                    {this.displayTasks(tasks)}
                    </Content>
               </Container>
          );
     }

     addTask (){
          /*
          * addTask
          * Creation date: Feb. 16, 2019
          * Purpose: Adds a new blank task
          */
          let newTask = this.state.currId;
          let arr = this.state.taskArray;
          arr.push(newTask);
          this.setState({ currId: this.state.currId+1 });
          this.setState({ taskArray: arr });
     }

     editTask (key, val){
          /*
          * editTask
          * Creation date: Feb. 16, 2019
          * Purpose: Edits a task
          */
     }

     deleteTask (key){
          /*
          * deleteTask
          * Creation date: Feb. 16, 2019
          * Purpose: Deletes a task
          */
          this.state.taskArray.splice( this.state.taskArray.indexOf(key) , 1);
          this.setState({taskArray: this.state.taskArray});
     }

     saveTasks = async() => {
          /*
          * saveTasks
          * Creation date: Feb. 16, 2019
          * Purpose: Save tasks in AsyncStorage
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
          * getTasks
          * Creation date: Feb. 16, 2019
          * Purpose: Get saved tasks from AsyncStorage
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
