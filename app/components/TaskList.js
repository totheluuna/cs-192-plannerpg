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
* 4/01/19 - Rheeca Guion - added the findObjectById and tickCheckBox functions, created
*                           the functions editTask, updateTask so tasks can be updated
*                        - had taskArray hold all the task details, changed addTask and
*                            deleteTask to account for this
*                        - fixed saveTasks and getTasks so data can be stored in
*                           AsyncStorage
* 4/04/19 - Vince Delos Santos - added styles to containers, texts, and headers. Added images and buttons
* 4/08/19 - Rheeca Guion - completedTasks are updated when checkboxes are ticked
* 4/30/19 - Rheeca Guion - The screenProps completedTasks, totalTasks and exp are updated as tasks are created,
*                          completed and deleted
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
*   taskCurrId; id assigned to a new task
*/

import React, { Component } from 'react';
import {
     Text,
     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage,
     ImageBackground
} from 'react-native';
import {
     Container,
     Content,
     Header,
     Title,
     Button,
     Icon,
     View,
     Fab,
} from 'native-base';
import Task from './Task';
import styles from './Styles';
import tl from './tl.jpg'

export default class TaskList extends Component {
     constructor (props){
          super(props);
          this.state = {
               taskArray: [],
               taskCurrId: 0,
               completedTasks: this.props.screenProps.completedTasks,
               totalTasks: this.props.screenProps.totalTasks,
               expToAdd: 0,
          };
     }

     componentDidMount (){
          this.getTasks();
     }

     findObjectById (array, id){
          let object = null;
          array.map((obj) => {
               if (obj.id == id) {
                    object = obj;
               }
          });
          return object;
     }

     displayTasks (tasks) {
          if (tasks && tasks.length > 0) {
               return (
                    tasks
               );
          } else {
               return (
                    <View style={styles.displayNoTasks}>
                         <Text style={styles.displayNoTasksText}>There are no tasks to show.</Text>
                    </View>
               );
          }
     }

     render (){
          let tasks = this.state.taskArray.map((taskItem) => {
               return <Task
                    key={taskItem.id}
                    isChecked={taskItem.isChecked}
                    text={taskItem.text}
                    tickMethod={ () => this.tickCheckBox(taskItem.id) }
                    editMethod={ () => this.editTask(taskItem.id) }
               />
          });
          return (
               <Container style={styles.tasklistBase}>
                    <Header style={styles.tasklistHeader}>
                         <Text style={styles.corkboardHeaderText}>TASKLIST</Text>
                    </Header>
                    <ImageBackground source={tl} style={styles.tasklistBackground} resizeMode='cover'>
                         <Content style={styles.displayTasks}>
                              {this.displayTasks(tasks)}
                         </Content>
                         <View style={styles.fabPosition}>
                              <Fab onPress={this.addTask.bind(this)} position="bottomRight" style={styles.fabColor2}>
                                   <Icon name='add' style={styles.fabStyle}/>
                              </Fab>
                         </View>
                    </ImageBackground>
               </Container>
          );
     }

     tickCheckBox (id){
          /*
          * tickCheckBox
          * Creation date: Apr. 01, 2019
          * Purpose: Updates completedTasks when a task is checked or unchecked
          */
          let arr = this.state.taskArray;
          let points = this.state.completedTasks;
          let expoints = this.state.expToAdd;

          let newArr = arr.map((taskItem) => {
               if(taskItem.id == id) {
                    if(taskItem.isChecked) {
                         this.setState({ completedTasks: points-1 });
                         this.setState({ expToAdd: expoints-1 });
                    } else {
                         this.setState({ completedTasks: points+1 });
                         this.setState({ expToAdd: expoints+1 });
                    }
                    taskItem.isChecked = !(taskItem.isChecked);
               }
               return taskItem;
          });
          this.setState({ taskArray: newArr });
          this.saveTasks();
     }

     addTask (){
          /*
          * addTask
          * Creation date: Feb. 16, 2019
          * Purpose: Adds a new blank task
          */
          let newTask = {
               id: this.state.taskCurrId,
               isChecked: false,
               text: "",
          };

          let arr = this.state.taskArray;
          arr.push(newTask);
          this.setState({ taskCurrId: this.state.taskCurrId + 1 });
          this.setState({ taskArray: arr });
          let taskTotal = this.state.totalTasks;
          this.setState({ totalTasks: taskTotal + 1 });
          this.saveTasks();
     }

     editTask (id){
          /*
          * editTask
          * Creation date: Apr. 1, 2019
          * Purpose: Edits a task
          */
          let task = this.findObjectById(this.state.taskArray, id);
          if (task) {
               this.props.navigation.navigate('EditTask', {
                    id: id,
                    isChecked: task.isChecked,
                    text: task.text,
                    onUpdate: this.updateTask.bind(this),
                    onDelete: this.deleteTask.bind(this)
               });
          }
     }

     updateTask (id, isChecked, text) {
          /*
          * updateTask
          * Creation date: Apr. 1, 2019
          * Purpose: Updates the task in the state
          */
          let arr = this.state.taskArray;
          let newArr = arr.map((taskItem) => {
               if(taskItem.id == id) {
                    taskItem.isChecked = isChecked;
                    taskItem.text = text;
               }
               return taskItem;
          });
          this.setState({ taskArray: newArr });
          this.saveTasks();
     }

     saveTasks = async() => {
          /*
          * saveTasks
          * Creation date: Feb. 16, 2019
          * Purpose: Save tasks in AsyncStorage
          */
          try {
               await AsyncStorage.setItem('taskArray', JSON.stringify(this.state.taskArray));
          } catch (error) {
               alert(error);
          }
          try {
               await AsyncStorage.setItem('taskCurrId', JSON.stringify(this.state.taskCurrId));
          } catch (error) {
               alert(error);
          }
          this.props.screenProps.updateCompletedTasks(this.state.completedTasks); // notes: when this line is placed in tickCheckBox, the value received by ViewProgress is delayed by one step
          this.props.screenProps.updateTotalTasks(this.state.totalTasks);
          this.props.screenProps.updateExp(this.state.expToAdd);
          this.setState({ expToAdd: 0 });
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
          } catch (error) {
               alert(error);
          }
          try {
               let temp = await AsyncStorage.getItem('taskCurrId');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({taskCurrId: parsed})
               }
          } catch (error) {
               alert(error);
          }
     };

     deleteTask (id){
          /*
          * deleteTask
          * Creation date: Feb. 16, 2019
          * Purpose: Deletes a task
          */
          let task = this.findObjectById(this.state.taskArray, id);
          if (task){
               if (task.isChecked){

               }
               let arr = this.state.taskArray;
               arr.splice(arr.indexOf(task), 1);
               this.setState({taskArray: arr});
          }
          let total = this.state.totalTasks;
          let completed = this.state.completedTasks;
          if (task.isChecked) {
               this.setState({ completedTasks: completed - 1 });
          }
          this.setState({ totalTasks: total - 1 });
          this.saveTasks();
     }
}
