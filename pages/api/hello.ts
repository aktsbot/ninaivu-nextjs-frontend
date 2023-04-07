// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const banner = `
   __    _  ___   __    _  _______  ___   __   __  __   __
  |  |  | ||   | |  |  | ||   _   ||   | |  | |  ||  | |  |
  |   |_| ||   | |   |_| ||  |_|  ||   | |  |_|  ||  | |  |
  |       ||   | |       ||       ||   | |       ||  |_|  |
  |  _    ||   | |  _    ||       ||   | |       ||       |
  | | |   ||   | | | |   ||   _   ||   |  |     | |       |
  |_|  |__||___| |_|  |__||__| |__||___|   |___|  |_______|

  Source: https://github.com/aktsbot/ninaivu-nextjs-frontend
  `;
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(banner);
}
