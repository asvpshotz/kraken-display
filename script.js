const API = "192.168.2.11:8085/data.json";

function findSensor(obj, name) {
    if (obj.Text === name && obj.Value) {
        return obj.Value;
    }

    if (obj.Children) {
        for (const child of obj.Children) {
            const result = findSensor(child, name);
            if (result) return result;
        }
    }

    return null;
}

async function updateSensors() {
    try {
        const response = await fetch(API);
        const data = await response.json();

        let cpuTemp = findSensor(data, "CPU (Tctl/Tdie)");
        let gpuTemp = findSensor(data, "GPU Core");
        let cpuLoad = findSensor(data, "CPU Total");

        if (cpuTemp) {
            cpuTemp = parseFloat(cpuTemp);
            document.querySelector(".temperature").textContent =
                Math.round(cpuTemp) + "°";
        }

        if (cpuLoad) {
            cpuLoad = parseFloat(cpuLoad);

            document.querySelector(".fill").style.width =
                Math.min(cpuLoad,100) + "%";

            document.querySelector(".stats").innerHTML =
                "LOAD&nbsp;&nbsp;" + Math.round(cpuLoad) + "%";
        }

    } catch(error) {
        console.log(error);
    }
}

updateSensors();
setInterval(updateSensors, 2000);
