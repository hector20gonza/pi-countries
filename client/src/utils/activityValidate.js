// validateForm.js
export const validateName = (name) => {
  return name.trim() === "" ? "Activity name is required" : "";
};

export const validateDifficulty = (difficulty) => {
  return difficulty < 1 || difficulty > 5 ? "Difficulty must be between 1 and 5" : "";
};



export const validateForm = (activityData) => {
  const errors = {};
  errors.name = validateName(activityData.name);
  errors.difficulty = validateDifficulty(activityData.difficulty);

  return errors;
};
