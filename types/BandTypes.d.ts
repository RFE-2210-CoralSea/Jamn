declare interface BandDescriptionInputs {
  email: string
  bandId: number
}

declare interface BandProps {
  description: string
  members: []
  bandId: number
}

declare interface BandMembers {
  name: string,
  id: number,
  userId: number,
  users: {
    picture: string
  }
}

declare interface BandCreationInputs {
  photo: string
  name: string
  description: string
}

declare interface BandCreationData {
  name: string
  image: string
  description: string
}

declare interface BandPostProps {
  bandName: string
}