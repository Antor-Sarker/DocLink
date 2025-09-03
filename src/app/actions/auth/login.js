export async function login(formData) {
  try {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const res = await fetch(
      "https://appointment-manager-node.onrender.com/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );
    const authData = await res.json();
    return authData;
  } catch (error) {
    return error;
  }
}
