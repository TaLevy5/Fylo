document.addEventListener('DOMContentLoaded',  () => {  
    initializeStorage();
});
document.getElementById('upload').addEventListener('click', uploadFile);

const updateStorageUI= () => {
    let totalStorage = parseInt(localStorage.getItem('totalStorage'));
    let usedStorage = parseInt(localStorage.getItem('usedStorage'));
    
    document.getElementById('remainingStorage').textContent = totalStorage;
    document.getElementById('usedStorage').textContent = usedStorage;

    let remainingStorage = totalStorage - usedStorage;
    let progressBar = document.getElementById('progressBar');
    progressBar.style.width = usedStorage + '%';

}

const initializeStorage = () => {
    if (!localStorage.getItem('totalStorage')) {
        // If not, set the initial storage to 100 MB
        localStorage.setItem('totalStorage', 100);
    }
    localStorage.setItem('usedStorage', 0);

    updateStorageUI();
}

const updateStorageOnUpload =  (fileSize) => {
    let totalStorage = parseInt(localStorage.getItem('totalStorage'));
    let usedStorage = parseInt(localStorage.getItem('usedStorage'));

    totalStorage -= fileSize;
    usedStorage += Math.ceil(fileSize);

    localStorage.setItem('totalStorage' , totalStorage);
    localStorage.setItem('usedStorage' , usedStorage);

    updateStorageUI();
}

 const checkFileFormat = () => { 
    let fileInput = document.getElementById('fileInput');
    let selectedFiles = fileInput.files;

    for (let i=0; i<selectedFiles.length; i++) {
        let currentFile = selectedFiles[i];
        let allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image.gif"];
        let fileSize = (currentFile.size) / 1024 / 1024;

        if (!allowedFormats.includes(currentFile.type)) {
            alert('Only JPG, JPEG, GIF , PNG file are allowed.');
            fileInput.value = '';
            return; 
        }
        return fileSize;
    }
}

const checkSpace = (fileSize) => {
    let totalStorage = parseInt(localStorage.getItem('totalStorage'));
if (fileSize > totalStorage) {
    alert('There is not enough space on the disk')
    return;
}
updateStorageOnUpload(fileSize);
}

function uploadFile() {
    let fileSize = checkFileFormat(); 
    if (fileSize !== undefined) {  
        checkSpace(fileSize); 
    }
}


 