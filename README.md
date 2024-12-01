# Export spotify playlists into csv

> [!NOTE]
> Currently only works on user created public playlists

## Prerequisites

- Get your Spotify `CLIENT_ID` and `CLIENT_SECRET` into the

  - Log into Spotify account on your browser
  - Create a Spotify app using their [developer website](https://developer.spotify.com/dashboard). Refer [guide](https://developer.spotify.com/documentation/web-api/concepts/apps) if needed
  - Copy your `ID` and `SECRET` from there
  - Paste it inside a .env file or directly paste in the script

- Copy and paste the Playlist Id into the `PLAYLIST_ID` variable in the script
  - Usually the id is found in the url. Format `https://open.spotify.com/playlist/{playlist_id}`
  - For example, in the URL `https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF`, `37i9dQZEVXbNG2KDcFcKOF` would be the Playlist Id

## Running the script

Following the [Prerequisites](#prerequisites) and installing the dependencies (use your preferred package manager/runtime), you can now run the script

### Example

I tried using [Bun](https://bun.sh) for this project and it worked great with Typescript out of the box :).

```
bun install
bun run dev
```

Successfully running the script should create a file with the Playlist Id and timestamp in the root of the project directory containing all the songs in that playlist with relevant (at least I thougt were important) info.

Enjoy, and do what you want with that data.

## Note (If you care)

I was searching for a free and transparent way to export all my liked songs after Spotify banned all mod apps and playlists were deleted/disappearing. P.S I pay for premium, I just wanted a backup just in case.

So yeah, did some searching and one of the solutions I found was an IOS only app by [George Hayward](https://www.youtube.com/@GeorgeHaywardVideo) in this [video](https://youtu.be/KzoRIzRPk98). (I use android BTW).

So I figured I can do this on my own relatively easily (sacrificing some ease of use and user experience), and so I did.

It works, and I might consider turning it into a website and integrating oauth to improve the experience and also learn stuff along the way.

Hope you found this simple script useful.
