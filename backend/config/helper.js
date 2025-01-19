// Extract video ID from YouTube URL
export function extractVideoId(url) {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:v=|\/)([\w-]{11})(?:&.*)?$/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// // Extract video ID from YouTube URL
// export function extractVideoId(url) {
//   const regExp =
//     /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*(?:v=|\/)([\w-]{11})(?:&.*)?$/;
//   const match = url.match(regExp);
//   return match ? match[1] : null;
// }
