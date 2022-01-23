// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Post = {
  name: string;
  email: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>
) {
  return new Promise(() => {
    fetch("http://emotionsns_go_1:8000/api/postAll")
      .then((r) => r.json())
      .then((data) => res.json(data));
  });
}
