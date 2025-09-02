"use server";
export async function getDoctorList() {
  try {
    // fetch Doctor List data
    const res = await fetch(
      "https://appointment-manager-node.onrender.com/api/v1//doctors",
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      console.log(
        `Failed to fetch doctor list. Status: ${res.status}, Message: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return null;
  }
}
