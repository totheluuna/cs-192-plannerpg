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
import { View } from 'react-native';
import { Container } from 'native-base';
import { Font, AppLoading } from 'expo';
import ViewCorkboard from './app/components/ViewCorkboard';

export default class App extends Component {
     constructor() {
          super();
          this.state = {
               isReady: false
          };
     }
     componentWillMount() {
          this.loadFonts();
     }
     async loadFonts() {
          await Expo.Font.loadAsync({
               Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
               Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
          });
          this.setState({ isReady: true });
     }

     render() {
          if (!this.state.isReady) {
               return <Expo.AppLoading />;
          }

          return (
               <Container>
                    <ViewCorkboard/>
               </Container>
          );
     }
}
