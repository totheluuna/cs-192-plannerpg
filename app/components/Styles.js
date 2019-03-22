/*
* MIT License
* Copyright (c) 2019 Rheeca S. Guion
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
 * 2/22/19 - Rheeca Guion - Added bg
 * 3/21/19 - Rheeca Guion - Added editSchedule, cell, weekCell
*/

/*
 * File creation date: Feb. 22, 2019
 * Development group:
 * Client group:
 * Purpose: Contains the styles
 * Variables:
 */

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
     bg: {
          backgroundColor: '#FBFBFF',
          paddingHorizontal: 20,
     },
     editSchedule: {
          margin: 20,
     },
     cell: {
          backgroundColor: '#C1FFF0',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 1,
          height: Dimensions.get('window').width / 9,
     },
     weekCell: {
          backgroundColor: '#FBFBFF',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 1,
          height: Dimensions.get('window').width / 9,
     }
});
