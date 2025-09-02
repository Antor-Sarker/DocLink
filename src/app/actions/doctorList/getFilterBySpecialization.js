export async function getFilterBySpecialization(option) {
  try {
    // filter Doctor List data by specializations
    const res = await fetch(
      option === "all"
        ? `https://appointment-manager-node.onrender.com/api/v1/doctors?page=${1}&limit=${15}`
        : `https://appointment-manager-node.onrender.com/api/v1/doctors?page=${1}&limit=${15}&specialization=${option}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.log(
        `Failed to fetch filter doctor list. Status: ${res.status}, Message: ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching filter doctor list:", error);
    return null;
  }
}
