// Get elements from the DOM
const usernameHeading = document.getElementById("username") as HTMLElement;
const shareBtn = document.getElementById("share-btn") as HTMLButtonElement;
const downloadBtn = document.getElementById(
  "download-btn"
) as HTMLButtonElement;

// Parse the username from the URL parameters
const params = new URLSearchParams(window.location.search);
const username = params.get("username") || "User";
usernameHeading.textContent = username;

// Populate personal information dynamically
const userName = document.getElementById("user-name") as HTMLElement;
const userEmail = document.getElementById("user-email") as HTMLElement;
const userPhone = document.getElementById("user-phone") as HTMLElement;
const userAddress = document.getElementById("user-address") as HTMLElement;

// You can modify these values dynamically based on input or API responses
userName.textContent = "Enter Name";
userEmail.textContent = "entername@example.com";
userPhone.textContent = "+1234567888";
userAddress.textContent = "1234 # malir, karachi";

// Generate unique resume URL based on username
const resumeURL = `${window.location.origin}${window.location.pathname}?username=${username}`;

// Share resume URL
shareBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(resumeURL)
    .then(() => alert("Resume link copied to clipboard: " + resumeURL))
    .catch((err) => alert("Error copying link: " + err));
});

// Download resume as PDF
downloadBtn.addEventListener("click", () => {
  const resumeContent = document.getElementById(
    "resume-section"
  ) as HTMLElement;

  // Convert the resume section to PDF (without using external npm modules)
  html2canvas(resumeContent).then((canvas: any) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    pdf.save(`${username}-resume.pdf`);
  });
});

// Function to simulate HTML to PDF conversion using html2canvas & jsPDF
declare var html2canvas: any;
declare var jsPDF: any;
