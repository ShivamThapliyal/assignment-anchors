import express from "express";
import fetchYoutubeComments from "../controller/youtube.js";
import { analyzeCommentsWithGemini } from "../controller/gemini.js";

const router = express.Router();

/**
 * Fetch comments and analyze their sentiment.
 */
router.post("/", async (req, res) => {
  const { videoUrl } = req.body;

  try {
    // Fetch comments from YouTube API
    const { totalComments, comments, commentCountsByMonth } =
      await fetchYoutubeComments(videoUrl);

    // console.log("Fetched Comments:", comments);

    // Analyze sentiment of comments using Gemini API
    const sentimentCounts = await analyzeCommentsWithGemini(comments);

    console.log("Sentiment Analysis Results:", sentimentCounts);

    // Respond with the sentiment counts and other information
    res.status(200).json({
      success: true,
      totalComments,
      sentimentCounts,
      commentCountsByMonth,
    });
  } catch (error) {
    console.error("Error in fetching and analyzing comments:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

// import express from "express";
// import fetchYoutubeComments from "../controller/youtube.js";
// import { analyzeCommentsWithGemini } from "../controller/gemini.js";

// const router = express.Router();

// // Fetch and analyze comments for a given YouTube video
// router.post("/", async (req, res) => {
//   const { videoUrl } = req.body;

//   try {
//     // Fetch comments from YouTube
//     const commentsResponse = await fetchYoutubeComments(videoUrl);

//     // Get the total number of comments
//     // const totalComments = commentsResponse.pageInfo.totalResults;

//     // Extract all textDisplay from the API response
//     const displayTexts = commentsResponse.items.map(
//       (item) => item.snippet.topLevelComment.snippet.textDisplay
//     );

//     console.log("Extracted Comments:", displayTexts);

//     // Analyze comments with Gemini API
//     const sentimentCounts = await analyzeCommentsWithGemini(displayTexts);
//     console.log("Sentiment Analysis Results:", sentimentCounts);

//     // Respond to the client
//     res.status(200).json({
//       success: true,
//       sentimentCounts,
//       comments: displayTexts,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;

// import express from "express";
// import fetchYoutubeComments from "../controller/youtube.js";
// import { analyzeCommentsWithGemini } from "../controller/gemini.js";

// const router = express.Router();

// // Fetch and analyze comments for a given YouTube video
// router.post("/", async (req, res) => {
//   const { videoUrl } = req.body;

//   try {
//     // Fetch comments from YouTube
//     const comments = await fetchYoutubeComments(videoUrl);

//     const total = comments.totalComments;

//     //gemini
//     const sentimentCounts = await analyzeCommentsWithGemini(cleanedComments);
//     console.log(sentimentCounts);

//     // Respond to the client
//     res.status(200).json({
//       success: true,
//       sentimentCounts,
//       total,
//       comments,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;
