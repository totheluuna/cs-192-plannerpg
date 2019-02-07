import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Button, Icon} from 'native-base';

const content = [
	{key: 'Devin'},
	{key: 'Jackson'},
	{key: 'James'},
	{key: 'Joel'},
	{key: 'John'},
	{key: 'Jillian'},
	{key: 'Jimmy'},
	{key: 'Julie'},
]

const memoArray = [
	{title: "CS 192", content: {content}},
	{title: "CS 192", content: {content}},
	{title: "CS 192", content: {content}},
];

// <FlatList
// 	data={[
// 		{key: 'Devin'},
// 		{key: 'Jackson'},
// 		{key: 'James'},
// 		{key: 'Joel'},
// 		{key: 'John'},
// 		{key: 'Jillian'},
// 		{key: 'Jimmy'},
// 		{key: 'Julie'},
// 	]}
// 	renderItem={({item}) => <Text>{item.key}</Text>}
// />

export default class Memo extends Component {
	render() {
    return (
				<Card>
					<CardItem header >
						<Text>CS 192 Memo Title</Text>
					</CardItem>
					<CardItem button onPress={() => alert("This is Card Body")}>
						<Body>
							<Text> Write your memos here.</Text>
						</Body>
					</CardItem>
					<CardItem footer>
						<Left>
							<Button transparent>
								<Icon name='heart-empty' style={{color: '#000'}}/>
							</Button>
							<Button transparent>
								<Icon name='trash' style={{color: '#000'}}/>
							</Button>
						</Left>
					</CardItem>
				</Card>
		);
	}
}
