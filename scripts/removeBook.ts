import { ethers } from "hardhat";
import { Perpustakaaan } from "../typechain";

async function main(){
    
    const perpustakaan = await ethers.getContract<Perpustakaaan>("Perpustakaan");

    //get signers
    const [admin] = await ethers.getSigners();

    //dummy data
    const dummyData = {
        isbn: "100-100",
        // title: "Buku Hardhat",
        // year: 2003,
        // writer: "Harun Al Rasyid"
    }

    // remove book
    const removeBook = await perpustakaan
        .connect(admin)
        .removeBook(dummyData.isbn);
    await removeBook.wait();

    console.log("Book removed");
}

main().catch((err) => {
    console.log("error =", err);
    process.exitCode = 1;
})