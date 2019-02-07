import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Title,
Button, Icon, Fab, View } from 'native-base';
export default class CardHeaderFooterExample extends Component {

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
						<Button transparent>
							<Icon name='trash' />
						</Button>
						<Button transparent>
							<Icon name='more' />
						</Button>
					</Right>
				</Header>


        <Content>
          <Card>
            <CardItem header>
              <Text>CS 199</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This is a test Memo that I want to reflect on the app
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>December 30, 2019</Text>
            </CardItem>
         </Card>

		 <Card>
		   <CardItem header>
			 <Text>THINGS TO BUY</Text>
		   </CardItem>
		   <CardItem>
			 <Body>
			   <Text>
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
				 This is a test Memo that I want to reflect on the app
			   </Text>
			 </Body>
		   </CardItem>
		   <CardItem footer>
			 <Text>December 30, 2019</Text>
		   </CardItem>
		</Card>

		<Card>
		  <CardItem header>
			<Text>THINGS TO BUY</Text>
		  </CardItem>
		  <CardItem>
			<Body>
			  <Text>
				This is a test Memo that I want to reflect on the app
			  </Text>
			</Body>
		  </CardItem>
		  <CardItem footer>
			<Text>December 30, 2019</Text>
		  </CardItem>
	   </Card>



        </Content>
      </Container>
    );
  }
}
