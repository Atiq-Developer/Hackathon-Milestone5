// Get elements from the DOM
var usernameHeading = document.getElementById("username");
var shareBtn = document.getElementById("share-btn");
var downloadBtn = document.getElementById("download-btn");
// Parse the username from the URL parameters
var params = new URLSearchParams(window.location.search);
var username = params.get("username") || "User";
usernameHeading.textContent = username;
// Populate personal information dynamically
var userName = document.getElementById("user-name");
var userEmail = document.getElementById("user-email");
var userPhone = document.getElementById("user-phone");
var userAddress = document.getElementById("user-address");
// You can modify these values dynamically based on input or API responses
userName.textContent = "Enter Name";
userEmail.textContent = "entername@example.com";
userPhone.textContent = "+1234567888";
userAddress.textContent = "1234 # malir, karachi";
// Generate unique resume URL based on username
var resumeURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(username);
// Share resume URL
shareBtn.addEventListener("click", function () {
    navigator.clipboard
        .writeText(resumeURL)
        .then(function () { return alert("Resume link copied to clipboard: " + resumeURL); })
        .catch(function (err) { return alert("Error copying link: " + err); });
});
// Download resume as PDF
downloadBtn.addEventListener("click", function () {
    var resumeContent = document.getElementById("resume-section");
    // Convert the resume section to PDF (without using external npm modules)
    html2canvas(resumeContent).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png");
        var pdf = new jsPDF();
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        pdf.save("".concat(username, "-resume.pdf"));
    });
});
