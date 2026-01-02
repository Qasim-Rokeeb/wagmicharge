import type { NextApiRequest, NextApiResponse } from "next"

const providers = [
  { id: "electricity", name: "Electricity Company", logo: "/logos/electricity.png" },
  { id: "water", name: "Water Board", logo: "/logos/water.png" },
  // ...more providers
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(providers)
}
