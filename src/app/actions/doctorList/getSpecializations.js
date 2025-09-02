"use server";

export async function getSpecializations(name) {
  try {
    // get all specializations list
    const res = await fetch("https://appointment-manager-node.onrender.com/api/v1/specializations", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log(
        `Failed to fetch specializations list. Status: ${res.status}, Message: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching specializations list:", error);
    return null;
  }
}
