const ky = require('ky');
const htmlparse = require('node-html-parser');

// prob need more await or async below
let done = false;
let allPDFs = [];
let url = 'https://www.ice.gov/foia/odo-facility-inspections'; // i think if i use this url 
let html = getHTML(url); // raw html in string from ky
let aContent = html.querySelectorAll(".field-content > a"); // WORKS, this gets me the entirety of the <a> text content, can use html instead of document right?
while(!done){ // while done = false
    let pdfs = document.querySelector(".field-content > a").getAttribute("href"); // can i use "html" instead of "document" and the aContent variable instead of ".field-content > a" in let pdf?
    let allPDFs = Array.from(pdfs); // do i need to convert the let pdfs into array? or is that already done with let allPDFs and the allPDFs thing below
    // also not sure where htmlparse goes in heree (is it before or after the querySelectorAll stuff?)
    if (!aContent.length){ 
        done = true;
        break;
    }
    allPDFs = allPDFs.concat(pdfs); // adds the array items from parseHTML
}

fs.writeFileSync("ICEpdfs.json", JSON.stringify(allPDFs, undefined, 2)); // I don't actually know what this line is doing beat for beat
// using node's filesystem library, writes prettified json of our array for later processing
// check naming conventions of above?
for (let pdf of allPDFs) {
    downloadPDF(pdf); // using ky. need to figure out own local filename pattern b/c the urls are not consistent (not sure how to do that)
}  