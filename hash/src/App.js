import logo from './logo.svg';
import './App.css';


import { HashConnect } from 'hashconnect';


import {  HashConnectTypes, MessageTypes } from 'hashconnect';

let accountId =""

let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: null,
    pairedAccounts: []
}

let appMetadata = {
    name: "dApp Example",
    description: "An example hedera dApp",
    icon: "https://www.hashpack.app/img/logo.svg"
}

    
let hashconnect = new HashConnect();

 async function connectWallet() {

   
        //first init and store the private for later
        let initData = await hashconnect.init(appMetadata);
        saveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        let state = await hashconnect.connect();
        saveData.topic = state.topic;

        console.log('\nTopic is: $(saveData.topic)\n')
        
        //generate a pairing string, which you can display and generate a QR code from
        saveData.pairingString = hashconnect.generatePairingString(state, "testnet", false);
        
        //find any supported local wallets
       const result = hashconnect.findLocalWallets();
    //    provider = hashconnect.getProvider(network, topic, accountId);
    //    let balance = await provider.getAccountBalance(accountId);
    //    signer = hashconnect.getSigner(provider);

       console.log(state);

       console.log(result + 'result')
       hashconnect.connectToLocalWallet(saveData.pairingString)


       hashconnect.pairingEvent.once(pairingData => {
        pairingData.accountIds.forEach(id => {
            accountId =id 
            console.log(accountId)
        })
       })
    }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connectWallet}>connect</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
      
        </a>
      </header>
    </div>
  );
}


export default App;


