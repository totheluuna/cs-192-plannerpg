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

* 2/16/19 - Angelo Vincent R. Delos Santos - Added constructor, props, TextInput, and the functions
*          called on button presses, checkbox
* 2/22/19 - Rheeca Guion - Added UI, styles
*/

/*
* File creation date: Feb. 16, 2019
* Development group:
* Client group:

* Purpose: Defines the individual instance of a task

* Variables:
*   taskText: contains task text
*/

import React from 'react';
import {
     View,
     TextInput,
     TouchableOpacity,
     TouchableWithoutFeedback,
     Keyboard,
     StyleSheet,
     AsyncStorage,
} from 'react-native';

import {Container, Header, Content, Card, CardItem, ListItem, CheckBox, Text, Body, Left, Right, Button, Icon} from 'native-base';

export default class Task extends React.Component {
     constructor (props){
          super(props);
          this.state = {
               taskText: "",
          };

     }

     onToggle = () => {
		const { isCompleted, id, completeItem, incompleteItem } = this.props;
		if (isCompleted) {
			incompleteItem(id);
		} else {
			completeItem(id);
		}
          this.setState({checked: !this.state.checked})
	};

     render (){
          const { text, deleteItem, id, isCompleted } = this.props;

          return (
               <View>
                    <Card flexDirection='row' style={ styles.card }>
                         <CardItem style={{flex: 1}}>
                              <CheckBox
                                   checked={this.state.checked}
                                   onPress={this.onToggle}
                              />
                         </CardItem>
                         <CardItem style={{flex: 7}}>
                              <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                                   <Text
                                        style={[
                                             isCompleted ?
                                                  {
                                                       color: '#c4c4cc',
                                                       textDecorationLine: 'line-through'
                                                  } : {color: '#555555'}
                                        ]}>
                                        {text}
                                   </Text>
                              </View>
                         </CardItem>
                         <CardItem style={{flex: 1}}>
                              <TouchableOpacity button onPressOut={() => deleteItem(id)} >
                                   <Icon name='trash' style={{color: '#000'}}/>
                              </TouchableOpacity>
                         </CardItem>
                    </Card>
               </View>
          )
     }
}

const styles = StyleSheet.create({
     card: {
          paddingBottom: 0.1,
          elevation: 0.1,
          backgroundColor: '#C1FFF0',
     },
});
