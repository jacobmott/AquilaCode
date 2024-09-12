const fs = require("fs");

// Function to parse the convex sub polygons data
function parseConvexSubPolygons(input) {
  const startIndex = input.indexOf("Convex sub polygons:");
  if (startIndex === -1) {
    return [];
  }

  const relevantData = input.slice(startIndex + "Convex sub polygons:".length);
  const lines = relevantData
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  return lines.map((line) => {
    const numbers = line.match(/-?\d+\.?\d*/g);
    const result = numbers ? numbers.map(Number) : [];
    result.push(result[0], result[1]);
    return result;
  });
}

// Read the input file
fs.readFile(
  "../Assets/PhysicsEditor/ship3-matter-physics2-plaintext.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Parse the data
    const polygons = parseConvexSubPolygons(data);

    // Create an object with the parsed data
    const output = {
      convexSubPolygons: polygons,
    };

    // Convert the object to JSON
    const jsonOutput = JSON.stringify(output, null, 2);

    // Write the JSON to a file
    fs.writeFile("convex_sub_polygons.json", jsonOutput, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("JSON file has been saved as convex_sub_polygons.json");
      }
    });
  },
);
