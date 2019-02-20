/*
* MIT License

* Copyright (c) 2019 Datuluna Ali G. Dilangalen

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
 * 2/20/19 - Rheeca Guion - Added tab navigation
 */

/*
 * File creation date: Feb. 3, 2019
 * Development group:
 * Client group:

 * Purpose: Index of the app. Contains navigation for Corkboard
 *   and Tasklist

 * Variables:
 *
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, Text, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import variable from './native-base-theme/variables/variable';
import { Font, AppLoading } from 'expo';
import Corkboard from './app/components/Corkboard';
import Tasklist from './app/components/Tasklist';
import Styles from './app/components/Stylesheet';

class Home extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(variable)}>
        <Container>
          <Header />
          <Tabs renderTabBar={()=> <ScrollableTab />}>
            <Tab heading="Corkboard">
              <Corkboard />
            </Tab>
            <Tab heading="Tasklist">
              <Tasklist />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}


export default class App extends React.Component {
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
          /*
           * loadFonts
           * Creation date: Feb. 6, 2019
           * Purpose: Loads a custom font (error fix for incompatible fonts for android devices)
           */
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
               <Home/>
          );
     }
}
