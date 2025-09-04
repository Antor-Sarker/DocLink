"use server";
export async function getFilterAppointments(token, filterBy) {
  try {
    // fetch Appointments List data with filter by status or date
    const res = await fetch(
      filterBy === "ALL"
        ? `https://appointment-manager-node.onrender.com/api/v1/appointments/doctor`
        : `https://appointment-manager-node.onrender.com/api/v1/appointments/doctor?${filterBy}`,
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
