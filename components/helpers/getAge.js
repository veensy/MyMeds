export function getAge(year, month, day) {
  var dob = new Date(year, month, day);
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  var age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return age;
}

module.exports = getAge;
