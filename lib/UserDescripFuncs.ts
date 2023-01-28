  export const UpdateDescriptionHandler = async (section: string, changedVal: string) => {
    let updateData = {}
    if (section === 'bio') {
      updateData = {
        bio: changedVal
      }
    } else if (section === 'instruments') {
      updateData = {
        instruments: changedVal
      }
    }
    const response = await fetch('api/userFeed', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    return response
  }