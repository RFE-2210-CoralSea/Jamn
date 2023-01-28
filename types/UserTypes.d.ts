declare interface UserCommentProps {
  user: number
  text: string
  date: string
  name: string
  picture: string
}

declare interface UserDescriptionProps {
  instruments: [{
    id: number
    userId: number
    instrument: string
  }]
  description: string
  roles: [{
    name: string
    id: number
    image: string
  }]
}

declare interface UserPostProps {
  bands: [
    {
      id: number
      name: string
    }
  ]
}

declare interface UserProfileImageProps {
  image: string
  username?: string
}

declare interface UserStatProps {
  stat: number
}
