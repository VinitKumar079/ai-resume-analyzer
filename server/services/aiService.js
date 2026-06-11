const analyzeResume = async (
  resumeText,
  jobDescription
) => {

  return {
    score: 78,

    missingSkills: [
      "Spring Boot",
      "REST APIs",
      "JWT Authentication",
    ],

    strengths: [
      "React Knowledge",
      "Java Basics",
      "Frontend Projects",
      "DSA Practice",
    ],

    weaknesses: [
      "No backend projects",
      "No deployment experience",
      "Limited database work",
    ],

    suggestions: [
      "Build Spring Boot projects",
      "Learn REST APIs",
      "Deploy projects online",
      "Add PostgreSQL projects",
    ],
  };
};

module.exports = analyzeResume;