// ==============================
// MOBILE NAVIGATION
// ==============================

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        function () {

            navigation.classList.toggle("show");

        }
    );

}



// ==============================
// APPOINTMENT FORM
// ==============================

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value;


            formMessage.textContent =
                "Thank you, "
                + name
                + ". Your appointment request has been recorded. Please contact OksHealthCare to confirm your appointment.";


            appointmentForm.reset();

        }
    );

}