"use server";
export async function statusUpdate(data,token) {
  try {
    // fupdate Appointments status 
    const res = await fetch(
      `https://appointment-manager-node.onrender.com/api/v1/appointments/update-status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      console.log(
        `Failed to update appointments statsu. Status: ${res.status}, Message: ${res.statusText}`
      );
      return null;
    }

    const updatedData = await res.json();
    return updatedData;
  } catch (error) {
    console.error("Error update appointments status:", error);
    return null;
  }
}
