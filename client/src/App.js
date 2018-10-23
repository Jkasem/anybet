import React, { Component } from "react";
import Web3 from "web3";

class App extends Component {
  state = { isConnected: false };

  componentWillMount() {
    //Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== "undefined") {
      console.log("Found injected web3.");
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
      this.web3.eth.net.getNetworkType().then(res => {
        if (res !== "ropsten") {
          console.error(
            "Wrong network detected. Please switch to the Ropsten test network."
          );
        } else {
          console.log("Connected to the Ropsten test network.");
          this.setState({ isConnected: true });
        }
      });
    } else {
      console.log("No web3? You should consider trying MetaMask!");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Is connected?:</h2>
        <br />
        {this.state.isConnected ? "Connected to local node" : "Not Connected"}
      </div>
    );
  }
}
export default App;
