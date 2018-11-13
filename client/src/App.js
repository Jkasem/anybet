import React, { Component } from "react";
import Web3 from "web3";

class App extends Component {
  state = {
    isConnected: false,
    error: "",
  };

  componentWillMount() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Acccounts always exposed
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3.eth.net.getNetworkType().then(res => {
        if (res !== "ropsten") {
          this.setState({
            error:
              "Wrong network detected. Please switch to the Ropsten test network.",
          });
        } else {
          console.log("Connected to the Ropsten test network.");
          this.setState({ isConnected: true });
        }
      });
    }
    // Non-dapp browsers...
    else {
      this.setState({
        error:
          "Non-Ethereum browser detected. You should consider trying MetaMask!",
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Is connected?:</h2>
        <br />
        {this.state.isConnected ? "Connected to local node" : this.state.error}
      </div>
    );
  }
}
export default App;
