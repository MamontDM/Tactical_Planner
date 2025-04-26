
 export const prittyJsonParser = (maps) => {
    const result = maps["ZoneCrashAlpha"];
    const json = JSON.stringify(result.objects, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    window.open(url);
 } 

   


