const CommunityChest = artifacts.require("./CommunityChest.sol");

contract("CommunityChest", accounts => {
  it("can get balance'", async () => {
    const communityChest = await CommunityChest.deployed();

    // get balance
    const balance = await communityChest.getBalance();

    assert.equal(balance, 0, "Can't get balance");
  });
});
