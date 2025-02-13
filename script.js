// QR Code Scanner
const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
    { facingMode: "environment" }, // Use back camera
    {
        fps: 10,
        qrbox: 250,
    },
    (decodedText) => {
        // Handle QR Code scan result
        handleQRScan(decodedText);
    },
    (errorMessage) => {
        console.error(errorMessage);
    }
).catch((err) => {
    console.error(err);
});

function handleQRScan(decodedText) {
    // Example: decodedText = "PrefectID:123"
    const prefectID = decodedText.split(":")[1];
    fetchPrefectDetails(prefectID);
}

function fetchPrefectDetails(prefectID) {
    // Fetch prefect details from database (Firebase or local JSON)
    const prefect = {
        id: prefectID,
        name: "John Doe",
        duty: "Morning Duty",
    };

    // Display prefect details
    document.getElementById("prefect-name").innerText = `Name: ${prefect.name}`;
    document.getElementById("prefect-duty").innerText = `Duty: ${prefect.duty}`;

    // Mark attendance based on time
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
        markMorningDuty(prefectID);
    } else {
        markAfternoonDuty(prefectID);
    }
}

function markMorningDuty(prefectID) {
    // Save morning duty time to database
    console.log(`Morning Duty Marked for Prefect ID: ${prefectID}`);
}

function markAfternoonDuty(prefectID) {
    // Save afternoon duty time to database
    console.log(`Afternoon Duty Marked for Prefect ID: ${prefectID}`);
}