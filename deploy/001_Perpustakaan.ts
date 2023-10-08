import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async ({
    deployments,
    ethers,
  }: HardhatRuntimeEnvironment) => {
    const {deploy} = deployments;
    // const {deployer} = await getNamedAccounts();
    const accounts = await ethers.getSigners();

    const deployer = accounts[0];
  
   // deploy Perpustakaan 
    const perpustakaan = await deploy('Perpustakaan', {
        contract: "Perpustakaaan",
        from: deployer.address,
        args: [],
        gasLimit: 1000000,
    });
    // console.log("Perpustakaan deployed at ", perpustakaan.address);
  };

  func.tags = ["Perpustakaan"];

  export default func;