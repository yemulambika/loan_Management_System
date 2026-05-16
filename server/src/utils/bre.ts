export const runBRE = (
  dob: string,
  salary: number,
  pan: string,
  employmentMode: string
) => {
  const age =
    new Date().getFullYear() -
    new Date(dob).getFullYear();
    
  if (age < 23 || age > 50) {
    return "Age must be between 23 and 50";
  }

  if (salary < 25000) {
    return "Salary must be above 25000";
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan)) {
    return "Invalid PAN format";
  }

  if (employmentMode === "Unemployed") {
    return "Applicant cannot be unemployed";
  }

  return null;
};