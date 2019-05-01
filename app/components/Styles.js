/*
* MIT License
* Copyright (c) 2019 Rheeca S. Guion, Angelo Vincent R. Delos Santos
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
 * 4/01/19 - Rheeca Guion - Added editMemo, editTask, task
 * 4/04/19 - Vince Delos Santos - added everything from displayMemos to taskTextStyle
 * 4/20/19 - Datuluna Ali Dilangalen - added memosTitleView, memosTitle, memosContainer
 * 4/30/19 - Rheeca Guion - Added highlightedCell
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
     editSchedule: {
          margin: 20,
     },
     editMemo: {
          margin: 20,
     },
     editTask: {
          margin: 20,
     },
     cell: {
          backgroundColor: '#645f89',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 1,
          height: Dimensions.get('window').width / 10,
     },
     highlightedCell: {
          backgroundColor: '#39A2AE',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 1,
          height: Dimensions.get('window').width / 10,
     },
     selectedCell: {
          backgroundColor: '#eeaf36',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 1,
          height: Dimensions.get('window').width / 10,
     },
     weekCell: {
          backgroundColor: '#684632',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          margin: 1,
          height: Dimensions.get('window').width / 10,
     },

     displayMemos: {
          flexWrap: 'wrap',
          flexDirection: 'row',
     },
     displayNoMemos: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     displayNoMemosText: {
          color: '#445C70',
          fontSize: 20,
          fontWeight:'bold',
     },
     corkboardBase: {
          backgroundColor: 'black',
     },
     corkboardBackground: {
          flex: 1,
          width: null,
          height: null,
     },
     corkboardBackgroundPosition: {
          paddingHorizontal: 20,
          paddingVertical: 10,
     },
     corkboardHeader: {
          backgroundColor:'#5e3023',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 7,
          height: 80,
     },
     fabPosition: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
     },
     fabPosition: {
         flexDirection: 'column',
         justifyContent: 'flex-end'
     },
     fabColor: {
          backgroundColor:'#c08552',
     },
     fabColor2: {
          backgroundColor:'#7289da',
     },
     fabColor3: {
        backgroundColor: '#73f218'
     },
     fabStyle: {
          color: 'white',
          justifyContent: 'center',
          fontSize: 30,
     },
     memoHeader: {
          justifyContent: 'center',
          backgroundColor:'#895737',
          height: 15,
     },
     memoHeader1: {
         justifyContent: 'center',
         backgroundColor:'#a1d1a1',
         height: 15,
     },
     memoStyle: {
          backgroundColor:'#f3e9dc',
          width: 180,
     },
     memoStyle1: {
         backgroundColor:'#e2eae2',
         width: 360,
     },
     memosTitleView: {
         backgroundColor: "#313131",
         paddingLeft: 20
     },
     memosTitle: {
         fontSize: 30,
         fontWeight: 'bold',
         color: '#ffffff',
         paddingTop: 20
     },
     memosContainer: {
         flex: 1,
         backgroundColor: '#313131',
         marginTop: 20,
         marginLeft: 20,
         marginRight: 20,
     },
     tasklistBase: {
          paddingTop: 24,
          //flexDirection:'row',
          backgroundColor:'#000000',
     },
     tasklistHeaderText: {
          fontSize:20,
          fontWeight:'bold',
          color:'white',
     },
     tasklistHeader: {
          //flexDirection:'column',
          //height: 75,
          alignItems:'center',
          justifyContent:'flex-start',
          backgroundColor: 'black',
     },
     tasklistBackground: {
          flex: 1,
          backgroundColor: '#2c2f33',
          width: null,
          height: null,
     },
     displayTasks: {
          paddingHorizontal: 20,
          paddingVertical: 5,
          backgroundColor:'transparent',
     },
     displayNoTasks: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
     },
     displayNoTasksText: {
          color: 'black',
          fontSize:20,
          fontWeight:'bold',
     },
     taskStyle: {
          backgroundColor: '#99aab5',
          paddingHorizontal: 5,
          paddingBottom: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
     },
     checkboxStyle: {
          flex: 1,
          backgroundColor:'transparent',
     },
     taskCardStyle: {
          backgroundColor: 'transparent',
     },
     taskTextStyle: {
          fontSize: 18,
     },
});
