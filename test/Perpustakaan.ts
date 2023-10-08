import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Perpustakaaan } from "../typechain";
import chai from "chai";
import { ethers } from "hardhat";

const {expect} = chai;

describe("Perpustakaan Contract", () => {
    
    let perpustakaan: Perpustakaaan;

    // dummy
    const dummyData = {
        isbn: "100-100",
        title: "Buku Bukuan",
        year: 2003,
        writer: "Harun Al Rasyid"
    }

    let admin: HardhatEthersSigner;
    let notAdmin: HardhatEthersSigner;


    beforeEach(async () => {
        //get signers
        const accounts = await ethers.getSigners();
        admin = accounts[0];
        notAdmin = accounts[1];

        //deploy contracts
        perpustakaan = await (await ethers.getContractFactory("Perpustakaaan"))
        .connect(admin)
        .deploy();

        //Add dummy data
        const addDummy = await perpustakaan.connect(admin).addBook(dummyData.isbn, dummyData.title, dummyData.year, dummyData.writer);
        await addDummy.wait();
    });

    describe("Read Function", () => {

        it("getBookData(): Got the data",async () => {

            const bookData = await perpustakaan.getBookData(dummyData.isbn);

            const bookTitle = bookData[0];

            expect(bookTitle).to.be.equals(dummyData.title);
        });

        it("getBookData(): ISBN not found => Reverted",async () => {
            
            await expect(perpustakaan.getBookData("999-999")).to.be.revertedWith("Book isn't exist");
        });
    });

    describe("Write Function", () => {
        it("addBook(): Admin add book => success",async () => {
           
            //add data
            const addBook = await perpustakaan.connect(admin).addBook("200-200", "Buku Coklat", 1990, "Raditya Dicky");
            await addBook.wait();

            const bookData = await perpustakaan.getBookData("200-200");
            const bookYear = Number(bookData[1]);

            expect(bookYear).to.be.equals(1990);

        });
        
        it("addBook(): Non-Admin add book => Reverted",async () => {
            
            await expect(perpustakaan.connect(notAdmin).addBook(dummyData.isbn, dummyData.title, dummyData.year, dummyData.writer)).to.be.revertedWith("You're not admin");
        });

        it("editBook(): Admin a book => success",async () => {
            
            const editBook = await perpustakaan.connect(admin).editBook(dummyData.isbn, "Changed", 2077, "Dodo");
            await editBook.wait();

            const newData = await perpustakaan.getBookData(dummyData.isbn);

            const oldBookData = {
                title: dummyData.title,
                year: dummyData.year,
                writer: dummyData.writer
            }
            const newBookData = {
                title: newData[0],
                year: Number(newData[1]),
                writer: newData[2]
            }

            expect(newBookData).to.be.not.equals(oldBookData);
        });

        it("editBook(): Admin edit a non-existing book => Reverted",async () => {
            
            await expect(perpustakaan.connect(admin).editBook("999-999", "Kosong", 2077, "Alan")).to.be.revertedWith("Book isn't exist");
        });

        it("editBook(): Non-admin edit a book => Reverted",async () => {
            await expect(perpustakaan.connect(notAdmin).editBook(dummyData.isbn, "Changed", 2077, "Dodo")).to.be.revertedWith("You're not admin");
        });

        it("removeBook(): Admin remove book => success",async () => {
            const removeBook = await perpustakaan.connect(admin).removeBook(dummyData.isbn);
            await removeBook.wait();

            await expect(perpustakaan.getBookData(dummyData.isbn)).to.be.revertedWith("Book isn't exist");
        });

        it("removeBook(): Admin delete a non-existing book => Reverted",async () => {
            const removeBook = await perpustakaan.connect(admin).removeBook(dummyData.isbn);
            await removeBook.wait();

            await expect(perpustakaan.getBookData(dummyData.isbn)).to.be.revertedWith("Book isn't exist");
        });

        it("removeBook(): Non-admin remove book => Reverted",async () => {
            await expect(perpustakaan.connect(notAdmin).removeBook(dummyData.isbn)).to.be.revertedWith("You're not admin");
        });
    })
});