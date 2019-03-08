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
     AsyncStorage,
     ActivityIndicator
} from 'react-native';
import { Container, Content, Header, Body, Left, Right, Title, Button, Icon, Fab, View, Item, Input} from 'native-base';
import Task from './Task';
import styles from './Styles';
import uuid from 'uuid/v1';

export default class TaskList extends Component {
     constructor (props){
          super(props);
          this.state = {
     		inputValue: '',
     		loadingItems: false,
     		allItems: {},
     		isCompleted: false
     	};
     }


     // componentDidMount (){
     //      // this.getTasks();
     //      this.loadingItems
     // }


	componentDidMount = () => {
		this.loadingItems();
	};

	newInputValue = value => {
		this.setState({
			inputValue: value
		});
	};

	loadingItems = async () => {
		try {
			const allItems = await AsyncStorage.getItem('Todos');
			this.setState({
				loadingItems: true,
				allItems: JSON.parse(allItems) || {}
			});
		} catch (err) {
			console.log(err);
		}
	};

	onDoneAddItem = () => {
		const { inputValue } = this.state;
		if (inputValue !== '') {
			this.setState(prevState => {
				const id = uuid();
				const newItemObject = {
					[id]: {
						id,
						isCompleted: false,
						text: inputValue,
						createdAt: Date.now()
					}
				};
				const newState = {
					...prevState,
					inputValue: '',
					allItems: {
						...prevState.allItems,
						...newItemObject
					}
				};
				this.saveItems(newState.allItems);
				return { ...newState };
			});
		}
	};

	deleteItem = id => {
		this.setState(prevState => {
			const allItems = prevState.allItems;
			delete allItems[id];
			const newState = {
				...prevState,
				...allItems
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	completeItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: true
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	incompleteItem = id => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				allItems: {
					...prevState.allItems,
					[id]: {
						...prevState.allItems[id],
						isCompleted: false
					}
				}
			};
			this.saveItems(newState.allItems);
			return { ...newState };
		});
	};

	deleteAllItems = async () => {
		try {
			await AsyncStorage.removeItem('Todos');
			this.setState({ allItems: {} });
		} catch (err) {
			console.log(err);
		}
	};

	saveItems = newItem => {
		const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
	};

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
          const { inputValue, loadingItems, allItems} = this.state;
          const subtitle= "What's Next?  ";
          return (
               <Container style={styles.bg}>
                    <View style = {{flex: 0.2, heigth: 30, marginTop: 20, justifyContent: 'flex-start'}}>
                         <Text style = {styles.subtitleText}>    {subtitle}</Text>

                              <Input
                                   style = {styles.input}
                                   placeholder = "Type here to add note"
                                   placeholderTextColor = "#c4c4c4"
                                   autocapitalize ="sentences"
                                   underlineColorAndroid = "transparent"
                                   returnKeyType="done"
                                   multiline = {true}
                                   blurOnSubmit={true}
                                   inputValue={inputValue}
                                   onChangeText={this.newInputValue}
                                   onSubmitEditing={this.onDoneAddItem}
                              />


                    </View>
                    <View style = {{flex: -1, heigth: 30, marginTop: 20, justifyContent: 'stretch'}}>
                         <Text style={styles.subtitleText}>Recent Tasks</Text>
                    </View>
                    {loadingItems ? (
                         <Content>
                              {Object.values(allItems)
                                   .reverse()
                                   .map(item => (
                                        <Task
                                             key={item.id}
                                             {...item}
                                             deleteItem={this.deleteItem}
                                             completeItem={this.completeItem}
                                             incompleteItem={this.incompleteItem}
                                        />
                                   ))
                              }
                         </Content>
                    ) : (
                         <ActivityIndicator size = "large" color = 'black' />
                    )}
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
          this.saveTasks();
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
