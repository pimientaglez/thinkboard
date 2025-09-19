import ratelimit from "../config/upstash";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later" });
    }
    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    next(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default rateLimiter;
