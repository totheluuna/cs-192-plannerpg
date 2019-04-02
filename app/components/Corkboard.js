/*
* MIT License
* Copyright (c) 2019 Datuluna Ali G. Dilangalen, Rheeca S. Guion, Angelo Vincent R. Delos Santos
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
 * 2/16/19 - Angelo Vincent R. Delos Santos - Added memoCurrId to constructor, fixed the
            delete functionality to delete the proper memo (fixed memo mapping in Render,
            modified addMemo, modified deleteMemo)
 * 2/18/19 - Rheeca Guion - renamed to Corkboard
 * 4/01/19 - Rheeca Guion - added the findObjectById function, created the functions
 *                           editMemo, updateMemo so memos can be updated
 *                        - had memoArray hold all the memo details, changed addMemo and
 *                            deleteMemo to account for this
 *                        - fixed saveMemos and getMemos so data can be stored in
 *                           AsyncStorage
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
import Memo from './Memo';
import EditMemo from './EditMemo';
import styles from './Styles';

export default class Corkboard extends Component {
     constructor (props){
          super(props);
          this.state = {
               memoArray: [],
               memoCurrId: 0,
          };
     }

     componentDidMount (){
          this.getMemos();
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

     render (){
          let memos = this.state.memoArray.map((memoItem) => {
               return <Memo
                    id={memoItem.id}
                    title={memoItem.title}
                    text={memoItem.text}
                    editMethod={ () => this.editMemo(memoItem.id) }
               />
          });

          return (
               <Container style={styles.bg}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                         <Button onPress={ this.addMemo.bind(this) } transparent >
                              <Icon name='add' style={{color: '#E2858D'}}/>
                         </Button>
                    </View>
                    <Content>
                         {this.displayMemos(memos)}
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
          let newMemo = {
               id: this.state.memoCurrId,
               title: "",
               text: "",
          };

          let arr = this.state.memoArray;
          arr.push(newMemo);
          this.setState({ memoCurrId: this.state.memoCurrId + 1 });
          this.setState({ memoArray: arr });
     }

     editMemo (id){
          /*
           * editMemo
           * Creation date: Apr. 1, 2019
           * Purpose: Edits a memo
           */
          let memo = this.findObjectById(this.state.memoArray, id);
          if (memo) {
               this.props.navigation.navigate('EditMemo', {
                    id: id,
                    title: memo.title,
                    text: memo.text,
                    onUpdate: this.updateMemo.bind(this),
                    onDelete: this.deleteMemo.bind(this)
               });
          }
     }

     updateMemo (id, title, text) {
          /*
          * updateMemo
          * Creation date: Apr. 1, 2019
          * Purpose: Updates the memo in the state
          */
          let arr = this.state.memoArray;
          let newArr = arr.map((memoItem) => {
               if(memoItem.id == id) {
                    memoItem.title = title;
                    memoItem.text = text;
               }
               return memoItem;
          });
          this.setState({ memoArray: newArr });
          this.saveMemos();
     }

     saveMemos = async() => {
          /*
           * saveMemos
           * Creation date: Feb. 5, 2019
           * Purpose: Save memos in AsyncStorage
           */
          try {
               await AsyncStorage.setItem('memoArray', JSON.stringify(this.state.memoArray));
          } catch (error) {
               alert(error);
          }
          try {
               await AsyncStorage.setItem('memoCurrId', JSON.stringify(this.state.memoCurrId));
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
          } catch (error) {
               alert(error);
          }
          try {
               let temp = await AsyncStorage.getItem('memoCurrId');
               let parsed = JSON.parse(temp);
               if(parsed) {
                    this.setState({memoCurrId: parsed})
               }
          } catch (error) {
               alert(error);
          }
     };

     deleteMemo (id){
          /*
           * deleteMemo
           * Creation date: Feb. 5, 2019
           * Purpose: Deletes a memo
           */
          let memo = this.findObjectById(this.state.memoArray, id);
          if (memo){
               let arr = this.state.memoArray;
               arr.splice(arr.indexOf(memo), 1);
               this.setState({memoArray: arr});
          }
     }
}
