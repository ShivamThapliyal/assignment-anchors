import axios from "axios";
import { YOUTUBE_KEY } from "../config/youtubeapi.js";
import { extractVideoId } from "../config/helper.js";

/**
 * Fetch comments and statistics for a given YouTube video.
 * @param {string} videoUrl - The URL of the YouTube video.
 * @returns {Promise<object>} - An object containing comments and total comment count.
 */
export default async function fetchYoutubeComments(videoUrl) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error("Invalid YouTube URL.");

  const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${YOUTUBE_KEY}`;
  const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${YOUTUBE_KEY}`;

  try {
    const commentCountsByMonth = {};
    let nextPageToken = null;

    // Fetch all comments using pagination
    do {
      const response = await axios.get(commentsUrl, {
        params: { pageToken: nextPageToken },
      });

      const items = response.data.items;

      items.forEach((item) => {
        const date = new Date(item.snippet.topLevelComment.snippet.publishedAt);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`; // Format as YYYY-MM

        if (!commentCountsByMonth[monthKey]) {
          commentCountsByMonth[monthKey] = 0;
        }
        commentCountsByMonth[monthKey] += 1; // Increment the count for the month
      });

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);
    console.log("new", commentCountsByMonth);

    // Fetch comments from YouTube API
    const commentsResponse = await axios.get(commentsUrl);
    const comments = commentsResponse.data.items.map(
      (item) => item.snippet.topLevelComment.snippet.textDisplay
    );

    // console.log("helos", commentsResponse.data.items);
    // console.log("helos", commentsResponse.data);
    // .map(
    //     (item) => item.snippet.topLevelComment.snippet.publishedAt
    // //   )
    // Fetch total comment count from YouTube API
    const statsResponse = await axios.get(statsUrl);
    const totalComments = parseInt(
      statsResponse.data.items[0].statistics.commentCount,
      10
    );

    return {
      totalComments,
      comments,
      commentCountsByMonth,
    };
  } catch (error) {
    console.error("Error fetching YouTube comments:", error.message);
    throw new Error("Failed to fetch YouTube comments");
  }
}
