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
               taskId: 0,
               taskText: "",
          };
     }

    render (){
          return (
            <ListItem>
            <CheckBox 
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <Text>{" "}</Text>
              <Body>
                <TextInput
                         placeholder='Task'
                         value={this.state.taskText}
                         onChangeText={(text) => this.setState({taskText: text})}/>
              </Body>
            <TouchableOpacity button onPress={this.props.deleteMethod}>
              <Icon name='close' style={{color: '#000'}}/>
            </TouchableOpacity>
            </ListItem>
          )
    }
}