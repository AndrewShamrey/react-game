export default function fetchData(method, name = "", body = "", id = "") {
  if (!body) {
    return fetch(`https://andrews-react-game.herokuapp.com/api/gamers/${name}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return fetch(`https://andrews-react-game.herokuapp.com/api/gamers/${id}`, {
    method: method,
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
