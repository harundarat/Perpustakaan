import { ethers } from "hardhat";
import { Perpustakaaan } from "../typechain";

async function main(){
    
    const perpustakaan = await ethers.getContract<Perpustakaaan>("Perpustakaan");

    //dummy data
    const dummyData = {
        isbn: "100-100",
        // title: "Buku Hardhat",
        // year: 2003,
        // writer: "Harun Al Rasyid"
    }

    // get book data
    const getBookData = await perpustakaan.getBookData(dummyData.isbn);

    //convert year(bigint) into year(Number)
    const bookData = {
        title: getBookData[0],
        year: Number(getBookData[1]),
        writer: getBookData[2]
    }
    
    console.log(bookData);
}

main().catch((err) => {
    console.log("error =", err);
    process.exitCode = 1;
})