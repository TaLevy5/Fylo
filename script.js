document.addEventListener('DOMContentLoaded', function () {  
    initializeStorage();
});
document.getElementById('upload').addEventListener('click', uploadFile);

function initializeStorage() {
    // Check if the storage is already initialized
    if (!localStorage.getItem('totalStorage')) {
        // If not, set the initial storage to 100 MB
        localStorage.setItem('totalStorage', 100);
    }
    // Initialize used storage to 0
    localStorage.setItem('usedStorage', 0);

    updateStorageUI();
}

function updateStorageOnUpload (fileSize) {
    var totalStorage = parseInt(localStorage.getItem('totalStorage')); //this makes char to int
    var usedStorage = parseInt(localStorage.getItem('usedStorage'));

    totalStorage -= fileSize;
    usedStorage += Math.ceil(fileSize);

    localStorage.setItem('totalStorage' , totalStorage);
    localStorage.setItem('usedStorage' , usedStorage);

    updateStorageUI();
}

function updateStorageUI() {
    var totalStorage = parseInt(localStorage.getItem('totalStorage')); //this makes char to int
    var usedStorage = parseInt(localStorage.getItem('usedStorage'));
    
    document.getElementById('remainingStorage').textContent = totalStorage;
    document.getElementById('usedStorage').textContent = usedStorage;

    var remainingStorage = totalStorage - usedStorage;
    var percentageUsed = (usedStorage) ;
    var progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentageUsed + '%';

}

function checkFileFormat () {   // this function checks the file format
    var fileInput = document.getElementById('fileInput');
    var selectedFiles = fileInput.files;

    for (var i=0; i<selectedFiles.length; i++) {
        var currentFile = selectedFiles[i];
        var allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image.gif"]; //this array includes the acceptable formats
        var fileSize = (currentFile.size) / (1024) / (1024);

        if (!allowedFormats.includes(currentFile.type)) {  // this function check if the file format is on the acceptable formats array
            alert('Only JPG, JPEG, GIF , PNG file are allowed.');
            fileInput.value = '';
            return; 
        }
        CheckSpace(fileSize);
         // need to move this to checkSpace.
    }
}

function CheckSpace (fileSize) {
    var totalStorage = parseInt(localStorage.getItem('totalStorage'));
if (fileSize>totalStorage)
{
    alert('There is not enough space on the disk')
    return;
}
updateStorageOnUpload(fileSize);
}
function uploadFile() {

    checkFileFormat();


}


 