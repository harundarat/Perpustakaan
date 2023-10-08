import { ethers } from "hardhat";
import { Perpustakaaan } from "../typechain";

async function main(){
    
    const perpustakaan = await ethers.getContract<Perpustakaaan>("Perpustakaan");

    //get signers
    const [admin] = await ethers.getSigners();

    //dummy data
    const dummyData = {
        isbn: "100-100",
        title: "Buku Hardhat",
        year: 2003,
        writer: "Harun Al Rasyid"
    }

    // add book
    const addBook = await perpustakaan
        .connect(admin)
        .addBook(dummyData.isbn, dummyData.title, dummyData.year, dummyData.writer);
    await addBook.wait();

    console.log("Data berhasil ditambahkan");
}

main().catch((err) => {
    console.log("error =", err);
    process.exitCode = 1;
})