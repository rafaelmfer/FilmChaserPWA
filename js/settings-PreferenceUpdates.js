document.addEventListener('DOMContentLoaded', function () {

    function removeParentDiv(event) {
        const parentDiv = event.target.closest('.catogory-tag, .actor-image, .director-image');
        if (parentDiv) {
            parentDiv.remove();
        }
    }

    const closeIcons = document.querySelectorAll('.fa-circle-xmark');
    closeIcons.forEach(icon => {
        icon.addEventListener('click', removeParentDiv);
    });
});