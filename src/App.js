import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Tracks from './Tracks';

class App extends Component {
  render() {
    return (
      <main>
        <Container>
          <Tracks />
        </Container>
      </main>
    );
  }
}

export default App;
