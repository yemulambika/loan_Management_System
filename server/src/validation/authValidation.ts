export const validateRegisterPayload = (payload: any) => {
  const { name, email, password, role } = payload;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  if (!email || typeof email !== "string") {
    return "Email is required";
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return "A valid email is required";
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (role && typeof role !== "string") {
    return "Role must be a string";
  }

  return null;
};

export const validateLoginPayload = (payload: any) => {
  const { email, password } = payload;

  if (!email || typeof email !== "string") {
    return "Email is required";
  }

  if (!password || typeof password !== "string") {
    return "Password is required";
  }

  return null;
};
