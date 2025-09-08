import axios from "axios";
import { Buffer } from "buffer";
import qs from 'qs'


const generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const loginImplicitGrantFlow = (scope) => {
  let stateKey = "spotify_auth_state";

  const state = generateRandomString(16);
  // setCookie(stateKey, state);
  const params = new URLSearchParams();
  params.append("response_type", "token");
  params.append("client_id", process.env.REACT_APP_CLIENT_ID);
  params.append("scope", scope);
  params.append("redirect_uri", process.env.REACT_APP_BASE_URL + "/callback");
  params.append("show_dialog", "true");
  window.location.href =
    "https://accounts.spotify.com/authorize?" + params.toString();
};

export const callbackImplicitGrantFlow = () => {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  return {
    token: hash.access_token,
    expiresIn: hash.expires_in,
  };
};

// not implemented yet
export const loginAuthorizationCodeFlow = (scope) => {
  // setCookie(stateKey, state)
  const params = new URLSearchParams();
  params.append("response_type", "code");
  params.append("client_id", process.env.REACT_APP_CLIENT_ID);
  params.append("scope", scope);
  params.append("redirect_uri", process.env.REACT_APP_BASE_URL + "/callback");
  params.append("show_dialog", "true");
  window.location.href =
    "https://accounts.spotify.com/authorize?" + params.toString();
};

export const callbackAuthorizationCodeFlow = (code) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",

        qs.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.REACT_APP_BASE_URL + "/callback",
        }),
        {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.REACT_APP_CLIENT_ID +
                ":" +
                process.env.REACT_APP_CLIENT_SECRET
              ).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          json: true,
        }
      )
      .then((res) => {
        const data = res.data;

        const params = new URLSearchParams(window.location.search);
        params.set("access_token", data?.access_token);
        if (data.refresh_token) params.set("refresh_token", data?.refresh_token);

        window.history.replaceState({}, "", `${process.env.REACT_APP_BASE_URL + "/callback"}?${params.toString()}`);
        resolve({
          token: data.access_token,
          expiresIn: data.expires_in,
          refreshToken: data.refresh_token,
        });
      })
      .catch((err) => reject(err));
  });
};
