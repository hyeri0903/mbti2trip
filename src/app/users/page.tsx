import React from 'react'

interface User {
    id: number;
    name: string;
}

export default async function Users() {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        { cache: 'no-store' })

    const users: User[] = await res.json()

  return (
    <>
        <h1>Users Page</h1>
        <ul>
           { users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>
  )
}
