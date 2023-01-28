declare interface CommentData {
  userId: number
  text: string
  date: string
  users: {
    name: string
    picture: string
  }
}

declare interface NavBarProps {
  color?: string
}