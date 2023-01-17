import type { NextApiRequest, NextApiResponse } from 'next'

type Comment = {
  name: string,
  profile_picture: string,
  text: string,
  date: string
}

type Data = {
  name: string,
  band: string,
  text: string,
  audio: string,
  pdf: string,
  date: string,
  comments: Comment[]
};

const SampleData = {
  name: 'Ivan',
  band: 'MySickBand',
  text: 'hello world',
  audio: 'sampleaudio.wav',
  pdf: 'samplepdf.pdf',
  date: '01/17/2023 @ 8:09pm',
  comments: [{
    name: 'Joe',
    profile_picture: 'sampleprofpic.jpg',
    text: 'hello comments',
    date: '01/17/2023 @ 8:10pm'
  }]
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  if (req.method === 'GET') {
    res.send([SampleData]);
    res.status(200).end();
  } else if (req.method === 'POST') {
    res.status(201).end();
  }
};