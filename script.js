const nums = document.querySelectorAll(".num");
const clock = document.querySelector(".clock");
let clockRadius;
let numAngle;
let numMargin;
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const hourCircle = hour.querySelector(".circle");
const minCircle = min.querySelector(".circle");
const secCircle = sec.querySelector(".circle");
const hourScale = hour.querySelector(".scale");
const minScale = min.querySelector(".scale");
const secScale = sec.querySelector(".scale");
const hourText = document.querySelector(".hour-text");
const minText = document.querySelector(".min-text");
const secText = document.querySelector(".sec-text");
const ampm = document.querySelector(".ampm");
let hourRadius;
let minRadius;
let secRadius;
function getRotationAngle(element) {
    const transform = getComputedStyle(element).transform;
    if (transform === "none") return 0;
    const matrix = new DOMMatrix(transform);
    return Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
}
function renderNums() {
    clockRadius = clock.getBoundingClientRect().width / 2;
    numMargin = (clockRadius / 150) * 25;
    numAngle = 0;
    hourRadius = hour.getBoundingClientRect().width / 2;
    minRadius = min.getBoundingClientRect().width / 2;
    secRadius = sec.getBoundingClientRect().width / 2;
    nums.forEach(num => {
        num.style.top = `${Math.sin(numAngle) * (clockRadius - numMargin) + clockRadius}px`;
        num.style.left = `${Math.cos(numAngle) * (clockRadius - numMargin) + clockRadius}px`;
        numAngle += Math.PI / 6;
    });
}
function updateClock() {
    const date = new Date();
    const hours = date.getHours() % 12 || 12;
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    hourText.textContent = hours.toString().padStart(2, 0);
    minText.textContent = mins.toString().padStart(2, 0);
    secText.textContent = secs.toString().padStart(2, 0);
    ampm.textContent = date.getHours() > 11 ? "PM" : "AM";
    secScale.style.transform = `translate(-50%,-100%) rotate(${secs * 6}deg)`;
    minScale.style.transform = `translate(-50%,-100%) rotate(${mins * 6 + secs / 10}deg)`;
    hourScale.style.transform = `translate(-50%,-100%) rotate(${hours * 30 + mins / 2}deg)`;
    secCircle.style.top = `${Math.sin(((getRotationAngle(secScale) - 90) * Math.PI) / 180) * secRadius + secRadius}px`;
    secCircle.style.left = `${Math.cos(((getRotationAngle(secScale) - 90) * Math.PI) / 180) * secRadius + secRadius}px`;
    minCircle.style.top = `${Math.sin(((getRotationAngle(minScale) - 90) * Math.PI) / 180) * minRadius + minRadius}px`;
    minCircle.style.left = `${Math.cos(((getRotationAngle(minScale) - 90) * Math.PI) / 180) * minRadius + minRadius}px`;
    hourCircle.style.top = `${Math.sin(((getRotationAngle(hourScale) - 90) * Math.PI) / 180) * hourRadius + hourRadius}px`;
    hourCircle.style.left = `${Math.cos(((getRotationAngle(hourScale) - 90) * Math.PI) / 180) * hourRadius + hourRadius}px`;
}
renderNums();
setInterval(updateClock, 1000);
updateClock();
addEventListener("resize", renderNums);
