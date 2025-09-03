"use server";

export default async function registerUser(formData, isDoctor) {
  try {
    //register doctor or patient with dynamic url
    const res = await fetch(
      `https://appointment-manager-node.onrender.com/api/v1${
        isDoctor ? "/auth/register/doctor" : "/auth/register/patient"
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (res?.status === 201) {
      return true
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
