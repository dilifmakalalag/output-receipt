document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("strukForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    printStruk();
  });
});

function printStruk() {
  let formElements = document.querySelectorAll("#strukForm input");
  let formData = {};
  formElements.forEach((el) => {
    let label = document
      .querySelector(`label[for="${el.id}"]`)
      .innerText.trim();
    let value = el.value.trim();
    formData[el.id] = value;
  });

  // Format the date to DD/MM/YYYY
  if (formData.date) {
    let dateParts = formData.date.split("-");
    formData.date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }

  let outputHTML = ``;

  // Struktur output yang dijabarkan
  outputHTML += `
        <div class="container">
            ${generateSingleRow("Date", formData.date, true)}
            ${generateSingleRow("Lokasi", formData.location)}
            ${generateSingleRow("IATA", formData.iata, true)}
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin-left:1.5mm;margin-top:3mm;margin-bottom:3mm;">
            <div class="column" style="flex: 1; margin-right: 10px;font-size:12px;">
                ${generateRow("Customer", formData.customer)}
          <div class="row">
          <div class="label">
          <p style="display: inline-block; transform: scaleX(0.8); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
            Customer Number
          </p>
          </div>
          <div class="separator">:</div>
          <div class="value">
          <p style="display: inline-block; transform: scaleX(0.5); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
          ${formData.customerNumber} 
          </p>
          </div>
        </div>
            </div>
        </div>
        <div class="row" style="display: flex; align-items: center;margin-left: 1.5mm; padding: 0; font-size:25px;margin-bottom:3mm;width:3mm;">
          <div class="label">
          <p style="display: inline-block; transform: scaleX(0.5); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
            Aircraft Reg
          </p>
          </div>
          <div class="separator">:</div>
          <div class="value">
          <p style="display: inline-block; transform: scaleX(0.5); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
          ${formData.aircraftReg} 
          </p>
          </div>
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin:1.35mm;margin-bottom:3mm;">
            <div class="column" style="flex: 1; margin-right: 10px;font-size:9px;">
                ${generateRow("Aircraft Type", formData.aircraftType)}
                ${generateRow("Flight Number", formData.flightNumber)}
                ${generateRow("Next Dest.", formData.nextDest)}
            </div>
            <div class="column" style="flex: 1; margin-right: 10px;font-size:9px;">
                ${generateRow("", "", false)}
                ${generateRow("Flight Type", formData.flightType)}
                ${generateRow("", "", false)}
            </div>
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin:1.35mm;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1; margin-right: 0px;font-size:9px;">
                ${generateRow("Service Type", formData.serviceType)}
                ${generateRow("Product", formData.product)}
                ${generateRow("Parking Stand", formData.parkingStand)}
            </div>
            <div class="column" style="flex: 1; margin-right: 0px;font-size:9px;">
                ${generateRow("", "", false)}
                ${generateRow("Vehicel Num", formData.vehicleNumber)}
                ${generateRow("Hydrant Pit", formData.hydrantPit)}
                ${generateRow("", "", false)}
            </div>
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin:1.35mm;margin-right:0;margin-top:0;padding-top:0;margin-bottom:3mm;">
            <div class="column" style="flex: 1; margin-right: 0px;font-size:9px;">
                ${generateRow("Operator", formData.operator)}
            </div>
        </div>
        <p style="text-align:left;margin-left:1.5mm;font-size:12px;margin-bottom:0;padding-bottom:0;">TIMES</p>
        <div class="container" style="display: flex; flex-direction: row; font-size:12px;margin-left:1.5mm;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;text-align:left;">
            <div class="column" style="flex: 1;">
                Task<br>Confirmed <br> ${formData.taskConfirmed}
            </div>
            <div class="column" style="flex: 1;">
                Task <br> In Position <br> ${formData.truckInPosition}
            </div>
            <div class="column" style="flex: 1;">
                Fueling <br> Started (X)<br> ${formData.fuelingStarted}
            </div>
            <div class="column" style="flex: 1;">
                Fueling <br> Completed (Y)<br> ${formData.fuelingCompleted}
            </div>
        </div>
        <p style="text-align:left;margin-left:1.5mm;font-size:12px;margin-top:0;padding-top:0;">Fueling Time (Y-X)  MIN</p>
        <div class="container" style="margin-left:1.5mm;">
        
            ${generateRow("Meter Reg. Num", formData.meterRegNum)}
            ${generateRow("Totaliser After", formData.totaliserAfter)}
            ${generateRow("Totaliser Before", formData.totaliserBefore)}
            ${generateRow("Meter Totalisator", formData.meterTotalisator)}
        </div>
        <div style="margin-top: 0px;padding-top:0;margin-left:1.5mm;font-size:10px;">
          <p>--------------------------------------------------------------------------------------------------------------</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p style="font-size:14px;">QUANTITY</p>
            </div>
            <div style="text-align:right;margin-right:4mm;font-size:14px;">
              <p>${formData.meterTotalisator} L</p>
            </div>
          </div>
          <p>--------------------------------------------------------------------------------------------------------------</p>
        </div>
        <div class="container">
        ${generateSingleRow("Notes", formData.notes)}
        ${generateSingleRow("Comment", formData.comments)}
        </div>
        <p style="text-align:left;margin-left:1.5mm;font-size:12px;margin-bottom:0;padding-bottom:0;">FUELING SAMPLE</p>
        <div class="container" style="margin-top:0;padding-top:0;">
        ${generateSingleRow("From", formData.fromFuelSample)}
        ${generateSingleRow("Taken", formData.takenFuelSample)}
        </div>
        <div style="margin-top: 0px;padding-top:0;margin-left:1.5mm;font-size:12px;">
          <p>=========================================== <br> =========</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p>CERTIFIED THAT THE FUEL DELIVERED: <br> - CONFORM TO DEFENCE STANDARD 91-091 LATEST ISSUE OR SK <br> DIRJEN MIGAS <br> - COMPLETELY CHECKED IN ACCORDANCE WITH PERTAMINA QUALITY <br> CONTROL PROCEDURE <br> - PARTICULATE MATTER & UNDISSOLVED WATER AT NORMAL AMBIENT <br> TEMPERATURE</p>
            </div>
          </div>
        </div>
        <p style="text-align:left;margin-left:1.5mm;font-size:12px;margin-bottom:0;padding-bottom:0;">PERTAMINA's SIGN</p>
        <div class="container" style="margin-top:0;padding-top:0;">
        ${generateSingleRow("Name", formData.pertaminaSign)}
        </div>
        <br>
        <br>
        <br>
        <div style="margin-top: 0px;padding-top:0;margin-left:1.5mm;font-size:12px;">
          <p>------------------------------------------------------------------------------------------</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p>I ACKNOWLEDGE RECEIPT OF THE PRODUCT AS STATED A NO RESPONSIBLE <br> FOR FUTHER OPERATION AND SAFETY OF THE AIRCRAFT</p>
            </div>
          </div>
          <p>FUEL SYSTEM</p>
        </div>
        <p style="text-align:left;margin-left:1.5mm;font-size:12px;margin-bottom:0;padding-bottom:0;">CUSTOMER's SIGN</p>
        <div class="container" style="margin-top:0;padding-top:0;">
        ${generateSingleRow("Name", formData.customerSign)}
        </div>
        <br>
        <br>
        <br>
        <div style="margin-top: 0px;padding-top:0;margin-left:1.5mm;font-size:12px;">
          <p>------------------------------------------------------------------------------------------</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p>${formData.date} ${formData.timeNote}</p>
            </div>
            <div style="margin-right:4mm;">
              <p>Customer Copy</p>
              <p></p>
            </div>
          </div>
        </div>
        <br>
        <h5 style="display:inline;margin-bottom:3mm;padding-bottom:3mm;">THANK YOU</h5>
        <br>
`;

  function generateRow(label, value, separator = true) {
    const separatorHTML = separator ? '<div class="separator">:</div>' : "";
    return `
      <div class="row">
        <div class="label">${label}</div>
        ${separatorHTML}
        <div class="value">${value}</div>
      </div>
    `;
  }

  function generateSingleRow(label, value, isLarge = false) {
    const fontSize = isLarge ? "12px" : "12px";
    const fontWeight = isLarge ? "bold" : "normal";
    return `
      <div class="row" style="font-size: ${fontSize}; font-weight: ${fontWeight};margin-left:1.5mm;">
        <div class="label">${label}</div>
        <div class="separator">:</div>
        <div class="value">${value}</div>
      </div>
    `;
  }

  // Fetch gambar logo dari JSON
  fetch("image.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const base64Image = data.imageBase64;

      let printContent = `
        <html>
          <head>
            <title>Cetak Struk</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 0px; text-align: center; }
              .logo { width: 150px; margin-bottom: 10px; }
              hr { border: 1px solid #000; margin: 10px 0; }
              p { margin: 5px 0; text-align: left; }
              .container { display: flex; flex-direction: column; font-size: 12px; margin: 1; padding: 0px; }
              .row { display: flex; justify-content: space-between; align-items: center; padding: 0; margin: 0; white-space: nowrap;font-size: 12px; }
              .label { width: 80px; text-align: left; }
              .separator { width: 10px; text-align: center; }
              .value { flex: 1; text-align: left; }
              .column { display: flex; flex-direction: column; flex: 1; }
            </style>
          </head>
          <body>
            <img style="margin-bottom:0;padding-bottom:0;" src="${base64Image}" alt="Logo" class="logo"> <br>
            <p style="margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;font-size:30px;text-align: center; ">DELIVERY RECEIPT</p>
            <h4 style="margin-top:0;padding-top:0;">${formData.kode}</h4>
            <div style="margin-left:1mm;width:100%;">
            ${outputHTML}
            </div>
          </body>
        </html>
      `;

      let printWindow = window.open("", "", "width=800,height=500");
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    })
    .catch((error) => console.error("Error loading image:", error));
}
