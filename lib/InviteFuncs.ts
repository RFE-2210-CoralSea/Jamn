  export const acceptInvite = (bandId:number) => {
    let response = {
      bandId: bandId,
      accept: true
    }
    fetch('/api/respondInvitation', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    })
  }

  export const declineInvite = (bandId:number) => {
    let response = {
      bandId: bandId,
      accept: false
    }
    fetch('/api/respondInvitation', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    })
  }