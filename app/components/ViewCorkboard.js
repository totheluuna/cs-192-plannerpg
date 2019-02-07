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
import React, { Component } from 'react';
import {
     Text,
     TextInput,
     Image,
     TouchableOpacity,
     AsyncStorage
} from 'react-native';
import { Container, Content, Header, Body, Left, Right, Title, Button, Icon, Fab, View } from 'native-base';
import Memo from './Memo';
export default class ViewCorkboard extends Component {
     constructor(props) {
          super(props);
          this.state = {
               memoArray: [],
          };
     }

     componentDidMount() {
          this.displayMemos();
     }

     render() {
          let memos = this.state.memoArray.map((val, key) => {
               return <Memo key={key} keyval={key} val={val}
               deleteMethod={ () => this.deleteMemo(key) }
               saveMethod={ () => this.saveMemos }/>
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
                              <Title>Corkboard</Title>
                         </Body>
                              <Right>
                                   <Button onPress={ this.addMemo.bind(this) }>
                                        <Icon name='add' />
                                   </Button>
                              </Right>
                         </Header>
                    <Content>
                    {memos}
                    </Content>
               </Container>
          );
     }

     addMemo() {
          this.state.memoArray.push({
               'memoTitle': "",
               'memoText': "",
               'x': 20,
               'y': 20,
          });
          this.setState({ memoArray: this.state.memoArray });
     }

     editMemo(key, val) {

     }

     deleteMemo(key) {
          this.state.memoArray.splice(key, 1);
          this.setState({memoArray: this.state.memoArray});
     }

     saveMemos = async() => {
          try {
               await AsyncStorage.setItem('memoArray', JSON.stringify(this.state.memoArray));
               alert("Saved!");
          } catch (error) {
               alert(error);
          }
     };

     displayMemos = async () => {
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
