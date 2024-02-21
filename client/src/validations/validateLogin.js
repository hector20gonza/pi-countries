// validation.js
export const validateLoginForm = (userData) => {
    let errors = {};
  
    // Validar campo de correo electrónico
    if (!userData.email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Please enter a valid email address";
    }
  
    // Validar campo de contraseña
    if (!userData.password) {
      errors.password = "Please enter your password";
    }
  
    return errors;
  };
  export const validateRegisterForm = (userData) => {
    let errors = {};
  
    // Validar campo de correo electrónico
    if (!userData.email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Please enter a valid email address";
    }
  
    // Validar campo de contraseña
    if (!userData.password) {
      errors.password = "Please enter your password";
    }
  
    return errors;
  };
  export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.name) {
      errors.name = "Activity name is required";
    }
  
    if (!formData.difficulty || formData.difficulty < 1 || formData.difficulty > 5) {
      errors.difficulty = "Difficulty must be between 1 and 5";
    }
  
    if (!formData.duration || isNaN(formData.duration) ) {
      errors.duration = "Duration empty or non-empty or non-numeric duration";
    }
  
    if (!formData.season) {
      errors.season = "Season is required";
    }
  
    if (formData.countries.length === 0) {
      errors.countries = "At least one country must be selected";
    }
  
    return errors;
  };