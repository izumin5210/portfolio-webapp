import { updateEntriesData } from "../update-entries-data/index.js";

void updateEntriesData({
  skipFetchingOg: process.env.SKIP_FETCHING_OG === "true",
});
