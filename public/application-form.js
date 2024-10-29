// JavaScript to control the modal behavior
function openModal() {
    document.getElementById("applyModal").style.display = "block";
}

function closeModal() {
    document.getElementById("applyModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("applyModal");
    if (event.target == modal) {
        closeModal();
    }
}
