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
