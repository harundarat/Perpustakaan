import { ethers } from "hardhat";
import { Perpustakaaan } from "../typechain";

async function main(){
    
    const perpustakaan = await ethers.getContract<Perpustakaaan>("Perpustakaan");

    //get signers
    const [admin] = await ethers.getSigners();

    //dummy data
    const dummyData = {
        isbn: "100-100",
        title: "Changed",
        year: 2004,
        writer: "Harun 2"
    }

    // edit book
    const editBook = await perpustakaan
        .connect(admin)
        .editBook(dummyData.isbn, dummyData.title, dummyData.year, dummyData.writer);
    await editBook.wait();

    console.log("Data berhasil di edit");
}

main().catch((err) => {
    console.log("error =", err);
    process.exitCode = 1;
})