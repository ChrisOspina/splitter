

export function showSuccessToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style:{
            background:"Linear-gradient(90deg,rgba(42, 155, 59, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
        },
    }).showToast();
}



export function showErrorToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style:{
            background:"Linear-gradient(to right, #8B0000, #FFCCCB)",
        },
    }).showToast();

}