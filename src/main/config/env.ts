export default {
  baseUrl: process.env.BASE_URL || "http://user-manager-service:5053/api",
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET,
};
