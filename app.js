// ====================================
// OksHealthCare Contact System
// ====================================


// CHANGE THIS NUMBER ONLY

const OKS_HEALTHCARE_NUMBER =
    "+233559202450";



// ====================================
// DIRECT CALL BUTTON
// ====================================

const callButton =
    document.getElementById("callButton");


if (callButton) {

    callButton.href =
        "tel:" + OKS_HEALTHCARE_NUMBER;

}



// ====================================
// DIRECT SMS BUTTON
// ====================================

const directSmsButton =
    document.getElementById(
        "directSmsButton"
    );


if (directSmsButton) {

    const directMessage =
        "Hello OksHealthCare. I would like to speak with a medical specialist.";


    directSmsButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openSMS(
                OKS_HEALTHCARE_NUMBER,
                directMessage
            );

        }
    );

}



// ====================================
// CONNECTION STATUS
// ====================================

const connectionStatus =
    document.getElementById(
        "connectionStatus"
    );


function updateConnectionStatus() {

    if (!connectionStatus) {
        return;
    }


    if (navigator.onLine) {

        connectionStatus.textContent =
            "● Internet available";

        connectionStatus.className =
            "connection-status online";

    }

    else {

        connectionStatus.textContent =
            "● No internet. SMS and calls may still work.";

        connectionStatus.className =
            "connection-status offline";

    }

}


updateConnectionStatus();


window.addEventListener(
    "online",
    updateConnectionStatus
);


window.addEventListener(
    "offline",
    updateConnectionStatus
);



// ====================================
// CALLBACK FORM
// ====================================

const specialistForm =
    document.getElementById(
        "specialistForm"
    );


if (specialistForm) {

    specialistForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                .getElementById("patientName")
                .value
                .trim();


            const phone =
                document
                .getElementById("patientPhone")
                .value
                .trim();


            const specialist =
                document
                .getElementById("specialistType")
                .value;


            if (
                name === "" ||
                phone === "" ||
                specialist === ""
            ) {

                alert(
                    "Please complete all fields."
                );

                return;
            }


            const message =
                "OksHealthCare Callback Request\n\n" +

                "Name: " +
                name +
                "\n" +

                "Callback Number: " +
                phone +
                "\n" +

                "Requested Specialist: " +
                specialist +
                "\n\n" +

                "Please contact me when available.";


            openSMS(
                OKS_HEALTHCARE_NUMBER,
                message
            );

        }
    );

}



// ====================================
// OPEN PHONE SMS APP
// ====================================

function openSMS(number, message) {

    const encodedMessage =
        encodeURIComponent(message);


    const userAgent =
        navigator.userAgent || "";


    // iPhone / iPad

    if (
        /iPhone|iPad|iPod/i.test(
            userAgent
        )
    ) {

        window.location.href =
            "sms:" +
            number +
            "&body=" +
            encodedMessage;

    }

    // Android / other devices

    else {

        window.location.href =
            "sms:" +
            number +
            "?body=" +
            encodedMessage;

    }

}



// ====================================
// OFFLINE SERVICE WORKER
// ====================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register("./sw.js")

                .then(
                    function () {

                        console.log(
                            "Offline service ready."
                        );

                    }
                )

                .catch(
                    function (error) {

                        console.error(
                            "Service worker error:",
                            error
                        );

                    }
                );

        }
    );

}