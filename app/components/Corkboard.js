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

 * 2/07/19 - Datuluna Dilangalen - Added UI
 * 2/07/19 - Rheeca Guion - Added constructor, addMemo, editMemo, deleteMemo, saveMemos,
            getMemos, functions called on button presses, memos array to display
            memos
 * 2/08/19 - Rheeca Guion - add comments, cleanup
 * 2/16/19 - Angelo Vincent R. Delos Santos - Added currId to constructor, fixed the
            delete functionality to delete the proper memo (fixed memo mapping in Render,
            modified addMemo, modified deleteMemo)
 * 2/18/19 - Rheeca Guion - renamed to Corkboard
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
     View,
     Text,
     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage
} from 'react-native';
import { Container, Content, Header, Body, Left, Right, Title, Button, Icon, Fab } from 'native-base';
import MemoForm from './MemoForm';
import styles from './Styles';
import uuid from 'uuid/v1';

export default class Corkboard extends Component {
     constructor (props){
          super(props);
          this.doneEditing = this.doneEditing.bind(this)
          this.state = {
               inputTitle: '',
     		inputValue: '',
     		loadingItems: false,
               addButtonPressed: false,
               isSaved: false,
     		allItems: {}

          }
	};

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
                              title: inputTitle,
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

     // componentDidMount (){
     //      this.getMemos();
     // }

     displayMemos (memos) {
          if (memos && memos.length > 0) {
               return (
                    memos
               );
          } else {
               return (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                         <Text style={{ color: '#445C70' }}>There are no memos to show.</Text>
                    </View>
               );
          }
     }

     doneEditing() {
          this.setState({addButtonPressed: !this.state.addButtonPressed})
     }



     render (){
          // let memos = this.state.memoArray.map((num) => {
          //      return <Memo key={num}
          //      deleteMethod={ () => this.deleteMemo(num) }
          //      saveMethod={ () => this.saveMemos }/>
          // });
          const {inputTitle, inputValue, loadingItems, allItems, addButtonPressed} = this.state;
          return (


               <Container style={styles.bg}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                         {addButtonPressed ? (
                              <Button light onPressOut={()=>this.setState({addButtonPressed:false})}>
                                   <Text>Done</Text>
                              </Button>
                         ): (
                              <Button onPress={()=>this.setState({addButtonPressed:true})} transparent >
                                  <Icon name='add' style={{color: '#E2858D'}}/>
                             </Button>
                         )}
                    </View>
                    <Content>
                         {addButtonPressed ? (
                              <MemoForm
                                   title=''
                                   text=''
                                   onDoneAddItem={this.onDoneAddItem}
                                   addButtonPressed={this.addButtonPressed}
                                   doneEditing={this.doneEditing}
                                   isSaved={this.isSaved}/>
                         ): (<View/>)}
                    </Content>
               </Container>
          );
     }

     addMemo (){
       /*
        * addMemo
        * Creation date: Feb. 5, 2019
        * Purpose: Adds a new blank memo
        */
       let newMemo = this.state.currId;
       let arr = this.state.memoArray;
       arr.push(newMemo);
       this.setState({ currId: this.state.currId+1 });
       this.setState({ memoArray: arr });
     }

     editMemo (key, val){
       /*
        * editMemo
        * Creation date: Feb. 5, 2019
        * Purpose: Edits a memo
        */
     }

     deleteMemo (key){
          /*
           * deleteMemo
           * Creation date: Feb. 5, 2019
           * Purpose: Deletes a memo
           */
          this.state.memoArray.splice( this.state.memoArray.indexOf(key), 1);
          this.setState({memoArray: this.state.memoArray});
     }

     saveMemos = async() => {
          /*
           * saveMemos
           * Creation date: Feb. 5, 2019
           * Purpose: Save memos in AsyncStorage
           */
          try {
               await AsyncStorage.setItem('memoArray', JSON.stringify(this.state.memoArray));
               alert("Saved!");
          } catch (error) {
               alert(error);
          }
     };

     getMemos = async () => {
          /*
           * getMemos
           * Creation date: Feb. 5, 2019
           * Purpose: Get saved memos from AsyncStorage
           */
          try {
               let temp = await AsyncStorage.getItem('memoArray');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({memoArray: parsed})
               }
               //alert(parsed);
          } catch (error) {
               alert(error);
          }
     };
}
