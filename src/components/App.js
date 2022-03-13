import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BsSoundwave } from 'react-icons/bs';
import Tracks from './Tracks';
import Track from './Track';

class App extends Component {
  state = {
    id: null
  };

  render() {
    const { id } = this.state;

    return (
      <main>
        <Container>
          <Row className="p-5 text-center">
            <BsSoundwave style={{ fontSize: "5rem" }} />
            <h1 className="display-1">music metadata</h1>
          </Row>
          <Row>
            {!id ? (
              <Tracks setId={id => this.setState({ id })} />
            ) : (
              <Col
                sm={{
                  offset: 4,
                  size: 4
                }}
                xs={{
                  offset: 2,
                  size: 8
                }}
              >
                <Track id={id} unsetId={() => this.setState({ id: null })} />
              </Col>
            )}
          </Row>
        </Container>
      </main>
    );
  }
}

export default App;
