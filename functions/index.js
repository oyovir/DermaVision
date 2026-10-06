const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

const clarifaiPat = defineSecret("CLARIFAI_PAT");

const MODEL_ID = "xfer-learn-skindisease";
const MODEL_VERSION_ID = "e14b656e8e28465b81c2425e6ebdd2b2";

exports.detectSkinDisease = onRequest(
  {
    region: "us-central1",
    secrets: [clarifaiPat],
    cors: true,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const authHeader = req.get("Authorization") || "";
      if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const idToken = authHeader.slice("Bearer ".length);
      await admin.auth().verifyIdToken(idToken);

      const imageUrl = req.body && req.body.imageUrl;
      if (typeof imageUrl !== "string" || !imageUrl.startsWith("https://")) {
        return res.status(400).json({ error: "A valid HTTPS imageUrl is required" });
      }

      const response = await fetch(
        `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Key ${clarifaiPat.value()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: [
              {
                data: {
                  image: {
                    url: imageUrl,
                  },
                },
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Clarifai request failed:", response.status);
        return res.status(502).json({ error: "Inference provider request failed" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Inference error:", error);
      return res.status(500).json({ error: "Inference failed" });
    }
  }
);
