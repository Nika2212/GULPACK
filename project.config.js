module.exports = {
    // Developing Mode
    mode: "development",
    // Assets Input Source Path
    scriptPath: "./src/script",
    stylePath: "./src/style",
    imagePath: "./src/image",
    fontPath: "./src/image",
    // Assets Entry Filename (without extension)
    scriptEntryName: "entry",
    styleEntryName: "entry",
    // Assets Output Filename (without extension)
    outputScriptName: "bundle",
    outputStyleName: "style",
    // Vendor Assets Source Path (compiles in alphabetic order if file array isn't specified)
    vendorScriptPath: "./src/third-party/js",
    vendorStylePath: "./src/third-party/css",
    vendorScriptFileArray: [],
    vendorStyleFileArray: [],
    // Vendor Assets Output Filename (without extension)
    vendorScriptName: "lib",
    vendorStyleName: "lib",
    // Build Distribute Path
    distPath: "./dist",
    // Use TypeScript
    useTypescript: false,
    // Live-Server Properties
    port: 4200,
    useHttps: false
}

