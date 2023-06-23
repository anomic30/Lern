
let arr = [```json{
  "title": "Thermodynamics",
  "syllabus": [
    "Thermodynamics of Solids",
    "Thermodynamics of Fluids",
    "Astrophysical Thermodynamics",
    "Thermodynamics of Black Holes",
    "Applications of Thermodynamics"
  ]
}
```]

async function formatResponse(syllabus) {
    return new Promise(async (resolve, reject) => {
        try {
            const jsonStartIndex = syllabus.indexOf('{'); // Find the index of the first opening curly brace
            const jsonEndIndex = syllabus.lastIndexOf('}'); // Find the index of the last closing curly brace

            const jsonPart = syllabus.substring(jsonStartIndex, jsonEndIndex + 1);
            console.log(JSON.parse(jsonPart));
            resolve(JSON.parse(jsonPart));
        } catch (error) {
            reject(error);
        }
    });
}

console.log(arr[0]);