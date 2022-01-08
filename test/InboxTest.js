const IPFSInbox = artifacts.require("./Inbox.sol");
contract("IPFSInobx",accounts => {
    it("emit event when you send ipfs address",async()=>{
        // wait for the contract
        const ipfsInbox = await IPFSInbox.deployed();

        // set variable to false and get event listener
        eventEmitted = false;

        // const event = ()
        await ipfsInbox.ipfsSent((err,res)=>{
            eventEmitted = true;
        });

        // call the contract function which sends ipfs adderss 
        await ipfsInbox.sendIPFS(accounts[1],"sampleAddress", { from: accounts[0] });
        assert.equal(eventEmitted, true,"sending an IPFS request does not emit an event");
    });
    
});