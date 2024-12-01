import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { CsvAppender } from "./csv-writer";
import { format } from "date-fns";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error("Spotify client id and secret are required");
}

const sdk = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  ["playlist-read-private"] //somehow trying to get my own private playlist results in a 404 even with the correct scope
);

const PLAYLIST_ID = "1koyIdOfW4lxtr46r7Dwa8"; // Top 100 most recognisable songs of all time
const headers = [
  { id: "spotify_id", title: "Spotify ID" },
  { id: "track_name", title: "Track Name" },
  { id: "artists", title: "Artists" },
  { id: "album", title: "Album" },
  { id: "album_release_date", title: "Album Release Date" },
  { id: "duration_in_ms", title: "Duration (ms)" },
  { id: "duration", title: "Duration" },
  { id: "spotify_open_track_link", title: "Spotify Track Link" },
  { id: "spotify_open_album_link", title: "Spotify Album Link" },
  { id: "date_added", title: "Date Added" },
  { id: "date_added_sortable", title: "Date Added (Sortable)" },
  { id: "album_art_link", title: "Album Art Link" },
];
const csvAppender = new CsvAppender(
  `playlist_${PLAYLIST_ID}_${format(new Date(), "yyyyMMdd_HHmmss")}.csv`,
  headers
);

function getPlaylistItems(offset?: number) {
  return sdk.playlists.getPlaylistItems(
    PLAYLIST_ID,
    undefined,
    undefined,
    undefined,
    offset
  );
}

function getReadableDuration(duration_ms: number) {
  const [minutes, secondsPercentage] = (duration_ms / 1000 / 60)
    .toFixed(2)
    .split(".");
  const seconds = 60 * (Number(secondsPercentage) / 100);
  return `${minutes}m ${seconds.toFixed(0)}s`;
}

try {
  let tracks = await getPlaylistItems();
  let offset = 100;

  while (tracks.offset <= tracks.total) {
    console.log(
      `Fetching tracks, offset: ${tracks.offset} , total: ${tracks.total}`
    );

    let trackData: Record<string, any>[] = [];
    tracks.items.forEach(({ added_at, track }) => {
      const { name, album, artists, duration_ms, id, external_urls } = track;
      trackData.push({
        spotify_id: id,
        track_name: name,
        artists: artists.map((artist) => artist.name).join(", "),
        album: album.name,
        album_release_date: album.release_date,
        duration_in_ms: duration_ms,
        duration: getReadableDuration(duration_ms),
        spotify_open_track_link: external_urls.spotify,
        spotify_open_album_link: album.external_urls.spotify,
        date_added: format(added_at, "MMM dd, yyyy"),
        date_added_sortable: format(added_at, "dd-MM-yyyy"),
        album_art_link: album.images[0].url,
      });
    });
    await csvAppender.appendRecords(trackData);
    tracks = await getPlaylistItems(offset);
    offset += 100;
  }
} catch (error) {
  console.error(error);
}
