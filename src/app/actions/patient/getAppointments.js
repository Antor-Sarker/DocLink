"use server";
export async function getAppointments(token) {
  try {
    // fetch Appointments List data
    const res = await fetch(
      `https://appointment-manager-node.onrender.com/api/v1/appointments/patient`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      console.log(
        `Failed to fetch appointments list. Status: ${res.status}, Message: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointments list:", error);
    return null;
  }
}
