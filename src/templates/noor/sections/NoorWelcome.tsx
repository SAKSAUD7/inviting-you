import React from 'react'

interface Props {
  couple: any
}

export default function NoorWelcome({ couple }: Props) {
  // The Welcome text (Bismillah & Invitation Message) has been moved to NoorHero 
  // to ensure a continuous flowing editorial layout before the names.
  // We return null here to avoid duplication.
  return null
}
