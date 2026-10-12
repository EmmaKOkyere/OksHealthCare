// =========================================
// OksHealthCare Application
// =========================================


// =========================================
// CHANGE THIS NUMBER
// =========================================

const OKS_HEALTHCARE_NUMBER =
    "+233559202450";



// =========================================
// MOBILE MENU
// =========================================

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



// =========================================
// CONNECTION STATUS
// =========================================

const connectionStatus =
    document.getElementById(
        "connectionStatus"
    );


function updateConnectionStatus() {

    if (!connectionStatus) {
        return;
    }


    if (navigator.onLine) {

        connectionStatus.innerHTML =
            "● Online — Internet connection available.";

        connectionStatus.className =
            "connection-status online";

    }

    else {

        connectionStatus.innerHTML =
            "● Offline — You can still use SMS or phone calls if cellular service is available.";

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



// =========================================
// SPECIALIST CALLBACK REQUEST
// =========================================

const specialistForm =
    document.getElementById(
        "specialistForm"
    );


if (specialistForm) {

    specialistForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const patientName =
                document
                .getElementById("patientName")
                .value
                .trim();


            const patientPhone =
                document
                .getElementById("patientPhone")
                .value
                .trim();


            const requestType =
                document
                .getElementById("requestType")
                .value;


            const priority =
                document
                .getElementById("priority")
                .value;


            if (
                patientName === "" ||
                patientPhone === "" ||
                requestType === ""
            ) {

                alert(
                    "Please complete the required fields."
                );

                return;
            }


            const message =
                "OksHealthCare Callback Request\n\n" +

                "Name: " +
                patientName +
                "\n" +

                "Callback Number: " +
                patientPhone +
                "\n" +

                "Request: " +
                requestType +
                "\n" +

                "Priority: " +
                priority +
                "\n\n" +

                "Please contact me when available.";


            openSMS(
                OKS_HEALTHCARE_NUMBER,
                message
            );

        }
    );

}



// =========================================
// OPEN SMS APP
// =========================================

function openSMS(number, message) {

    const encodedMessage =
        encodeURIComponent(message);


    const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        window.opera;


    // iPhone / iPad

    if (/iPad|iPhone|iPod/.test(userAgent)) {

        window.location.href =
            "sms:" +
            number +
            "&body=" +
            encodedMessage;

    }

    // Android and other devices

    else {

        window.location.href =
            "sms:" +
            number +
            "?body=" +
            encodedMessage;

    }

}



// =========================================
// SERVICE WORKER
// =========================================

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register("./sw.js")

                .then(
                    function (registration) {

                        console.log(
                            "OksHealthCare Service Worker registered:",
                            registration.scope
                        );

                    }
                )

                .catch(
                    function (error) {

                        console.error(
                            "Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}