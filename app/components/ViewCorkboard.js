import React, { Component } from 'react';
import { Container, Content, Header, Body, Left, Right, Title, Button, Icon, Fab, View } from 'native-base';
import Memo from './Memo';
export default class ViewCorkboard extends Component {
  render() {
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
					<Button transparent>
						<Icon name='add' />
					</Button>
				</Right>
				</Header>
				<Content>
					<Memo/>
					<Memo/>
					<Memo/>
					<Memo/>
				</Content>
      </Container>
    );
  }
}
