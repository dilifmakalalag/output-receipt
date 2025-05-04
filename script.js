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
        <div class="container" style="width:76mm; padding: 0px; margin-top: 8mm; width: 74mm;">
          <div class="row" style="font-size: 11pt; font-weight: normal; margin: 0mm;">
            <div class="label scaled-text">Date</div>
            <div class="separator">:</div>
            <div class="value scaled-text">${formData.date}</div>
          </div>
          <div class="row" style="font-size: 11pt; font-weight: normal; margin: 0mm;">
            <div class="label">Location</div>
            <div class="separator">:</div>
            <div class="value">${formData.location}</div>
          </div>
          <div class="row" style="font-size: 11pt; font-weight: normal; margin: 0mm;">
            <div class="label scaled-text">IATA</div>
            <div class="separator">:</div>
            <div class="value scaled-text">${formData.iata}</div>
          </div>
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin-top:4mm;margin-bottom:3mm; width: 74mm;">
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
          <p style="display: inline-block; transform: scaleX(1.0); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
          ${formData.customerNumber} 
          </p>
          </div>
        </div>
            </div>
        </div>
        <div class="row" style="display: flex; align-items: center; padding: 0; font-size:27px;margin-top:4mm;">
          <div class="label">
          <p style="display: inline-block; transform: scaleX(0.5); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
            Aircraft Reg
          </p>
          </div>
          <div class="separator">:</div>
          <div class="value">
          <p style="display: inline-block; transform: scaleX(0.9); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
          ${formData.aircraftReg} 
          </p>
          </div>
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin-top:4mm;width: 74mm;">
            <div class="column" style="flex: 1; margin-right: 0px;font-size:9px;width:37mm;">
                ${generateRow("Aircraft Type", formData.aircraftType)}
                <div class="row" style="width:34mm;">
                  <div style="width:40mm;">Flight Number</div>
                  <div style="margin-left:2mm;">:</div>
                  <div >${formData.flightNumber}</div>
                </div>
                ${generateRow("Next Dest.", formData.nextDest)}
            </div>
            <div class="column" style="flex: 1; margin-right: 0px;font-size:9px;">
                ${generateRow("", "", false)}
                ${generateRow("Flight Type", formData.flightType)}
                ${generateRow("", "", false)}
            </div>
        </div>
        <div class="container" style="display: flex; flex-direction: row;margin-top:4mm; width: 74mm;">
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
        <div class="container" style="display: flex; flex-direction: row; width: 74mm;margin-right:0;margin-top:0;padding-top:0;">
            <div class="column" style="flex: 1; margin-right: 0px;font-size:9px;">
                ${generateRow("Operator", formData.operator)}
            </div>
        </div>
        <p style="text-align:left; width: 74mm;font-size:12px;margin-bottom:0;padding-bottom:0;margin-top:4mm;">TIMES</p>
        <div class="container" style="display: flex; flex-direction: row; font-size:12px; width: 74mm;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;text-align:left;">
            <div class="column" style="flex: 1;">
                Task<br>Confirmed <br> ${formData.taskConfirmed}
            </div>
            <div class="column" style="flex: 1;">
                Task <br> In Position <br> ${formData.truckInPosition}
            </div>
            <div class="column" style="flex: 1;">
                Fueling <br> Started (X)<br> ${formData.fuelingStarted}
            </div>
            <div class="column" style="flex: 1;display: inline-block; transform: scaleX(0.9); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
                Fueling <br> Completed (Y)<br> ${formData.fuelingCompleted}
            </div>
        </div>
        <p style="text-align:left; width: 74mm;font-size:12px;margin-top:0;padding-top:0;">Fueling Time (Y-X)  MIN</p>
        <div class="container" style=" width: 74mm;margin-top:4mm;">
         <div class="row">
          <div class="label">
          <p style="display: inline-block; transform: scaleX(0.9); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
            Meter Reg. Num
          </p>
          </div>
          <div class="separator">:</div>
          <div class="value">
          <p style="display: inline-block; transform: scaleX(1.0); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
          ${formData.meterRegNum} 
          </p>
          </div>
        </div>
            ${generateRow("Totaliser After", formData.totaliserAfter)}
            ${generateRow("Totaliser Before", formData.totaliserBefore)}
             <div class="row">
          <div class="label">
          <p style="display: inline-block; transform: scaleX(0.9); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
            Meter Totalisator
          </p>
          </div>
          <div class="separator">:</div>
          <div class="value">
          <p style="display: inline-block; transform: scaleX(1.0); transform-origin: left; white-space: nowrap; margin: 0;padding:0;">
          ${formData.meterTotalisator} 
          </p>
          </div>
        </div>
           
        </div>
        <div style="margin-top: 5mm;margin-bottom:5mm;padding-top:0; width: 74mm;font-size:10px;">
          <p>--------------------------------------------------------------------------------------------------------------</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p style="font-size:16px;font-style:bold;">QUANTITY</p>
            </div>
            <div style="text-align:right;margin-right:4mm;font-size:16px;font-style:bold;">
              <p>${formData.meterTotalisator} L</p>
            </div>
          </div>
          <p>--------------------------------------------------------------------------------------------------------------</p>
        </div>
        <div class="container" style=" width: 74mm;">
        ${generateSingleRow("Notes", formData.notes)}
        ${generateSingleRow("Comment", formData.comments)}
        </div>
        <p style="text-align:left; width: 74mm;font-size:12px;margin-bottom:0;padding-bottom:0;margin-top:5mm;">FUELING SAMPLE</p>
        <div class="container" style="margin-top:0;padding-top:0; width: 74mm;">
        ${generateSingleRow("From", formData.fromFuelSample)}
        ${generateSingleRow("Taken", formData.takenFuelSample)}
        </div>
        <div style="margin-top: 4mm;padding-top:0; width: 74mm;font-size:12px;">
          <p>========================================<br>=============</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p>CERTIFIED THAT THE FUEL DELIVERED: <br> - CONFORM TO DEFENCE STANDARD 91-091 LATEST ISSUE OR SK <br> DIRJEN MIGAS <br> - COMPLETELY CHECKED IN ACCORDANCE WITH PERTAMINA QUALITY <br> CONTROL PROCEDURE <br> - PARTICULATE MATTER & UNDISSOLVED WATER AT NORMAL AMBIENT <br> TEMPERATURE</p>
            </div>
          </div>
        </div>
        <p style="text-align:left; width: 74mm;font-size:12px;margin-top:16mm;margin-bottom:0;padding-bottom:0;">PERTAMINA's SIGN</p>
        <div class="container" style="margin-top:0;padding-top:0; width: 74mm;">
        ${generateSingleRow("Name", formData.pertaminaSign)}
        </div>
        
        <div style="margin-top: 0px;padding-top:0; width: 74mm;font-size:12px;margin-top:40mm;">
          <p>------------------------------------------------------------------------------------------</p>
          <div style="display: flex; flex-direction: row;margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;">
            <div class="column" style="flex: 1;">
              <p>I ACKNOWLEDGE RECEIPT OF THE PRODUCT AS STATED A NO RESPONSIBLE <br> FOR FUTHER OPERATION AND SAFETY OF THE AIRCRAFT</p>
            </div>
          </div>
          </div>
          <p style="margin-top:4mm;margin-bottom:4mm;padding:0;font-size:12px;">FUEL SYSTEM</p>
        <p style="text-align:left; width: 74mm;font-size:12px;margin-bottom:0;padding-bottom:0;">CUSTOMER's SIGN</p>
        <div class="container" style="margin-top:0;padding-top:0; width: 74mm;">
        ${generateSingleRow("Name", formData.customerSign)}
        </div>
        <div style="margin-top: 0px;padding-top:0; width: 74mm;font-size:12px;margin-top:20mm;">
          <p>========================================<br>=============</p>
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
        <h5 style="border-bottom: 0.1px solid black; padding-bottom:10mm;">THANK YOU</h5>
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
      <div class="row" style="font-size: ${fontSize}; font-weight: ${fontWeight}; width: 74mm;">
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
              body, html { font-family: Arial, sans-serif; padding: 0px; text-align: center;width: 76mm;transform: scale(1.225);
              transform-origin: top left; margin-left:1.8mm; }
              .logo { width: 150px; margin-bottom: 10px; }
              hr { border: 1px solid #000; margin: 10px 0; }
              p { margin: 5px 0; text-align: left; }
              .container { display: flex; flex-direction: column; font-size: 12px; padding: 0px; width: 76mm;}
              .row { display: flex; justify-content: space-between; align-items: center; padding: 0; margin: 0; white-space: nowrap;font-size: 12px; }
              .label { width: 80px; text-align: left; margin:0; padding:0; }
              .separator { width: 10px; text-align: center; margin:0; padding:0;}
              .value { flex: 1; text-align: left;margin:0; padding:0; }
              .column { display: flex; flex-direction: column; flex: 1; }
                .scaled-text {display: inline-block; transform: scaleX(1.5); transform-origin: left; white-space: nowrap;}
            </style>
          </head>
          <body>
          
          <div style="margin-left:1mm;margin-bottom:8mm;">
          <img style="margin-bottom:3mm;padding-bottom:0;" src="${base64Image}" alt="Logo" class="logo"> <br>
          <p style="margin-top:0;padding-top:0;margin-bottom:0;padding-bottom:0;font-size:28px;text-align: center; ">DELIVERY RECEIPT</p>
          <h4 style="margin-top:0;padding-top:0;">${formData.kode}</h4>
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
