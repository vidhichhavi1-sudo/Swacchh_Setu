/* =========================================================
   SWACHH SETU — LIVE TRACKING + DYNAMIC EVENT ENGINE
========================================================= */

let swachhMap;
let truckMarkers = {};
let routeLine;


/* =========================================================
   1. INITIALIZE LIVE MAP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("liveMap");

    if (!mapElement) return;

    /* CREATE MAP */

    swachhMap = L.map("liveMap").setView(
        [26.9124, 75.7873],
        13
    );


    /* OPENSTREETMAP */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(swachhMap);


    /* =====================================================
       TRUCK LOCATIONS
    ===================================================== */

    const trucks = {

        "SW-21": [26.9124, 75.7873],

        "SW-18": [26.8955, 75.8060],

        "SW-09": [26.9300, 75.7750]

    };


    /* =====================================================
       CREATE TRUCK MARKERS
    ===================================================== */

    truckMarkers["SW-21"] = L.marker(
        trucks["SW-21"]
    ).addTo(swachhMap);

    truckMarkers["SW-21"]
        .bindPopup(
            "<b>🚛 Truck #SW-21</b><br>Collecting<br>Ward 42"
        );


    truckMarkers["SW-18"] = L.marker(
        trucks["SW-18"]
    ).addTo(swachhMap);

    truckMarkers["SW-18"]
        .bindPopup(
            "<b>🚛 Truck #SW-18</b><br>On Route<br>Ward 17"
        );


    truckMarkers["SW-09"] = L.marker(
        trucks["SW-09"]
    ).addTo(swachhMap);

    truckMarkers["SW-09"]
        .bindPopup(
            "<b>🚛 Truck #SW-09</b><br>On Route<br>Ward 31"
        );


    /* =====================================================
       SELECTED TRUCK ROUTE
    ===================================================== */

    const routePoints = [

        [26.9124, 75.7873],

        [26.9050, 75.7920],

        [26.8980, 75.8000],

        [26.8920, 75.8070]

    ];


    routeLine = L.polyline(
        routePoints,
        {
            color: "#16c79a",
            weight: 5,
            opacity: 0.8,
            dashArray: "10 8"
        }
    ).addTo(swachhMap);


    /* =====================================================
       MAP FIT
    ===================================================== */

    swachhMap.fitBounds(routeLine.getBounds(), {
        padding: [30, 30]
    });


    /* Fix map rendering */

    setTimeout(function () {

        swachhMap.invalidateSize();

    }, 300);

});


/* =========================================================
   2. DYNAMIC EVENT STATE
========================================================= */

const swachhEventState = {

    traffic: 64,

    waterlogging: false,

    sensorFill: 78,

    roadBlocked: false

};


/* =========================================================
   3. LIVE EVENT INJECTION
========================================================= */

