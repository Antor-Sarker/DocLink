"use server";

export async function searchDoctors(name) {
  try {
    // search Doctor List data
    let url =
      name === "empty"
        ? `https://appointment-manager-node.onrender.com/api/v1/doctors?page=${1}&limit=${15}`
        : `https://appointment-manager-node.onrender.com/api/v1/doctors?page=${1}&limit=${15}&search=${name}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

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
