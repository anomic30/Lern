export const jsonParser = (response) => {
  // Define a regular expression to match the JSON string
  const jsonRegex = /\`\`\`json\n([\s\S]+)\n\`\`\`/;

  // Extract the JSON string using the regular expression
  const match = response.match(jsonRegex);

  if (match && match[1]) {
    // Parse the JSON string
    const jsonStr = match[1];
    const jsonObj = JSON.parse(jsonStr);

    // Log the parsed JSON object
    console.log(jsonObj);
    return jsonObj;
  } else {
    console.error('No JSON object found in the response.');
  }
}

export async function formatResponse(result) {
  return new Promise(async (resolve, reject) => {
      try {
          const jsonString = result.output.replace('```json\n', '').replace('\n```', '').replace('```', '');
          // console.log(jsonString);
          resolve(jsonString);
      } catch (error) {
          reject(error);
      }
  });
}