function injectSwachhEvent() {

    const panel =
        document.querySelector(".live-intelligence");


    if (panel) {

        panel.classList.remove("event-active");

        setTimeout(() => {

            panel.classList.add("event-active");

        }, 50);

    }


    /* =====================================================
       SENSOR SPIKE
    ===================================================== */

    swachhEventState.sensorFill = 97;


    /* =====================================================
       TRAFFIC SPIKE
    ===================================================== */

    swachhEventState.traffic = 91;


    /* =====================================================
       WATERLOGGING
    ===================================================== */

    swachhEventState.waterlogging = true;


    /* =====================================================
       ROADBLOCK
    ===================================================== */

    swachhEventState.roadBlocked = true;


    /* =====================================================
       UPDATE TRAFFIC
    ===================================================== */

    document.getElementById("trafficValue").textContent =
        "91%";

    document.getElementById("trafficBadge").textContent =
        "HIGH";

    document.getElementById("trafficBadge").className =
        "condition-badge danger";

    document.getElementById("trafficLocation").textContent =
        "Tonk Road • DENSE TRAFFIC";


    /* =====================================================
       UPDATE WATERLOGGING
    ===================================================== */

    document.getElementById("waterValue").textContent =
        "HIGH";

    document.getElementById("waterBadge").textContent =
        "WATERLOGGED";

    document.getElementById("waterBadge").className =
        "condition-badge danger";

    document.getElementById("waterLocation").textContent =
        "Mansarovar • WATERLOGGED";


    /* =====================================================
       UPDATE SENSOR
    ===================================================== */

    document.getElementById("sensorValue").textContent =
        "97%";

    document.getElementById("sensorBadge").textContent =
        "CRITICAL";

    document.getElementById("sensorBadge").className =
        "condition-badge danger";

    document.getElementById("sensorLocation").textContent =
        "CP-27 • SENSOR SPIKE";


    /* =====================================================
       UPDATE ROAD
    ===================================================== */

    document.getElementById("roadValue").textContent =
        "BLOCKED";

    document.getElementById("roadBadge").textContent =
        "ROADBLOCK";

    document.getElementById("roadBadge").className =
        "condition-badge danger";

    document.getElementById("roadLocation").textContent =
        "R-14 • ROADBLOCK";


    /* =====================================================
       SWACHH SETU DECISION ENGINE
    ===================================================== */

    document.getElementById("priorityValue").textContent =
        "CRITICAL";

    document.getElementById("priorityValue").style.color =
        "#ff5964";

    document.getElementById("priorityReason").textContent =
        "Sensor spike detected while traffic, waterlogging and road restrictions affect the original route.";


    /* =====================================================
       HETEROGENEOUS FLEET ROUTING
    ===================================================== */

    document.getElementById("recommendedIcon").textContent =
        "🛺";

    document.getElementById("recommendedVehicle").textContent =
        "Mini Collector B-04";

    document.getElementById("vehicleReason").textContent =
        "Selected because it can access restricted and narrow roads.";

    document.getElementById("vehicleCapacity").textContent =
        "2 TON";

    document.getElementById("vehicleAccess").textContent =
        "HIGH ACCESS";

    document.getElementById("vehicleDistance").textContent =
        "1.2 KM";


    /* =====================================================
       ALTERNATE ROUTE
    ===================================================== */

    document.getElementById("transferRoute").textContent =
        "Alternate Transfer Route";


    /* =====================================================
       IMPACT
    ===================================================== */

    document.getElementById("routeDistance").textContent =
        "3.1 km";

    document.getElementById("routeETA").textContent =
        "8 min";

    document.getElementById("fuelSaving").textContent =
        "24%";

    document.getElementById("systemAction").textContent =
        "FLEET REASSIGNED";


    /* =====================================================
       SYSTEM STATUS
    ===================================================== */

    document.getElementById("dispatchStatus").textContent =
        "● ADAPTIVE RESPONSE";

    document.getElementById("dispatchStatus").style.color =
        "#ffbe46";


    /* =====================================================
       CHANGE MAP ROUTE
    ===================================================== */

    if (swachhMap && routeLine) {

        swachhMap.removeLayer(routeLine);


        const alternateRoute = [

            [26.9124, 75.7873],

            [26.9180, 75.7800],

            [26.9250, 75.7720],

            [26.9320, 75.7650]

        ];


        routeLine = L.polyline(
            alternateRoute,
            {
                color: "#ffbe46",
                weight: 6,
                opacity: 0.9,
                dashArray: "12 7"
            }
        ).addTo(swachhMap);


        /* Move selected truck */

        if (truckMarkers["SW-21"]) {

            truckMarkers["SW-21"].setLatLng(
                [26.9180, 75.7800]
            );

            truckMarkers["SW-21"].bindPopup(
                "<b>🛺 Mini Collector B-04</b><br>" +
                "ADAPTIVE RESPONSE<br>" +
                "Alternate Route"
            );

        }


        /* Zoom to new route */

        swachhMap.fitBounds(
            routeLine.getBounds(),
            {
                padding: [30, 30]
            }
        );

    }

}