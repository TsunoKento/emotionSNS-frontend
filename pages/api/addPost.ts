import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(() => {
    if (req.method === "POST") {
      fetch("http://emotionsns_go_1:8000/api/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          res.status(200).send("OK");
        })
        .catch((error) => {
          res.status(500).send({ error });
        });
    }
  });
}
