
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      const balance = await provider.getBalance(address);
      setEthBalance(ethers.utils.formatEther(balance));
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", connectWallet);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">Vemint-test-protocol</div>
      <div>
        {walletAddress ? (
          <>
            <div>Address: {walletAddress}</div>
            <div>ETH: {ethBalance}</div>
          </>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </nav>
  );
}
