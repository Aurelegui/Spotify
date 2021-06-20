// Put in a function if you dont want to
import axios from "axios";

const clientId = '3e5cd6c1db2a49a4866306cc374537ab';

const redirectUri = 'http://localhost:3000/';

let accessToken;
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // check for access token match
        const userAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresToken = window.location.href.match(/expires_in=([^&]*)/);

        if (userAccessToken && expiresToken) {
            accessToken = userAccessToken[1];
            const expiresIn = Number(expiresToken[1]);

            // this clears params, allow grab new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    // Return all matches of tracks from search use
    async search(term) {
        const accessToken = Spotify.getAccessToken();

        const response = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log(response)

        if (response.status !== 200) {
            return []
        }

        return response.data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));

    },











        //get token from Spotify method
       /* return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            // convert to json
            return response.json();
            // Check response
        }).then(jsonResponse => {
            // if no tracks exist returns empty array

            if (!jsonResponse.tracks) {
                return [];
            }
            // else it returns all tracks with id, name, artist, album and uri
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }*/

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                        {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackUris })
                        });
                });
        });
    }
};

export default Spotify;
