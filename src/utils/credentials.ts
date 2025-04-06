import fs from 'fs'

// read and converts the credentials from tmpCredentials.json 

export function getSavedCredentials() {
  const raw = fs.readFileSync('tmpCredentials.json', 'utf-8')
  return JSON.parse(raw)
}
