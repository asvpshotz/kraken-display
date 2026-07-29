const API = "http://localhost:8085/data.json";

async function updateSensors() {
    try {
        const response = await fetch(API);
        const data = await response.json();

        let cpuTemp = data["CPU (Tctl/Tdie)"] || 0;
        let cpuLoad = data["CPU Total"] || 0;

        document.querySelector(".temperature").textContent =
            Math.round(cpuTemp) + "°";

        document.querySelector(".stats").innerHTML =
            "LOAD&nbsp;&nbsp;" + Math.round(cpuLoad) + "%";

        document.querySelector(".fill").style.width =
            Math.min(cpuLoad, 100) + "%";

    } catch (error) {
        console.log("Sensor connection failed", error);
    }
}

updateSensors();

setInterval(updateSensors, 2000);
