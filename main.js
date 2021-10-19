// Constants
const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const form = document.getElementById("cphp-form");
const dy = document.querySelector("input[name=dob-year]");
const dm = document.querySelector("select[name=dob-month]");
const dd = document.querySelector("select[name=dob-day]");
const ay = document.querySelector("input[name=age-at-year]");
const am = document.querySelector("select[name=age-at-month]");
const ad = document.querySelector("select[name=age-at-day]");
const output = document.getElementById("output");

form.onsubmit = (event) => {
   event.preventDefault();
   const dob = getDateString(dy, dm, dd);
   const ageAt = getDateString(ay, am, ad);
   fetchAge(dob, ageAt);
};
const fetchAge = async (dob, ageAt) => {
   const r = await fetch(`/wasim/cphp/age.php?dob=${dob}&ageAt=${ageAt}`);
   const text = await r.text();
   output.innerHTML = text;
};

// Events
window.onload = (event) => {
   months.forEach((month, index) => {
      dm.innerHTML += `<option value=${index} > ${month} </option>`;
      am.innerHTML += `<option value=${index} > ${month} </option>`;
   });

   //  Initialy Set the days to january
   for (let day = 1; day <= days[0]; day++) {
      dd.innerHTML += `<option value=${day} > ${day} </option>`;
      ad.innerHTML += `<option value=${day} > ${day} </option>`;
   }
};

dm.onchange = (event) => {
   const index = getOptionValue(event.target);
   dd.innerHTML = "";
   for (let day = 1; day <= days[index]; day++) {
      dd.innerHTML += `<option value=${day} > ${day} </option>`;
   }
};

am.onchange = (event) => {
   const index = getOptionValue(event.target);
   ad.innerHTML = "";
   for (let day = 1; day <= days[index]; day++) {
      ad.innerHTML += `<option value=${day} > ${day} </option>`;
   }
};

// Utils
const getDateString = (y, m, d) =>
   `${y.value}/${1 + Number(getOptionValue(m))}/${getOptionValue(d)}`;

const getOptionValue = (select) => {
   const index = select.selectedIndex;
   return select.options[index].value;
};
