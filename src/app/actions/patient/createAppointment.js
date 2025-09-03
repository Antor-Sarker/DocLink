"use server";
export default async function createAppointmet(appointmentInfo, token) {
  try {
    //book appointment by patient with auth token
    const res = await fetch(
      "https://appointment-manager-node.onrender.com/api/v1/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(appointmentInfo),
      }
    );

    if (res?.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
