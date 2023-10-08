import { HardhatUserConfig } from 'hardhat/config';
import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-contract-sizer';
import 'hardhat-prettier';


dotenv.config();

const {
  MNEMONIC, MNEMONIC_GANACHE
} = process.env

const config: HardhatUserConfig = {
  solidity: {
    compilers : [
      {
        version: "0.8.13",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
    }
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: MNEMONIC,
        accountsBalance: "100000000000000000000"
      }
    },
  },

  paths: {
    deployments: './deployments',
  },

  contractSizer: {
    alphaSort: false,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  
  typechain: {
    outDir: './typechain',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    dontOverrideCompile: false // defaults to false
  },
};

export default config;
